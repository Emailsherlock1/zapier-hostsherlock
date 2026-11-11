'use strict';

const { BASE_URL } = require('../constants');
const { VERIFY_SAMPLE, VERIFY_OUTPUT_FIELDS } = require('./sample');

// Accepts either a Zapier line-item array or a single string with commas,
// semicolons or newlines, so the action works whether the address list is
// mapped from a prior step or typed by hand.
const toEmailList = (raw) => {
  const parts = Array.isArray(raw) ? raw : String(raw == null ? '' : raw).split(/[\s,;]+/);
  return parts.map((entry) => String(entry).trim()).filter((entry) => entry.length > 0);
};

const perform = async (z, bundle) => {
  const emails = toEmailList(bundle.inputData.emails);
  if (emails.length === 0) {
    throw new z.errors.Error('Add at least one email address to verify.', 'InvalidInput', 400);
  }
  const response = await z.request({
    method: 'POST',
    url: `${BASE_URL}/v1/verify/batch`,
    body: { emails },
  });
  // The API returns { results: [...] } in submitted order. Returning the object
  // keeps `results` as a line-item array later steps can loop over.
  return response.data;
};

module.exports = {
  key: 'verify_batch',
  noun: 'Email',
  display: {
    label: 'Verify Batch',
    description:
      'Verify a list of email addresses in one call. Returns one result per address, in the order you submitted them.',
  },
  operation: {
    inputFields: [
      {
        key: 'emails',
        label: 'Emails',
        type: 'string',
        list: true,
        required: true,
        helpText:
          'The addresses to verify. Add them one per line, map an array from a prior step, or paste a comma-separated list into a single line.',
      },
    ],
    perform,
    sample: { results: [VERIFY_SAMPLE] },
    outputFields: VERIFY_OUTPUT_FIELDS.map((f) => ({ ...f, key: `results[]${f.key}` })),
  },
};
