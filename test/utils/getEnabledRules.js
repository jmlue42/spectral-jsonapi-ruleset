/**
 * Retrieves a list of currently enabled rules from a given Spectral instance.
 * This function iterates over all the rules in the Spectral ruleset and constructs an object
 * where the keys are the names of the enabled rules and their corresponding values are set to true.
 *
 * @param {Spectral} spectral - An instance of Spectral, which is the core object used for linting in Spectral.
 * @returns {Object} An object containing the enabled rule names as keys, all set to true. 
 * If no rules are enabled or if the Spectral instance is not properly configured, it returns an empty object.
 *
 * Example Usage:
 * - Given a Spectral instance with 'rule1' and 'rule2' enabled, getEnabledRules(spectral) would return: { rule1: true, rule2: true }
 * 
 * Notes:
 * - The function assumes that the Spectral instance passed to it has been properly initialized and configured with a ruleset.
 * - This function is useful for scenarios where you need to identify which rules are active in Spectral's current state,
 *   particularly in dynamic testing environments where rules might be enabled or disabled programmatically.
 */
export function getEnabledRules(spectral) {

  const enabledRules = {};
  for (const [ruleName, ruleDetails] of Object.entries(spectral.ruleset.rules)) {

    if (ruleDetails.enabled) {

      enabledRules[ruleName] = true;
      
    }
  
  }
  
  return enabledRules;

}
