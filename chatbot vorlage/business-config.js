// =====================================================================
// DIESE DATEI PRO KUNDE ANPASSEN — sonst nichts im Projekt ändern.
// Funktioniert für jede Art von Laden: Café, Friseur, Handwerksbetrieb,
// Boutique, Praxis, Studio — einfach die Werte unten ersetzen.
// =====================================================================

module.exports = {
  // Name des Ladens
  businessName: "Café Lumen",

  // Art des Betriebs — hilft dem Bot, den richtigen Ton zu treffen
  businessType: "Café",

  // Kurzer Begrüßungstext im Chat-Fenster
  greeting: "Hi! Frag mich gern nach Öffnungszeiten, unserer Karte oder allem rund um uns.",

  // Alles, was der Bot wissen soll — als Fließtext, keine feste Formatierung nötig.
  wissen: `
    Öffnungszeiten: Montag bis Samstag 8:00–18:00 Uhr, Sonntag geschlossen.
    Adresse: Bahnhofstraße 4, 12345 Musterstadt.
    Angebot: Kaffeespezialitäten, hausgemachte Kuchen, Frühstück bis 12 Uhr.
    Reservierung: für Gruppen ab 6 Personen telefonisch unter 0123 456789.
    Besonderheiten: WLAN vorhanden, Hunde willkommen, vegane Optionen auf der Karte markiert.
    Zahlung: Karte und bar möglich.
  `,

  // Ton, in dem der Bot antworten soll
  tonfall: "freundlich, locker, kurze Sätze, wie ein hilfsbereiter Mitarbeiter vor Ort",

  // Akzentfarbe des Chat-Fensters (Hex-Code) — passend zum Laden wählen
  akzentfarbe: "#FF5A36",
};
