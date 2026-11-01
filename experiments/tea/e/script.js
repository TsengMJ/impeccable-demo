(() => {
  const brewData = {
    oolong: {
      name: "阿里山乌龙",
      temp: "95°C",
      water: "150ml",
      time: "60 秒",
      hint: "花香清透时，可略缩短浸泡；想要更厚的口感，可再延长 10 秒。",
      tabId: "tab-oolong",
    },
    ruby: {
      name: "南投红玉",
      temp: "90°C",
      water: "150ml",
      time: "45 秒",
      hint: "肉桂香明显时可维持此参数；偏好更清爽的尾韵，可略减浸泡时间。",
      tabId: "tab-ruby",
    },
  };

  const planData = {
    quarterly: {
      label: "季付方案",
      amount: "NT$980",
      period: "／季",
      ships: "每季寄送 1 次 · 两款各 50g + 冲泡卡",
      summary: "摘要：季付 NT$980／季；每次两款各 50g + 冲泡卡。台湾本岛免运，离岛尚未开放。本示范不收款。",
      modalPlan: "季付",
      modalPrice: "NT$980／季",
      modalShips: "每季 1 次 · 两款各 50g + 冲泡卡",
    },
    annual: {
      label: "年付方案",
      amount: "NT$3,600",
      period: "／年",
      ships: "一年 4 次寄送 · 每次两款各 50g + 冲泡卡",
      summary: "摘要：年付 NT$3,600／年（四次寄送）；每次两款各 50g + 冲泡卡。台湾本岛免运，离岛尚未开放。本示范不收款。",
      modalPlan: "年付",
      modalPrice: "NT$3,600／年（四次寄送）",
      modalShips: "一年 4 次 · 每次两款各 50g + 冲泡卡",
    },
  };

  let currentPlan = "quarterly";

  /* Brew toggle */
  const brewTabs = document.querySelectorAll(".brew-tab");
  const brewName = document.getElementById("brew-name");
  const brewTemp = document.getElementById("brew-temp");
  const brewWater = document.getElementById("brew-water");
  const brewTime = document.getElementById("brew-time");
  const brewHint = document.getElementById("brew-hint");
  const brewPanelBody = document.getElementById("brew-panel-body");

  function setBrew(key) {
    const data = brewData[key];
    if (!data) return;

    if (brewPanelBody) {
      brewPanelBody.classList.remove("is-swapping");
      void brewPanelBody.offsetWidth;
      brewPanelBody.classList.add("is-swapping");
      window.setTimeout(() => brewPanelBody.classList.remove("is-swapping"), 280);
    }

    brewTabs.forEach((tab) => {
      const active = tab.dataset.tea === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    brewName.textContent = data.name;
    brewTemp.textContent = data.temp;
    brewWater.textContent = data.water;
    brewTime.textContent = data.time;
    brewHint.textContent = data.hint;
    brewPanelBody.setAttribute("aria-labelledby", data.tabId);
  }

  brewTabs.forEach((tab) => {
    tab.addEventListener("click", () => setBrew(tab.dataset.tea));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const keys = ["oolong", "ruby"];
      const idx = keys.indexOf(tab.dataset.tea);
      const next = e.key === "ArrowRight" ? keys[(idx + 1) % keys.length] : keys[(idx - 1 + keys.length) % keys.length];
      setBrew(next);
      document.querySelector(`.brew-tab[data-tea="${next}"]`)?.focus();
    });
  });

  /* Plan toggle */
  const planOpts = document.querySelectorAll(".plan-opt");
  const planLabel = document.getElementById("plan-label");
  const planAmount = document.getElementById("plan-amount");
  const planPeriod = document.getElementById("plan-period");
  const planShips = document.getElementById("plan-ships");
  const planSummary = document.getElementById("plan-summary");

  function setPlan(key) {
    const data = planData[key];
    if (!data) return;
    currentPlan = key;
    planOpts.forEach((opt) => {
      const active = opt.dataset.plan === key;
      opt.classList.toggle("is-active", active);
      opt.setAttribute("aria-pressed", active ? "true" : "false");
    });
    planLabel.textContent = data.label;
    planAmount.textContent = data.amount;
    planPeriod.textContent = data.period;
    planShips.textContent = data.ships;
    planSummary.textContent = data.summary;
  }

  planOpts.forEach((opt) => {
    opt.addEventListener("click", () => setPlan(opt.dataset.plan));
  });

  /* Modal */
  const modal = document.getElementById("preview-modal");
  const previewBtn = document.getElementById("preview-btn");
  const modalPlan = document.getElementById("modal-plan");
  const modalPrice = document.getElementById("modal-price");
  const modalShips = document.getElementById("modal-ships");
  const dialog = modal.querySelector(".modal-dialog");
  let lastFocus = null;

  function openModal() {
    const data = planData[currentPlan];
    modalPlan.textContent = data.modalPlan;
    modalPrice.textContent = data.modalPrice;
    modalShips.textContent = data.modalShips;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    dialog.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  previewBtn.addEventListener("click", openModal);
  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  /* Trap focus lightly inside modal */
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || modal.hidden) return;
    const focusable = modal.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusable).filter((el) => !el.hasAttribute("data-backdrop-skip"));
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
