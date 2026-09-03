(async function () {
  const root = document.getElementById("chat-widget-root");
  let cfg = { businessName: "Chat", greeting: "Wie kann ich helfen?", akzentfarbe: "#FF5A36" };

  try {
    const res = await fetch("/api/widget-config");
    if (res.ok) cfg = await res.json();
  } catch (e) {
    console.warn("Widget-Konfiguration konnte nicht geladen werden, nutze Standardwerte.");
  }

  const history = [];

  const chatIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4.4-1.2L3 20l1.3-4.1A8.38 8.38 0 0 1 3 11.5 8.38 8.38 0 0 1 11.5 3a8.5 8.5 0 0 1 9.5 8.5Z"/></svg>`;
  const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`;

  root.style.setProperty("--cw-accent", cfg.akzentfarbe);

  root.innerHTML = `
    <button class="cw-bubble" style="background:${cfg.akzentfarbe}; color:${cfg.akzentfarbe}" aria-label="Chat öffnen">
      <span class="cw-bubble-icon" style="color:white; display:flex;">${chatIcon}</span>
    </button>
    <div class="cw-panel" hidden>
      <div class="cw-header" style="background:${cfg.akzentfarbe}">${escapeHtml(cfg.businessName)}</div>
      <div class="cw-messages"></div>
      <div class="cw-inputrow">
        <input class="cw-input" type="text" placeholder="Nachricht schreiben …" />
        <button class="cw-send" style="background:${cfg.akzentfarbe}">Senden</button>
      </div>
    </div>
  `;

  const bubble = root.querySelector(".cw-bubble");
  const bubbleIcon = root.querySelector(".cw-bubble-icon");
  const panel = root.querySelector(".cw-panel");
  const messagesEl = root.querySelector(".cw-messages");
  const input = root.querySelector(".cw-input");
  const sendBtn = root.querySelector(".cw-send");

  let opened = false;
  bubble.addEventListener("click", () => {
    panel.hidden = opened;
    opened = !opened;
    bubbleIcon.innerHTML = opened ? closeIcon : chatIcon;
    if (opened && messagesEl.children.length === 0) {
      addMessage("bot", cfg.greeting);
    }
    if (opened) input.focus();
  });

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });

  async function send() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    history.push({ role: "user", content: text });
    input.value = "";
    input.disabled = true;
    sendBtn.disabled = true;

    const typingEl = addMessage("bot", "…");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
      });
      const data = await res.json();
      typingEl.textContent = data.reply || "Entschuldigung, da ist etwas schiefgelaufen.";
      history.push({ role: "assistant", content: data.reply || "" });
    } catch (e) {
      typingEl.textContent = "Verbindung fehlgeschlagen. Bitte später erneut versuchen.";
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = "cw-msg " + (role === "user" ? "cw-msg--user" : "cw-msg--bot");
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
