import pkg from '@stoplight/spectral-core';
const { Spectral } = pkg;

import { truthy } from '@stoplight/spectral-functions';
import { enableSpecificRuleset } from '../utils/enableSpecificRuleset.js';

describe('enableSpecificRuleset Utils:', function () {

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

  it('should enable specified rules', function () {

    spectral.ruleset.rules['rule-one'].enabled = false;
    spectral.ruleset.rules['rule-two'].enabled = false;

    enableSpecificRuleset(spectral, ['rule-one']);
    expect(spectral.ruleset.rules['rule-one'].enabled).to.be.true;
    expect(spectral.ruleset.rules['rule-two'].enabled).to.be.false;

  });

});
