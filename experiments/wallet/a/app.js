/**
 * AEGIS permission sandbox — client-side simulation only.
 * No RPC, no wallet connection, no real transactions.
 */

const state = {
  dailyLimit: 100,
  action: "swap",
  protocol: "DemoSwap",
  duration: "24 hours",
  revoked: false,
};

const els = {
  form: document.getElementById("mandate-form"),
  limit: document.getElementById("daily-limit"),
  mandateStatus: document.getElementById("mandate-status"),
  mandateStatusText: document.getElementById("mandate-status-text"),
  btnRevoke: document.getElementById("btn-revoke"),
  btnReenable: document.getElementById("btn-reenable"),
  taskList: document.getElementById("task-list"),
  activityLog: document.getElementById("activity-log"),
  ctaSandbox: document.getElementById("cta-sandbox"),
};

function readForm() {
  const raw = Number(els.limit.value);
  state.dailyLimit = Number.isFinite(raw) ? Math.max(0, raw) : 0;
  const checked = els.form.querySelector('input[name="action"]:checked');
  state.action = checked ? checked.value : "swap";
}

function evaluateTasks() {
  const limit = state.dailyLimit;
  const action = state.action;
  const revoked = state.revoked;

  // Case 01: 20 USDC swap — allowed when limit is enough and not revoked
  const swap20 = (() => {
    if (revoked) {
      return {
        outcome: "blocked",
        label: "Blocked",
        reason: "Blocked: authorization revoked. No actions may proceed under this grant.",
      };
    }
    if (limit < 20) {
      return {
        outcome: "blocked",
        label: "Blocked",
        reason: `Blocked: 20 USDC exceeds daily spend limit of ${limit} USDC.`,
      };
    }
    return {
      outcome: "allowed",
      label: "Allowed",
      reason: `Allowed: 20 USDC swap on ${state.protocol} is within the ${limit} USDC daily limit.`,
    };
  })();

  // Case 02: 150 USDC transfer — allowed only when limit enough AND Transfer selected
  const transfer150 = (() => {
    if (revoked) {
      return {
        outcome: "blocked",
        label: "Blocked",
        reason: "Blocked: authorization revoked. No actions may proceed under this grant.",
      };
    }
    if (limit < 150) {
      return {
        outcome: "blocked",
        label: "Blocked",
        reason: `Blocked: 150 USDC exceeds daily spend limit of ${limit} USDC.`,
      };
    }
    if (action !== "transfer") {
      return {
        outcome: "blocked",
        label: "Blocked",
        reason: "Blocked: mandate allows Swap only; this request is a Transfer.",
      };
    }
    return {
      outcome: "allowed",
      label: "Allowed",
      reason: `Allowed: 150 USDC transfer is within the ${limit} USDC daily limit and Transfer is permitted.`,
    };
  })();

  // Case 03: notify only — never auto-trades; blocked only when revoked
  const notify = (() => {
    if (revoked) {
      return {
        outcome: "blocked",
        label: "Blocked",
        reason: "Blocked: authorization revoked. Watch/notify under this grant is paused.",
      };
    }
    return {
      outcome: "notify",
      label: "Notify only",
      reason: "Allowed as notification: condition watch does not spend funds or submit transactions.",
    };
  })();

  return { swap20, transfer150, notify };
}

function renderTasks(results) {
  const map = {
    swap20: results.swap20,
    transfer150: results.transfer150,
    notify: results.notify,
  };

  els.taskList.querySelectorAll(".task").forEach((node) => {
    const key = node.dataset.task;
    const result = map[key];
    if (!result) return;

    node.classList.remove("is-allowed", "is-blocked", "is-notify");
    if (result.outcome === "allowed") node.classList.add("is-allowed");
    else if (result.outcome === "blocked") node.classList.add("is-blocked");
    else node.classList.add("is-notify");

    const statusEl = node.querySelector("[data-status]");
    const reasonEl = node.querySelector("[data-reason]");
    if (statusEl) statusEl.textContent = result.label;
    if (reasonEl) reasonEl.textContent = result.reason;
  });
}

