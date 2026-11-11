'use strict';

require('should');
const zapier = require('zapier-platform-core');

const App = require('../index');

const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('HostSherlock Zapier app', () => {
  it('exposes exactly the two verify actions and no triggers', () => {
    Object.keys(App.creates).sort().should.deepEqual(['verify_batch', 'verify_single']);
    Object.keys(App.triggers).should.have.length(0);
  });

  it('attaches the API key as the X-API-Key header', () => {
    const request = App.beforeRequest[0](
      { headers: {} },
      null,
      { authData: { apiKey: 'es_test_abc' } },
    );
    request.headers['X-API-Key'].should.equal('es_test_abc');
    request.skipThrowForStatus.should.equal(true);
  });

  it('turns a 401 into a clear auth error', () => {
    const z = { errors: zapier.errors };
    (() => App.afterResponse[0]({ status: 401, data: {} }, z)).should.throw(/key was rejected/);
  });

  it('turns a 402 into an out-of-credits error', () => {
    const z = { errors: zapier.errors };
    (() =>
      App.afterResponse[0](
        { status: 402, data: { error: { code: 'insufficient_credits' } } },
        z,
      )).should.throw(/credits/i);
  });

  // Live checks against the sandbox key (es_test_...). Skipped automatically
  // when HOSTSHERLOCK_SANDBOX_KEY is not set, so the suite is green offline.
  // Addresses are the deterministic sandbox fixtures (no credits spent).
  const sandboxKey = process.env.HOSTSHERLOCK_SANDBOX_KEY;

  (sandboxKey ? it : it.skip)('verifies a single address against the sandbox', async () => {
    const bundle = {
      authData: { apiKey: sandboxKey },
      inputData: { email: 'valid@example.com' },
    };
    const result = await appTester(App.creates.verify_single.operation.perform, bundle);
    result.email.should.equal('valid@example.com');
    result.result.should.equal('valid');
    result.should.have.property('decision');
  });

  (sandboxKey ? it : it.skip)('verifies a batch against the sandbox, in order', async () => {
    const bundle = {
      authData: { apiKey: sandboxKey },
      inputData: { emails: ['valid@example.com', 'invalid@example.com', 'role@example.com'] },
    };
    const result = await appTester(App.creates.verify_batch.operation.perform, bundle);
    result.results.should.be.an.Array();
    result.results.length.should.equal(3);
    result.results[0].result.should.equal('valid');
    result.results[1].result.should.equal('invalid');
    result.results[2].role.should.equal(true);
  });
});
