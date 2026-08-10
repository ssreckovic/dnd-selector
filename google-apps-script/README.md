# Google Sheets submission webhook

1. Create a new Google Sheet (or open the one you want submissions in).
2. In the Sheet, open **Extensions > Apps Script**.
3. Delete the default `Code.gs` contents and paste in this directory's `Code.gs`.
4. Click **Deploy > New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (required for the static site to POST to it without Google auth)
5. Click **Deploy**, authorize the script when prompted, and copy the resulting **Web app URL**.
6. Set that URL as the `NEXT_PUBLIC_SHEETS_ENDPOINT` value (see the main README for where this is configured for local dev and for the GitHub Actions build).
7. The first submission will create a "Submissions" sheet tab with a header row automatically.

If you ever change `Code.gs`, you must create a **new deployment version** (Deploy > Manage deployments > Edit > New version) for the change to take effect on the existing URL.

If a "Submissions" tab already exists from before a `HEADER_ROW` change (e.g. the ability score / spell choice columns added later), you must update its header row manually — `getOrCreateSheet_()` only writes headers when it creates a brand-new sheet tab, so an existing tab won't pick up new columns automatically.
