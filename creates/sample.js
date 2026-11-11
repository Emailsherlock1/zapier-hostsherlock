'use strict';

// One curated result, matching the documented VerifyResultResponse shape
// (api.emailsherlock.com, OpenAPI VerifyResultResponse). Used as the sample for
// both actions so Zapier can map output fields without a live call.
const VERIFY_SAMPLE = {
  email: 'jane@acme.com',
  result: 'valid',
  deliverable: true,
  reason: 'mailbox_accepts',
  mx: true,
  mx_record: 'mx1.acme-mail.com',
  disposable: false,
  role: false,
  catch_all: false,
  free_email: false,
  score: 0.95,
  freshness: 'fresh',
  checked_at: '2026-06-09T14:32:00+00:00',
  domain: {
    name: 'acme.com',
    types: ['company'],
    score: 87,
    spf: true,
    dkim: true,
    dmarc: true,
    dmarc_policy: 'quarantine',
    mta_sts: false,
    tls_rpt: false,
    bimi: false,
    dane: false,
    blacklists: 0,
    dnssec: 'secure',
    caa: true,
  },
  decision: { recommendation: 'allow', reasons: ['mailbox_accepts'] },
};

// Output field labels for the flat, top-level result fields. Zapier infers
// nested fields (domain__*, decision__*) from the sample, so only the primary
// signals are spelled out here.
const VERIFY_OUTPUT_FIELDS = [
  { key: 'email', label: 'Email' },
  { key: 'result', label: 'Result' },
  { key: 'deliverable', label: 'Deliverable', type: 'boolean' },
  { key: 'reason', label: 'Reason' },
  { key: 'mx', label: 'Has MX', type: 'boolean' },
  { key: 'mx_record', label: 'Primary MX Host' },
  { key: 'disposable', label: 'Disposable', type: 'boolean' },
  { key: 'role', label: 'Role Address', type: 'boolean' },
  { key: 'catch_all', label: 'Catch-All Domain', type: 'boolean' },
  { key: 'free_email', label: 'Freemail Provider', type: 'boolean' },
  { key: 'score', label: 'Score', type: 'number' },
  { key: 'freshness', label: 'Data Freshness' },
  { key: 'checked_at', label: 'Checked At', type: 'datetime' },
  { key: 'decision__recommendation', label: 'Decision' },
];

module.exports = { VERIFY_SAMPLE, VERIFY_OUTPUT_FIELDS };
