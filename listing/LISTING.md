# Zapier listing data

Paste these into the Zapier developer platform (Integration → Settings, then
Publish). English only, no marketing language: Zapier's review rejects both.
Copy follows `emailsherlockv2/docs/voice.md` (no em-dashes, no amplifiers).

| Field | Value |
|---|---|
| Name | HostSherlock Email Verify |
| Logo | `listing/logo-256.png` (256 × 256 PNG, transparent background) |
| Homepage URL | https://www.hostsherlock.com/api |
| API documentation URL | https://www.hostsherlock.com/api/docs |
| Category | Email · Developer Tools |
| Role | Owner of the API (we run `api.emailsherlock.com`) |
| Audience | Public |

## Description (one sentence, ≤ 140 characters)

> HostSherlock is an email verification API that tells you whether an address can receive mail before you send to it.

## Longer description (optional field)

> HostSherlock is an email verification API. Each check looks up the domain's MX
> records, talks to its mail server over SMTP, and flags disposable and role
> addresses. You get a verdict, a score and an allow / deny / review
> recommendation per address. Use Verify Email in a Zap that collects sign-ups or
> leads, and Verify Batch to clean a list in one step.

## Reviewer test account

Zapier tests the app with its own account. Give `integration-testing@zapier.com`
a HostSherlock login that does not expire, a live API key (`es_live_…`) and
enough credits that the review cannot run out. Paste the key into the
"Test account" field of the submission form, never into this repo.
