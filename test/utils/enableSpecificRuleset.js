/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
/**
 * Enables a specific set of rules within a Spectral instance.
 * This function iterates through an array of ruleset names and enables each specified rule within the Spectral instance.
 * It's particularly useful in testing scenarios where only a subset of rules should be active for a particular test case.
 *
 * @param {Spectral} spectral - An instance of Spectral, which is the core object used for linting in Spectral.
 * @param {string[]} rulesetNames - An array of strings representing the names of the rules to be enabled.
 * @return {void}
 *
 * Example Usage:
 * - To enable the rules 'rule1' and 'rule2' in a Spectral instance, call enableSpecificRuleset(spectral, ['rule1', 'rule2']).
 *
 * Notes:
 * - The function assumes that the Spectral instance and the ruleset are properly initialized.
 * - Only rules that exist in the Spectral instance's ruleset are enabled; if a rule name does not exist, it is ignored.
 * - This function is crucial for targeted testing, allowing for the selective enabling of rules based on the test being executed.
 */
export function enableSpecificRuleset(spectral, rulesetNames) {

  for (const rulesetName of rulesetNames) {

    if (spectral.ruleset.rules.hasOwnProperty(rulesetName)) {

      spectral.ruleset.rules[rulesetName].enabled = true;
      
    }
  
  }

}
