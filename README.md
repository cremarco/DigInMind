# DigInMind

Website for the DigInMind COST Action proposal.

## Development

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

## Deployment

Every push to `main` builds the site and publishes `dist` to GitHub Pages through
[the deployment workflow](.github/workflows/deploy.yml). The workflow can also be
started manually from the repository's Actions tab.

The repository's Pages source must be set to **GitHub Actions**. Build output is
not committed to a separate branch. Keep Vite's base path set to `/DigInMind/`.

Published site: https://cremarco.github.io/DigInMind/
