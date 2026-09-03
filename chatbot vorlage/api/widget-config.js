const config = require("../business-config");

// Gibt nur die Werte zurück, die im Chat-Fenster sichtbar sein dürfen —
// nicht das komplette "wissen", das bleibt intern beim Backend.
module.exports = async function handler(req, res) {
  res.status(200).json({
    businessName: config.businessName,
    greeting: config.greeting,
    akzentfarbe: config.akzentfarbe,
  });
};
