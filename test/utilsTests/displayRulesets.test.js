import pkg from '@stoplight/spectral-core';
const { Spectral } = pkg;

import { truthy } from '@stoplight/spectral-functions';
import sinon from 'sinon';
import { displayRulesets } from '../utils/displayRulesets.js';

describe('displayRulesets', function () {

  let spectral;
  let consoleStub;

  beforeEach(function () {

    // Create a new Spectral instance and set up some rules
    spectral = new Spectral();
    spectral.setRuleset({
      rules: {
        'rule-one': {
          description: 'First Rule description',
          message: 'Error Message',
          severity: 'error',
          given: '$',
          then: {
            function: truthy
          }
        },
        'rule-two': {
          description: 'Second Rule description',
          message: 'Error Message',
          severity: 'error',
          given: '$',
          then: {
            function: truthy
          }
        }
      }
    });

    // Setup stubs for console methods before each test
    consoleStub = {
      log: sinon.stub(console, 'log')
    };

  });

  afterEach(function () {

    // Restore the original console methods after each test
    consoleStub.log.restore();

  });

  it('should correctly log the status of each rule in the ruleset', function () {

    process.env.LOG_DEBUG = 'true';
    spectral.ruleset.rules['rule-one'].enabled = true;
    spectral.ruleset.rules['rule-two'].enabled = false;

    displayRulesets(spectral);

    // Check that debugLog was called correctly
    expect(consoleStub.log.callCount).to.be.greaterThan(0);
    expect(consoleStub.log.calledWith(`\x1b[35m    -\x1b[33m rule-one: \x1b[32mEnabled\x1b[0m`)).to.be.true;
    expect(consoleStub.log.calledWith(`\x1b[35m    -\x1b[33m rule-two: \x1b[31mDisabled\x1b[0m`)).to.be.true;

  });

});
