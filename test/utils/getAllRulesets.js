/* eslint-disable no-console */

import { debugError } from "./debugUtils.js";

/**
 * Extracts all rule names from a given Spectral ruleset.
 * This function is designed to retrieve the keys (rule names) from the rules object within a Spectral ruleset.
 * It's useful for scenarios where you need to know all the rules defined in a ruleset, 
 * such as in test setup or dynamic rule manipulation.
 *
 * @param {Object} ruleset - A Spectral ruleset object. The ruleset should have a 'rules' property containing the defined rules.
 * @returns {string[]} An array of rule names present in the ruleset. If the ruleset is empty, invalid, or has no rules, it returns an empty array.
 *
 * Example Usage:
 * - Given a ruleset with rules named 'rule1', 'rule2', 'rule3', getAllRulesets(ruleset) would return ['rule1', 'rule2', 'rule3'].
 *
 * Notes:
 * - The function performs a check to ensure the ruleset is properly structured with a 'rules' property.
 * - If the provided ruleset is invalid or has no rules, the function logs a warning to the console and returns an empty array.
 * - This function is primarily used for setup and configuration purposes in testing and rule management scenarios.
 */
export function getAllRulesets(ruleset) {

  if (!ruleset || !ruleset.rules || Object.keys(ruleset.rules).length === 0) {

    debugError('No rules found in the provided ruleset.');
    
    return [];
  
  }
  
  return Object.keys(ruleset.rules);

}
