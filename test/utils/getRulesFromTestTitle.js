/* eslint-disable no-plusplus */
/* eslint-disable complexity */
/* eslint-disable no-cond-assign */

import { debugError, debugDebug } from './debugUtils.js';

/**
 * Extracts and returns rules from a test title string.
 * 
 * @param {string} ruleName - The test title string from which to extract rule names.
 * @param {Array.<string>} rules - An array of all possible rule names to match against.
 * @returns {Array.<string> | null} An array containing the current rule name, or an empty array if not found.
 */
export function getRulesFromTestTitle(ruleName, rules) {

  if (!ruleName) {

    debugError('No rule name provided.');
    
    return [];
  
  }

  if (rules.length === 0) {

    debugError('No rules available to match.');
  
    return [];
  
  }

  debugDebug(`\x1b[35mCurrent Test Title:\x1b[0m\x1b[36m ${ruleName} \n\x1b[0m`);

  // debugDebug(`\ngetRulesFromTestTitle title param: ${title}`);
  // debugDebug(`\ngetRulesFromTestTitle rules param: ${rules}`);

  // const rulePattern = /\|(?<ruleName>[\w-]+)\|/gu;
  // const matchingRules = [];
  // let match;
  // let count = 0;

  // while ((match = rulePattern.exec(title)) !== null && count < 5) {
  // while ((match = rulePattern.exec(title)) !== null) {

  //   const { ruleName } = match.groups;

  //   // debugDebug(`while 'ruleName': ${ruleName}`);

  //   if (rules.includes(ruleName)) {

  //     matchingRules.push(ruleName);
      
  //   }

  //   // break;
  //   // count++;
  
  // }

  // debugDebug(`Matched Rule: ${matchingRules}`);

  // return matchingRules;

  if (rules.includes(ruleName)) {

    return [ruleName];
  
  }

  return [];

}
