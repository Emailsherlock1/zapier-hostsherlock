'use strict';

const { BASE_URL } = require('../constants');
const { VERIFY_SAMPLE, VERIFY_OUTPUT_FIELDS } = require('./sample');

const perform = async (z, bundle) => {
  const email = String(bundle.inputData.email || '').trim();
  const response = await z.request({
    method: 'POST',
    url: `${BASE_URL}/v1/verify/single`,
    body: { email },
  });
  return response.data;
};

module.exports = {
  key: 'verify_single',
  noun: 'Email',
  display: {
    label: 'Verify Email',
    description:
      'Verify a single email address. Returns the verdict, the underlying MX, SMTP, disposable and role signals, and an allow / deny / review recommendation.',
  },
  operation: {
    inputFields: [
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        required: true,
        helpText: 'The email address to verify, for example `jane@acme.com`.',
      },
    ],
    perform,
    sample: VERIFY_SAMPLE,
    outputFields: VERIFY_OUTPUT_FIELDS,
  },
};
