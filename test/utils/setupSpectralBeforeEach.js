import { displayRulesets } from './displayRulesets.js';
import { enableSpecificRuleset } from './enableSpecificRuleset.js';
import { processErrors } from './processErrors.js';
import setupSpectral from './setupSpectral.js';

/**
 * Creates a beforeEach function for Mocha tests, setting up Spectral with a given ruleset and enabling specific rules.
 * 
 * @param {Object} ruleset - The Spectral ruleset to be used in test tests.
 * @param {string} ruleName - A rule name to be enabled for the test suite. If empty, all rules are used.
 * @returns {Function} A function to be used in beforeEach hook in Mocha tests.
 * 
 * @example
 * // In your test file
 * beforeEach(setupSpectralBeforeEach(myRuleset, 'rule-set-name'));
 */
export function setupSpectralBeforeEach(ruleset, ruleName) {

  return function () {

    let spectral;

    try {

      spectral = setupSpectral(ruleset);

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
