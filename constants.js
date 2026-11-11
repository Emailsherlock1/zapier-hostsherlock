'use strict';

// Single source for the API host. Override with API_BASE_URL when pointing the
// integration at a staging host during development.
const BASE_URL = process.env.API_BASE_URL || 'https://api.emailsherlock.com';

module.exports = { BASE_URL };
