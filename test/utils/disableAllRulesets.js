/* eslint-disable no-prototype-builtins */
/**
 * Disables all rules within a given Spectral instance.
 * This function iterates through the rules in the Spectral ruleset and sets each rule's enabled status to false.
 * It is typically used in testing scenarios to ensure that no rules are active before selectively enabling specific rules for a test.
 *
 * @param {Spectral} spectral - An instance of Spectral, which is the core object used for linting in Spectral.
 * 
 * Example Usage:
 * - To disable all rules in a Spectral instance before running tests, call disableAllRulesets(spectral).
 *
 * Notes:
 * - The function modifies the Spectral instance in place and does not return a value.
 * - This is a utility function intended for test setup, where you might need to start with all rules disabled 
 *   before enabling only those relevant to the test being executed.
 * - Ensure that the Spectral instance passed to this function has been properly initialized with a ruleset.
 * @returns {void}
 */
export function disableAllRulesets(spectral) {

  for (const rule in spectral.ruleset.rules) {

    if (spectral.ruleset.rules.hasOwnProperty(rule)) {

      spectral.ruleset.rules[rule].enabled = false;
      
    }
  
  }

}
