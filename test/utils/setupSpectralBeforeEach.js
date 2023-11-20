import { displayRulesets } from './displayRulesets.js';
import { enableSpecificRuleset } from './enableSpecificRuleset.js';
import { processErrors } from './processErrors.js';
import setupSpectral from './setupSpectral.js';

/**
 * Creates a beforeEach function for Mocha tests, setting up Spectral with a given ruleset and enabling specific rules.
 * 
 * @param {Object} ruleset - The Spectral ruleset to be used in the tests.
 * @param {string} ruleName - A rule name to be enabled for the test suite. If empty, all rules are used.
 * @param {Function} [setupSpectralFn=setupSpectral] - Optional function to setup Spectral. Defaults to the standard setupSpectral function.
 * @returns {Function} A function to be used in the beforeEach hook in Mocha tests.
 * 
 * @example
 * // In your test file
 * beforeEach(setupSpectralBeforeEach(myRuleset, 'rule-set-name'));
 * 
 * @example
 * // Using with a custom setupSpectral function
 * beforeEach(setupSpectralBeforeEach(myRuleset, 'rule-set-name', customSetupSpectral));
 */
export function setupSpectralBeforeEach(ruleset, ruleName, setupSpectralFn = setupSpectral) {

  return function () {

    let spectral;

    try {

      spectral = setupSpectralFn(ruleset);

      if (ruleName.length > 0) {

        enableSpecificRuleset(spectral, ruleName);
      
      }

      displayRulesets(spectral);
    
    } catch (error) {

      processErrors(error);
    
    }

    // Make spetral available in the test context
    this.spectral = spectral;
  
  };

}
