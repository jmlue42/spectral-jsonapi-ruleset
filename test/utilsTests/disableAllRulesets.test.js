import pkg from '@stoplight/spectral-core';
const { Spectral } = pkg;

import { truthy } from '@stoplight/spectral-functions';
import { disableAllRulesets } from '../utils/disableAllRulesets.js';

describe('disableAllRulesets:', function () {

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
        
  });

  it('should disable all rules', function () {

    disableAllRulesets(spectral);
    expect(spectral.ruleset.rules['rule-one'].enabled).to.be.false;
    expect(spectral.ruleset.rules['rule-two'].enabled).to.be.false;

  });

});
