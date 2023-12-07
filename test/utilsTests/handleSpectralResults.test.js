import pkg from '@stoplight/spectral-core';

/* disable no-unused-vars */
const { Spectral } = pkg;

import { truthy } from '@stoplight/spectral-functions';
import sinon from 'sinon';
import { handleSpectralResults } from '../utils/handleSpectralResults.js';


describe('handleSpectralResults Utils:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();
    spectral.setRuleset({
      rules: {
        'rule-one': {
          description: 'First Rule description',
          message: 'Message for rule-one',
          severity: 'error',
          given: '$',
          then: {
            function: truthy
          }
        },
        'rule-two': {
          description: 'Second Rule description',
          message: 'Message for rule-two',
          severity: 'error',
          given: '$',
          then: {
            function: truthy
          }
        }
      }
    });

    sinon.stub(spectral, 'run').resolves([
      {
        code: 'rule-one',
        message: 'Message for rule-one'
      },
      {
        code: 'rule-two',
        message: 'Message for rule-two'
      }
    ]);

  });

  afterEach(function () {

    sinon.restore();

  });

  it('should filter results by a given resultCode', async function () {

    // Mock document
    const document = { };
    const results = await handleSpectralResults(spectral, document, 'rule-one');
    expect(results).to.deep.equal([{
      code: 'rule-one',
      message: 'Message for rule-one'
    }]);

  });

  it('should handle no matching results', async function () {

    // Mock document
    const document = { };
    const results = await handleSpectralResults(spectral, document, 'nonexistent-rule');
    expect(results).to.be.empty;

  });

  it('should throw error on Spectral run failure', function () {

    spectral.run.rejects(new Error('Spectral run failed'));
    // Mock document
    const document = { };

    return expect(handleSpectralResults(spectral, document, 'rule-one')).to.eventually.be.rejectedWith('Spectral run failed');

  });

});
