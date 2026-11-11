'use strict';

// Attaches the API key to every request. The key lives in the connection, so
// individual operations never touch auth. skipThrowForStatus hands all error
// handling to throwForStatus below, so users get actionable messages instead of
// the generic platform error.
const addApiKeyHeader = (request, z, bundle) => {
  request.skipThrowForStatus = true;
  if (bundle.authData && bundle.authData.apiKey) {
    request.headers = request.headers || {};
    request.headers['X-API-Key'] = bundle.authData.apiKey;
  }
  return request;
};

// Maps the API's HTTP error contract ({ "error": { "code", "message" } }) onto
// messages a Zapier user can act on. Mirrors the status handling in the n8n node.
const throwForStatus = (response, z) => {
  if (response.status < 400) {
    return response;
  }

  const data = response.data || {};
  const apiError = data.error || {};
  let message = apiError.message || 'The HostSherlock API returned an error.';

  if (response.status === 401 || response.status === 403) {
    throw new z.errors.Error(
      'The API key was rejected. Check the HostSherlock connection. Keys are managed at hostsherlock.com/api.',
      'AuthenticationError',
      response.status,
    );
  }
  if (response.status === 402) {
    message =
      'Not enough credits for this request. Top up or upgrade your plan at hostsherlock.com/api.';
  } else if (response.status === 429) {
    const retryAfter = response.getHeader && response.getHeader('retry-after');
    message = retryAfter
      ? `Rate limit exceeded, retry after ${retryAfter} seconds.`
      : 'Rate limit exceeded. Slow down the Zap or raise your plan limits.';
  } else if (response.status === 503) {
    message =
      'Verification is temporarily unavailable. The call spent no credits; retry later.';
  }

  throw new z.errors.Error(message, 'HostSherlockError', response.status);
};

module.exports = { addApiKeyHeader, throwForStatus };
