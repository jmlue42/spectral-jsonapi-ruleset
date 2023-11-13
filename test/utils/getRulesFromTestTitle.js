/* eslint-disable no-plusplus */
/* eslint-disable complexity */
/* eslint-disable no-cond-assign */
/* eslint-disable no-console */
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

    console.warn('No title provided.');
    
    return [];
  
  }

  if (rules.length === 0) {

    console.warn('No rules available to match.');
  
    return [];
  
  }

  // console.debug(`\ngetRulesFromTestTitle title param: ${title}`);
  // console.debug(`\ngetRulesFromTestTitle rules param: ${rules}`);

  const rulePattern = /\|(?<ruleName>[\w-]+)\|/gu;
  const matchingRules = [];
  let match;
  // let count = 0;

  // while ((match = rulePattern.exec(title)) !== null && count < 5) {
  while ((match = rulePattern.exec(title)) !== null) {

    const { ruleName } = match.groups;

    // console.debug(`while 'ruleName': ${ruleName}`);

    if (rules.includes(ruleName)) {

      matchingRules.push(ruleName);
      
    }

    // break;
    // count++;
  
  }

  // console.debug(`Matched Rule: ${matchingRules}`);

  return matchingRules;

}
