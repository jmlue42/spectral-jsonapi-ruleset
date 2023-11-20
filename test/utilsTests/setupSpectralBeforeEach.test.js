import sinon from 'sinon';
import { truthy } from '@stoplight/spectral-functions';
import { setupSpectralBeforeEach } from '../utils/setupSpectralBeforeEach.js';

describe('setupSpectralBeforeEach:', function () {

  let mockSetupSpectral;
  let ruleset;

  beforeEach(function () {

    mockSetupSpectral = sinon.stub().returns({
      setRuleset: sinon.stub(),
      ruleset: {
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
      }
    });

  });

  afterEach(function () {
        
    sinon.restore();

  });

  it('should setupSpectral instance and make it available in the test context', function () {

    const beforeEachFunction = setupSpectralBeforeEach(ruleset, 'rule-one', mockSetupSpectral);
    const testContext = { };

    beforeEachFunction.call(testContext);
    expect(testContext.spectral).to.exist;
    expect(mockSetupSpectral.called).to.be.true;

  });

});
