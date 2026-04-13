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

## Pull request troubleshooting

If GitHub is blocking PR creation and mentions binary changes, check the following:

1. Ensure you actually have committed changes on your feature branch:
   ```bash
   git checkout work
   git status
   git add .
   git commit -m "Describe your change"
   ```
2. Confirm your branch differs from the target branch:
   ```bash
   git fetch origin
   git log --oneline origin/main..HEAD
   ```
   - If this returns nothing, there is nothing to open a PR for yet.
3. Identify unexpected binary files in your commit:
   ```bash
   git diff --numstat --cached
   ```
   - Binary files show `-` instead of line counts.
4. If a binary file was accidentally added, unstage/remove it and recommit:
   ```bash
   git restore --staged <file>
   git rm --cached <file>
   git commit --amend
   ```

This repo is expected to contain text source files (`.html`, `.css`, `.js`, `.py`, `.md`), so unexpected binaries should usually be removed before opening a PR.
