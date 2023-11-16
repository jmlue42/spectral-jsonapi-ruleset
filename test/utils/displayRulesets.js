/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */

import { debugLog } from './debugUtils.js';

/**
 * Logs the current enabled/disabled state of each rule in the Spectral instance's ruleset.
 * This function iterates through all rules in the Spectral ruleset and logs their names along with their enabled/disabled status.
 * It is particularly useful for debugging and testing purposes to ensure that the correct rules are enabled or disabled before running validations.
 *
 * @param {Spectral} spectral - An instance of Spectral, which contains the ruleset whose rules' states are to be displayed.
 * 
 * Example Usage:
 * - Call displayRulesets(spectral) to print the enabled/disabled status of all rules in the given Spectral instance.
 *
 * Notes:
 * - The function does not return any value; its primary purpose is to log information to the console.
 * - It uses ANSI color codes to visually distinguish between enabled (green) and disabled (red) rules.
 * - Ensure that console logging is appropriate for your use case (e.g., debugging) as it may not be suitable in production environments.
 * @returns {void}
 */
export function displayRulesets(spectral) {
  
  debugLog(`  \x1b[4mAll Rulesets\x1b[0m: `);

  for (const rule in spectral.ruleset.rules) {

    if (spectral.ruleset.rules.hasOwnProperty(rule)) {

      debugLog(`\x1b[35m    -\x1b[33m ${rule}: ${spectral.ruleset.rules[rule].enabled
        ? '\x1b[32mEnabled\x1b[0m'
        : '\x1b[31mDisabled\x1b[0m'}`);
    
    }
  
  }
  
  debugLog(`\n`);

}
