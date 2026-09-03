const config = require("../business-config");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST erlaubt" });
  }

  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string" || message.length > 500) {
    return res.status(400).json({ error: "Ungültige Nachricht" });
  }

  const systemPrompt = `Du bist der Chat-Assistent von "${config.businessName}" (${config.businessType}).
Tonfall: ${config.tonfall}.
Antworte immer auf Deutsch, in kurzen, klaren Absätzen.
Wenn du etwas nicht sicher weißt, sag das ehrlich und verweise darauf, direkt anzurufen oder vorbeizukommen.

Hier ist alles, was du über den Laden weißt:
${config.wissen}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: systemPrompt,
        messages: [...history, { role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API Fehler:", errText);
      return res.status(502).json({ error: "KI-Anfrage fehlgeschlagen" });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? "Entschuldigung, da ist etwas schiefgelaufen.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Serverfehler" });
  }
};
