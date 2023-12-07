import pkg from '@stoplight/spectral-core';
const { Spectral } = pkg;

import { truthy } from '@stoplight/spectral-functions';
import sinon from 'sinon';
import { displayRulesets } from '../utils/displayRulesets.js';
// import { debugDebug, debugError, debugInfo, debugLog, debugWarn } from '../utils/debugUtils.js';

describe('displayRulesets Utils:', function () {

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
      info: sinon.stub(console, 'info')
    };

  });

  afterEach(function () {

    // Restore the original console methods after each test
    consoleStub.info.restore();

  });

  it('should correctly log the status of each rule in the ruleset', function () {

    process.env.INFO_DEBUG = true;

    spectral.ruleset.rules['rule-one'].enabled = true;
    spectral.ruleset.rules['rule-two'].enabled = false;

    displayRulesets(spectral);

    const enabledRegex = /rule-one.*Enabled/u;
    const disabledRegex = /rule-two.*Disabled/u;

    let foundEnabled = false;
    let foundDisabled = false;

    consoleStub.info.getCalls().forEach((call) => {

      if (enabledRegex.test(call.args[0])) {

        foundEnabled = true; 

      }
      if (disabledRegex.test(call.args[0])) {

        foundDisabled = true; 

      }

    });

    expect(foundEnabled).to.be.true;
    expect(foundDisabled).to.be.true;

  });

});
