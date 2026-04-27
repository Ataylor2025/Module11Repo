# Portfolio Website (Module 11)

This repository contains a responsive portfolio website focused on clean visual hierarchy, accessibility, and professional presentation.

## UI/UX Improvements Applied

- **Color system:** high-contrast text on light surfaces with a consistent indigo accent for primary actions.
- **Typography:** Inter font with clear type scale for headings/body to improve readability.
- **Spacing/layout:** consistent spacing tokens, card containers, and section rhythm for faster visual scanning.
- **Navigation UX:** sticky header, skip link for keyboard users, and collapsible mobile menu.
- **Responsiveness:** fluid grid that scales from 3 columns → 2 columns → 1 column depending on viewport width.

## Run Locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment (GitHub Pages)

This repo includes a workflow at `.github/workflows/deploy-gh-pages.yml` that deploys the site when code is pushed to the `main` branch.

### Steps

1. Create a GitHub repository and push this project.
2. Set your default deployment branch to `main`.
3. In GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push updates to `main`.
5. After the workflow finishes, your live site URL will be:
   - `https://<your-github-username>.github.io/<your-repository-name>/`

## Deliverables

- **Live URL:** `https://<your-github-username>.github.io/<your-repository-name>/`
- **GitHub Repository:** `https://github.com/<your-github-username>/<your-repository-name>`

## Reflection on UI/UX Decisions

I redesigned the site around a clearer information hierarchy so visitors can understand who I am, what I build, and how to contact me within a few seconds. I used a restrained color palette and consistent spacing to reduce visual noise, then emphasized primary actions with a single accent color for stronger CTA visibility. I also improved mobile usability by adding a collapsible nav and responsive project grid, while accessibility was supported with semantic landmarks, keyboard-friendly navigation, and a skip link.
