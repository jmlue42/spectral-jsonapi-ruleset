import pkg from '@stoplight/spectral-core';
const { Spectral } = pkg;

import setupSpectral from '../utils/setupSpectral.js';
import { truthy } from '@stoplight/spectral-functions';

describe('setupSpectral', function () {

  let ruleset;

  before(function () {

    ruleset = {
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
    };

  });

  it('should return a Spectral instance with a provided ruleset', function () {

    process.env.LOG_DEBUG = false;
    process.env.DEBUG_DEBUG = false;

    const spectral = setupSpectral(ruleset);
    expect(spectral).to.be.instanceof(Spectral);
    expect(Object.keys(spectral.ruleset.rules)).to.deep.equal(['rule-one', 'rule-two']);

  });

  it('should disable all rules by default', function () {

    const spectral = setupSpectral(ruleset);
    expect(spectral.ruleset.rules['rule-one'].enabled).to.be.false;
    expect(spectral.ruleset.rules['rule-two'].enabled).to.be.false;
    
  });

});
