/* eslint-disable arrow-body-style */
import { debugError, debugDebug } from './debugUtils.js';
import { getEnabledRules } from './getEnabledRules.js';

/**
 * @function handleSpectralResults
 * @description Filters and handles the results of the spectral run.
 * @param {Object} spectral - The Spectral instance.
 * @param {Object} document - The document to be tested.
 * @param {string} resultCode - The result code to filter the results by.
 * @returns {Promise<Array>} The relevant results.
 */
export async function handleSpectralResults(spectral, document, resultCode) {

  try {

    const enabledRules = getEnabledRules(spectral);
    
    // Log the details of the rule, if it exists
    // if (spectral.ruleset.rules[resultCode]) {

    //   debugDebug(`\x1b[35mRule Details:\x1b[36m ${JSON.stringify(spectral.ruleset.rules[resultCode], null, 2)}\n`);
    //   debugDebug(`\x1b[35mRule Message:\x1b[36m ${spectral.ruleset.rules[resultCode].message}\n`);
    //   debugDebug(`\x1b[35mRule Given:\x1b[36m ${spectral.ruleset.rules[resultCode].given}\n`);
    //   debugDebug(`\x1b[35mRule Then:\x1b[36m ${JSON.stringify(spectral.ruleset.rules[resultCode].then, null, 2)}\n\n\x1b[0m\n`);
    
    // }
    
    const results = await spectral.run(document, { rules: enabledRules });

    // debugDebug(`Document Results: ${JSON.stringify(document, null, 2)}  \x1b[0m\n`);

    // debugDebug(`Before forEach loop, numer of results, ${results.length}\n`);

    // Log each result, including targetVal
    results.forEach((result) => {

      debugDebug(`Handle Spectral Results Utils - Spectral's Run Output\n`);
      
      // Spectral provides an output of the results for reasons why it has potentially failed, below are the details to possibly fix them.
      debugDebug(`Result code: \x1b[32m${result.code}\x1b[0m`);
      // Since we are mapping the results path, we need to confirm that is an a provided path to avoid a `TypeError: undefined` message.
      if (result.path) {

        debugDebug(`Result path: \x1b[33m[ \x1b[32m${result.path.map((item) => `\x1b[33m"\x1b[32m${item}\x1b[33m"`).join(', ')} \x1b[33m]\x1b[0m`);
      
      }
      debugDebug(`Result message: \x1b[32m${result.message}\x1b[0m`);
      // debugDebug(`Result severity: \x1b[32m${result.severity}\x1b[0m`);
      // debugDebug(`Result range: \x1b[32m${JSON.stringify(result.range, null, 2)}\x1b[0m`);
      // debugDebug(`Result source: \x1b[32m${result.source}\x1b[0m\n`);


      // If the rule name is found in both `result.code` & resultCode`, this statement will process
      // If the rule name does NOT match, this statement will not run and will need to review the
      // `Result Code` output for potential issues with Spectral Run has failed.
      if (result.code === resultCode) {

        debugDebug(`\x1b[32mResult for '${resultCode}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);
      
      }
    
    });
        
    return results.filter((result) => result.code === resultCode);
  
  } catch (error) {

    debugError('An error occurred while running Spectral: ', error);
    throw error;
  
  }

}