function buildLogEntries(results) {
  const entries = [];

  // Always show the three canonical narrative events tied to current rules
  if (state.revoked) {
    entries.push({
      tag: "Revoked",
      tagClass: "log-tag--revoked",
      title: "Permission revoked",
      rule: "User withdrew the simulation grant. All subsequent agent actions are blocked.",
    });
    entries.push({
      tag: "Blocked",
      tagClass: "log-tag--blocked",
      title: "20 USDC swap blocked",
      rule: "Rule: authorization must be active.",
    });
    entries.push({
      tag: "Blocked",
      tagClass: "log-tag--blocked",
      title: "150 USDC transfer blocked",
      rule: "Rule: authorization must be active.",
    });
    return entries;
  }

  // Default storyline matching prompt: 20 allowed, 150 blocked (at default 100 / Swap)
  const s20 = results.swap20;
  entries.push({
    tag: s20.outcome === "allowed" ? "Allowed" : "Blocked",
    tagClass: s20.outcome === "allowed" ? "log-tag--allowed" : "log-tag--blocked",
    title:
      s20.outcome === "allowed"
        ? "20 USDC swap allowed"
        : "20 USDC swap blocked",
    rule: s20.reason,
  });

  const t150 = results.transfer150;
  entries.push({
    tag: t150.outcome === "allowed" ? "Allowed" : "Blocked",
    tagClass: t150.outcome === "allowed" ? "log-tag--allowed" : "log-tag--blocked",
    title:
      t150.outcome === "allowed"
        ? "150 USDC transfer allowed"
        : "150 USDC transfer blocked",
    rule: t150.reason,
  });

  entries.push({
    tag: "Info",
    tagClass: "log-tag--info",
    title: "Condition watch armed (notify only)",
    rule: results.notify.reason,
  });

  return entries;
}

function renderLog(results) {
  const entries = buildLogEntries(results);
  els.activityLog.replaceChildren(
    ...entries.map((entry) => {
      const li = document.createElement("li");
      const tag = document.createElement("span");
      tag.className = `log-tag ${entry.tagClass}`;
      tag.textContent = entry.tag;

      const body = document.createElement("div");
      body.className = "log-body";
      const title = document.createElement("strong");
      title.textContent = entry.title;
      const rule = document.createElement("span");
      rule.className = "log-rule";
      rule.textContent = entry.rule;
      body.append(title, rule);

      li.append(tag, body);
      return li;
    })
  );
}

function renderMandateStatus() {
  if (state.revoked) {
    els.mandateStatus.classList.add("is-revoked");
    els.mandateStatusText.textContent =
      "Authorization revoked — agent cannot act under this grant.";
    els.btnRevoke.hidden = true;
    els.btnRevoke.disabled = true;
    els.btnReenable.hidden = false;
  } else {
    els.mandateStatus.classList.remove("is-revoked");
    els.mandateStatusText.textContent = `Authorization active — ${state.action} on ${state.protocol}, up to ${state.dailyLimit} USDC / day, ${state.duration}.`;
    els.btnRevoke.hidden = false;
    els.btnRevoke.disabled = false;
    els.btnReenable.hidden = true;
  }
}

function refresh() {
  readForm();
  const results = evaluateTasks();
  renderMandateStatus();
  renderTasks(results);
  renderLog(results);
}

function setupFaq() {
  const triggers = document.querySelectorAll(".faq__trigger");
  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      // Accordion: close others
      triggers.forEach((other) => {
        if (other === btn) return;
        other.setAttribute("aria-expanded", "false");
        const otherPanel = document.getElementById(other.getAttribute("aria-controls"));
        if (otherPanel) otherPanel.hidden = true;
      });

      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) panel.hidden = expanded;
    });
  });
}

function setupSmoothScrollFallback() {
  // Ensure keyboard-activated CTAs land on sandbox even if reduced-motion
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      // Move focus for keyboard users
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}

function init() {
  els.form.addEventListener("input", refresh);
  els.form.addEventListener("change", refresh);

  els.btnRevoke.addEventListener("click", () => {
    state.revoked = true;
    refresh();
  });

  els.btnReenable.addEventListener("click", () => {
    state.revoked = false;
    refresh();
  });

  setupFaq();
  setupSmoothScrollFallback();
  refresh();
}

init();
