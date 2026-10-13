# Index: Marketplace Search

A local personal search tool for OLX.pl, Allegro.pl, Amazon.pl, and Vinted.pl. It opens first-party search pages for all four. For OLX, a user-invoked bookmarklet can import visible listing cards back into the app for strict title filtering and thumbnail display.

## Search behavior

- **KEYWORDS** sends the query unquoted to each selected marketplace.
- **EXACT PHRASE** wraps the query in quotes before handing it off. A portal may interpret or ignore those quotes according to its own search behavior.
- **OPEN SELECTED PORTALS** opens the selected portal searches in new tabs. This does not import listings. Browser pop-up settings may block some tabs; individual first-party links remain available below the form.
- **OLX import**: copy the bookmarklet from the app once, save it as a browser bookmark (paste the copied text into the bookmark URL/address field), then click it while viewing an OLX search results page. It reads visible ad cards from that page and returns titles, listing links, and seller thumbnail URLs to the local app.
- Imported cards persist in this browser's local storage so they remain visible after refresh. Use **CLEAR LOCAL RESULTS** to remove them. They are not uploaded to a server.
- Imported OLX results are filtered locally: KEYWORDS requires every normalized query word as a whole title token; EXACT PHRASE requires a contiguous normalized phrase. Thus `hotone` matches `Hotone`, not `Homtone` or `homonto`.
- The importer handles cards present on the current page only. Use OLX pagination manually and invoke it per page. It does not automatically fetch hidden results or descriptions.

This collection mode is a personal-use experiment and may conflict with marketplace terms. Imported cards are not stored on a server; data passes through a local URL fragment and is cleared after import. Do not use it to bypass logins, CAPTCHAs, rate limits, or blocks. If a portal blocks normal viewing or changes its page, stop using that source.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Verify changes with:

```sh
npm run build
npm run lint
```

## Project structure

- `src/App.tsx`: query form, marketplace selection, OLX import receiver, local title filter, and listing cards.
- `src/search.ts`: strict title matching, supported marketplace URLs, and generated OLX bookmarklet.
- `src/App.css` and `src/index.css`: responsive terminal-inspired interface.