(() => {
  const artists = [
    {
      id: "moss",
      stage: "SIGNAL",
      time: "14:00–15:00",
      name: "MOSS CIRCUIT",
      bio: "以苔藓纹理采样与模组合成构筑缓慢成长的声场；像讯号在潮湿空气里发芽，不急著到达终点。",
    },
    {
      id: "glass",
      stage: "NOISE",
      time: "15:00–16:00",
      name: "玻璃海",
      bio: "碎玻璃与海流共振的现场拼贴。高频割裂与低压流动交替，逼你重新校准听觉边界。",
    },
    {
      id: "plant",
      stage: "SIGNAL",
      time: "16:00–17:00",
      name: "低频植物",
      bio: "把植物电位转成低频脉冲，搭配现场投影的叶脉拓扑。安静，却会在胸口留下震动。",
    },
    {
      id: "nullfm",
      stage: "NOISE",
      time: "17:00–18:00",
      name: "NULL FM",
      bio: "失效电台的美学：空频杂讯、误读语音、延迟回授。把「没有节目」变成唯一节目。",
    },
    {
      id: "soft",
      stage: "SIGNAL",
      time: "18:00–19:00",
      name: "SOFT ERROR",
      bio: "温柔的系统错误。柔焦人声与错误码节奏对撞，让故障听起来像一次拥抱。",
    },
    {
      id: "night",
      stage: "NOISE",
      time: "20:00–22:00",
      name: "夜间格式",
      bio: "闭幕长段：夜色编码、重低音格式转换与即时视觉同步，把整晚讯号收束成一次断线。",
    },
  ];

  const tickets = {
    early: { id: "early", name: "早鸟", price: 980, soldOut: true },
    general: { id: "general", name: "一般", price: 1280, soldOut: false },
    duo: { id: "duo", name: "双人", price: 2200, soldOut: false },
  };

  const lineupRoot = document.getElementById("lineup");
  const scheduleRoot = document.getElementById("schedule");
  const filterGroup = document.getElementById("stage-filters");
  const modal = document.getElementById("ticket-modal");
  const qtyValue = document.getElementById("qty-value");
  const totalValue = document.getElementById("total-value");
  const summaryName = document.getElementById("summary-name");
  const summaryPrice = document.getElementById("summary-price");
  const qtyDec = document.getElementById("qty-dec");
  const qtyInc = document.getElementById("qty-inc");

  let activeFilter = "all";
  let selectedTicket = null;
  let qty = 1;
  let lastFocus = null;

  function formatMoney(n) {
    return `NT$${n.toLocaleString("zh-CN")}`;
  }

  function renderLineup() {
    lineupRoot.innerHTML = artists
      .map(
        (a) => `
      <article class="artist" data-stage="${a.stage}" data-id="${a.id}">
        <button
          class="artist__toggle"
          type="button"
          aria-expanded="false"
          aria-controls="bio-${a.id}"
          id="toggle-${a.id}"
        >
          <span class="artist__stage" aria-label="舞台 ${a.stage}">${a.stage}</span>
          <span>
            <h3 class="artist__name">${a.name}</h3>
            <p class="artist__time">${a.time} · ${a.stage} 舞台</p>
          </span>
          <span class="artist__chev" aria-hidden="true"></span>
        </button>
        <div class="artist__bio" id="bio-${a.id}" role="region" aria-labelledby="toggle-${a.id}">
          <p>${a.bio}</p>
        </div>
      </article>`
      )
      .join("");
  }

  function renderSchedule() {
    scheduleRoot.innerHTML = artists
      .map(
        (a) => `
      <div class="slot" data-stage="${a.stage}" data-time="${a.time}">
        <div class="slot__time"><span class="visually-time">${a.time}</span></div>
        <div class="slot__stage" aria-label="舞台 ${a.stage}">${a.stage}</div>
        <div class="slot__artist">
          ${a.name}
          <span class="slot__hint">${a.stage === "SIGNAL" ? "SIGNAL 舞台" : "NOISE 舞台"}</span>
        </div>
      </div>`
      )
      .join("");
    applyFilter();
  }

  function applyFilter() {
    const slots = scheduleRoot.querySelectorAll(".slot");
    slots.forEach((slot) => {
      const match = activeFilter === "all" || slot.dataset.stage === activeFilter;
      slot.hidden = !match;
    });
  }

  function openArtist(article, open) {
    const btn = article.querySelector(".artist__toggle");
    article.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function openModal(ticketKey) {
    const ticket = tickets[ticketKey];
    if (!ticket || ticket.soldOut) return;

    selectedTicket = ticket;
    qty = 1;
    lastFocus = document.activeElement;
    summaryName.textContent = ticket.name;
    summaryPrice.textContent = formatMoney(ticket.price);
    updateQtyUI();

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".icon-btn").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    selectedTicket = null;
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function updateQtyUI() {
    qtyValue.textContent = String(qty);
    qtyDec.disabled = qty <= 1;
    qtyInc.disabled = qty >= 4;
    if (selectedTicket) {
      totalValue.textContent = formatMoney(selectedTicket.price * qty);
    }
  }

  function trapFocus(e) {
    if (modal.hidden || e.key !== "Tab") return;
    const focusables = modal.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusables).filter((el) => !el.hasAttribute("disabled"));
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
  }

  renderLineup();
  renderSchedule();

  lineupRoot.addEventListener("click", (e) => {
    const btn = e.target.closest(".artist__toggle");
    if (!btn) return;
    const article = btn.closest(".artist");
    const willOpen = !article.classList.contains("is-open");
    openArtist(article, willOpen);
  });

  filterGroup.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    filterGroup.querySelectorAll(".filter-btn").forEach((b) => {
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    applyFilter();
  });

  document.querySelectorAll("[data-ticket]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-ticket");
      if (btn.hasAttribute("disabled") || btn.getAttribute("aria-disabled") === "true") return;
      openModal(key);
    });
  });

  qtyDec.addEventListener("click", () => {
    if (qty > 1) {
      qty -= 1;
      updateQtyUI();
    }
  });

  qtyInc.addEventListener("click", () => {
    if (qty < 4) {
      qty += 1;
      updateQtyUI();
    }
  });

  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
    trapFocus(e);
  });
})();
