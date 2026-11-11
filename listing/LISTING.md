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

Required by Zapier's publishing requirements, section 7.1
(https://docs.zapier.com/platform/publish/integration-publishing-requirements):
the account must use `integration-testing@zapier.com`, must not expire, must
include the paid features the integration needs (here: enough credits), and
Zapier support must be able to change its password.

The account exists (created 2026-11-11 by a superadmin, credits gifted, live
key issued). Put the login URL, `integration-testing@zapier.com`, the password
and the API key into the "test account" field of the submission form, never
into this repo. Watch the credit balance and the gift's expiry date while the
integration is in review and in Beta: an empty balance makes every review
call fail with 402.
