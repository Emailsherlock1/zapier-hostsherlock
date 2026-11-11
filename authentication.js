'use strict';

const { BASE_URL } = require('./constants');

// Validates the key against the zero-cost credit-balance endpoint. A 200 proves
// the key works without spending a credit, for both live (es_live_) and sandbox
// (es_test_) keys. The throwForStatus middleware turns a 401/403 into a clear
// "key was rejected" message. It returns the body, not the response: Zapier
// renders connectionLabel against what the test returns, so `{{plan}}` only
// resolves when the test hands back the parsed JSON.
const test = async (z) => {
  const response = await z.request({ url: `${BASE_URL}/v1/credits`, method: 'GET' });
  return response.data;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      type: 'password',
      required: true,
      helpText:
        'Your HostSherlock API key. Live keys start with `es_live_`, sandbox keys with `es_test_`. Create one at [hostsherlock.com/api](https://www.hostsherlock.com/api).',
    },
  ],
  test,
  // Shown on the connected account in Zapier. `plan` comes from /v1/credits.
  connectionLabel: 'HostSherlock ({{plan}})',
};
