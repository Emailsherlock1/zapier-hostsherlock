# HostSherlock Verify — Zapier integration

A Zapier integration for the [HostSherlock](https://www.hostsherlock.com) email
verification API. It is a thin client over the public API at
`api.emailsherlock.com`; there is no separate backend. The API host keeps its
EmailSherlock name on purpose: it is the one host every SDK and existing key
talks to, and renaming it is a platform change, not an integration change.

Built with the [Zapier Platform CLI](https://platform.zapier.com/). Jira: EM-948
(part of EM-837).

## Actions

| Action | Endpoint | What it does |
|---|---|---|
| **Verify Email** | `POST /v1/verify/single` | Verifies one address. Returns the verdict, MX/SMTP/disposable/role signals, a score, and an allow / deny / review recommendation. |
| **Verify Batch** | `POST /v1/verify/batch` | Verifies a list in one call. Returns one result per address, in order. |

No triggers and no searches: verification is a synchronous request/response.

## Authentication

API key, sent as the `X-API-Key` header. Keys are created at
[hostsherlock.com/api](https://www.hostsherlock.com/api). Live keys start with
`es_live_`, sandbox keys with `es_test_`. The connection is validated against the
zero-cost `GET /v1/credits` endpoint, so connecting spends no credits.

Use a **sandbox key** (`es_test_`) while building and testing the Zap: it returns
fixtured results and spends no credits.

## Local development

```bash
npm install
npm install -g zapier-platform-cli   # one-time; the binary is `zapier-platform`
zapier-platform login                          # one-time, your Zapier account

cp .env.example .env                  # add a sandbox key to run the live tests
npm test                              # structural tests; live tests run only with a key
zapier-platform validate                       # full schema validation
zapier-platform push                           # upload a new version to your Zapier app
```

The `test/app.test.js` live cases are skipped automatically unless
`HOSTSHERLOCK_SANDBOX_KEY` is set in `.env`.

## Publishing

1. `zapier-platform register "HostSherlock Email Verify"` (first time only — creates the app in
   your Zapier account and writes `.zapierapprc`).
2. `zapier-platform push` to upload this version.
3. In the Zapier developer dashboard, add the app logo and the marketplace
   description, then submit for review to reach **Beta** in the public App
   Directory. `zapier-platform push` alone does not list the app publicly.

`.zapierapprc` (the app id) and `.env` are gitignored.
