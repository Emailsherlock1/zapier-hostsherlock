'use strict';

const authentication = require('./authentication');
const { addApiKeyHeader, throwForStatus } = require('./middleware');
const verifySingle = require('./creates/verify_single');
const verifyBatch = require('./creates/verify_batch');

const { version: platformVersion } = require('zapier-platform-core');
const { version } = require('./package.json');

// HostSherlock Verify — Zapier integration (Jira EM-948, part of EM-837).
// Two actions, no triggers. Every request is a thin call to the public API at
// api.emailsherlock.com; auth is a single API key sent as X-API-Key.
module.exports = {
  version,
  platformVersion,

  // Email input must reach the API verbatim, so opt out of Zapier auto-cleaning.
  flags: { cleanInputData: false },

  authentication,

  beforeRequest: [addApiKeyHeader],
  afterResponse: [throwForStatus],

  triggers: {},
  searches: {},
  creates: {
    [verifySingle.key]: verifySingle,
    [verifyBatch.key]: verifyBatch,
  },
};
