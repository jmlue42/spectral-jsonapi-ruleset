/* eslint-disable no-plusplus */
/* eslint-disable complexity */
/* eslint-disable no-cond-assign */
/* eslint-disable no-console */

import { debugError, debugDebug } from "./debugUtils.js";

/**
 * Extracts and returns rules from a test title string.
 * 
 * This function searches the test title for rule names that are enclosed in 
 * pipe characters (|). for example, a title like "should pass |rule1| and |rule2|"
 * will return ['rule1', 'rule2']
 * 
 * @param {string} title - The test title string from which to extract rule names.
 * @param {Array.<string>} rules - An array of all possible rule names to match against.
 * @returns {Array.<string> | null} An array of rule names found in the test title, or null if none are found.
 * 
 * @example
 * const title = "should pass |rule1| and |rule2|";
 * const rules = ["rule1", "rule2", "rule3"]
 * const result = getRulesFromTestTitle(title, rules);
 * console.log(result); // Output: ['rule1', 'rule2']
 * 
 * @example
 * const title = "should pass with no rules";
 * const rules = ["rule1", "rule2", "rule3"]
 * const result = getRulesFromTestTitle(title, rules);
 * console.log(result); // Output: null
 */
export function getRulesFromTestTitle(title, rules) {

  if (!title) {

    debugError('No title provided.');
    
    return [];
  
  }

  if (rules.length === 0) {

    debugError('No rules available to match.');
  
    return [];
  
  }

  debugDebug(`\x1b[35mCurrent Test Title:\x1b[0m\x1b[36m ${title} \n\x1b[0m`);

  // debugDebug(`\ngetRulesFromTestTitle title param: ${title}`);
  // debugDebug(`\ngetRulesFromTestTitle rules param: ${rules}`);

  const rulePattern = /\|(?<ruleName>[\w-]+)\|/gu;
  const matchingRules = [];
  let match;
  // let count = 0;

  // while ((match = rulePattern.exec(title)) !== null && count < 5) {
  while ((match = rulePattern.exec(title)) !== null) {

    const { ruleName } = match.groups;

    // debugDebug(`while 'ruleName': ${ruleName}`);

    if (rules.includes(ruleName)) {

      matchingRules.push(ruleName);
      
    }

    // break;
    // count++;
  
  }

  // debugDebug(`Matched Rule: ${matchingRules}`);

  return matchingRules;

}
