# Business-Chatbot-Vorlage (allgemein)

Funktioniert für jede Art von Laden — Café, Friseursalon, Handwerksbetrieb,
Boutique, Praxis, Studio, Kanzlei. Für jeden neuen Kunden kopierst du den
kompletten Ordner und änderst **nur eine einzige Datei**.

## Die eine Datei, die du änderst

👉 **`business-config.js`** — dort stehen Name, Art des Betriebs,
Öffnungszeiten, Angebot, Tonfall und Akzentfarbe. Alles andere im Projekt
bleibt unverändert.

Beispiele, wie sich der Bot je nach Eintrag automatisch anpasst:

```js
businessName: "Salon Anders",
businessType: "Friseursalon",
tonfall: "modern, direkt, ohne Floskeln",
```

```js
businessName: "Schreinerei Vogt",
businessType: "Handwerksbetrieb",
tonfall: "bodenständig, sachlich, vertrauenswürdig",
```

Der Bot passt seinen Ton automatisch an das, was in `businessType` und
`tonfall` steht — kein Code-Wissen nötig, nur Text ändern.

## So setzt du es für einen neuen Kunden auf

1. Diesen ganzen Ordner kopieren, z. B. umbenennen in `salon-anders-chatbot`
2. `business-config.js` öffnen und die Werte für den neuen Kunden eintragen
3. Neues GitHub-Repository anlegen, Ordner hochladen
4. Bei Vercel als neues Projekt verbinden
5. Unter "Environment Variables" den `ANTHROPIC_API_KEY` eintragen
   (**derselbe Key funktioniert für alle Kundenprojekte** — kein neuer
   Anthropic-Account pro Kunde nötig)
6. Deployen — fertig ist der Chatbot für diesen Kunden

## Design selbst anpassen

Die Beispielseite (`public/index.html`, `public/site.css`) ist bewusst
allgemein gehalten (Café-Beispiel), damit du siehst, wie sich das Chat-Widget
einfügt. Für ein echtes Kundenprojekt ersetzt du diesen Inhalt komplett durch
die tatsächliche Website — das Chat-Widget selbst (`chat-widget.css`,
`chat-widget.js`) bleibt dabei unverändert und lässt sich in jede beliebige
Seite einfügen.

Ganz oben in `site.css` stehen die Design-Variablen:

```css
--ink: #16171B;      /* Haupttextfarbe */
--paper: #FAFAF8;    /* Hintergrund */
--accent: #FF5A36;   /* Akzentfarbe, z. B. Badges */
```

Die Akzentfarbe des Chat-Fensters selbst kommt automatisch aus
`business-config.js` (`akzentfarbe`) — dort einmal ändern reicht.

## In eine bestehende Website einbauen (z. B. WordPress, Wix, Jimdo)

Diese drei Zeilen kurz vor `</body>` der bestehenden Seite einfügen:

```html
<link rel="stylesheet" href="/chat-widget.css" />
<div id="chat-widget-root"></div>
<script src="/chat-widget.js"></script>
```

`chat-widget.css` und `chat-widget.js` müssen dafür über dasselbe
Vercel-Projekt erreichbar sein.

## Kosten pro Kunde

Alle Kunden können denselben Anthropic-API-Key nutzen — keine zusätzlichen
Fixkosten pro Kunde, nur die tatsächliche Nutzung (Anzahl Chat-Nachrichten)
schlägt sich in der Rechnung nieder. Grob wenige Cent pro geführtem Gespräch.
