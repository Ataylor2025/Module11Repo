# Module11Repo

PokeLive Dashboard is a dynamic web app that uses the **Fetch API** to retrieve and render live JSON data from **PokeAPI**.

## Features

- Semantic HTML structure with dedicated sections for controls, featured details, and live cards
- Fetch API integration for:
  - random Pokémon feed
  - search-by-name requests
- Dynamic DOM updates for loading states, successful responses, and error handling
- Optional Local Storage cache (10-minute TTL) for faster reloads
- Responsive card-based design for desktop, tablet, and mobile

## Run locally

Open `index.html` directly in your browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
