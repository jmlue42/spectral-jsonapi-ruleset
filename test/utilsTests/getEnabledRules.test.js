import pkg from '@stoplight/spectral-core';
const { Spectral } = pkg;

import { truthy } from '@stoplight/spectral-functions';
import { getEnabledRules } from '../utils/getEnabledRules.js';

describe('getEnabledRules Utils:', function () {

  let spectral;

  beforeEach(function () {

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
        }
      }
    });

  });

  it('should return the enabled rules', function () {

    expect(getEnabledRules(spectral)).to.deep.equal({ 'rule-one': true });

  });

  it('should return an empty object if no rules are enabled', function () {

    spectral.ruleset.rules['rule-one'].enabled = false;
    expect(getEnabledRules(spectral)).to.be.empty;

  });

});
