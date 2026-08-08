# D&D Character Concept Builder

A small wizard app for a private D&D group: players answer flavor-first
questions and land on a race, subrace, class, and subclass concept for a
level 3 character. Submissions are appended to a Google Sheet so the GM can
finish each player's full character sheet.

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in your Apps Script URL, see below
npm run dev
```

## Running tests

```bash
npm test          # single run
npm run test:watch
```

## Google Sheets submission endpoint

See `google-apps-script/README.md` for deploying the Apps Script webhook
that receives submissions and appends them (with a timestamp) to a sheet.
Once deployed, set the resulting URL as `NEXT_PUBLIC_SHEETS_ENDPOINT`:

- Locally: in `.env.local`
- In CI/deploy: as the `NEXT_PUBLIC_SHEETS_ENDPOINT` repository secret, used
  by `.github/workflows/deploy.yml`

## Deploying to GitHub Pages

Push to `main` — the `deploy.yml` workflow builds a static export
(`output: 'export'` in `next.config.ts`) and publishes it to GitHub Pages.
Make sure GitHub Pages is set to the **GitHub Actions** source under
Settings > Pages, and that the `NEXT_PUBLIC_SHEETS_ENDPOINT` secret is set
under Settings > Secrets and variables > Actions.
