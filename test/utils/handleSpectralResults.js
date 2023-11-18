/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import { debugDebug, debugError } from './debugUtils.js';
import { getEnabledRules } from './getEnabledRules.js';

/**
 * @function handleSpectralResults
 * @description Filters and handles the results of the spectral run.
 * @param {Object} spectral - The Spectral instance.
 * @param {Object} document - The document to be tested.
 * @param {string} resultCode - The result code to filter te results by.
 * @returns {Promise<Array>} The relevant results.
 */
export async function handleSpectralResults(spectral, document, resultCode) {

  try {

    const enabledRules = getEnabledRules(spectral);
    
    // Log the details of the rule
    debugDebug(`\x1b[35mRule Details:\x1b[36m ${JSON.stringify(spectral.ruleset.rules[resultCode], null, 2)}\n`);
    debugDebug(`\x1b[35mRule Message:\x1b[36m ${spectral.ruleset.rules[resultCode].message}\n`);
    debugDebug(`\x1b[35mRule Given:\x1b[36m ${spectral.ruleset.rules[resultCode].given}\n`);
    debugDebug(`\x1b[35mRule Then:\x1b[36m ${JSON.stringify(spectral.ruleset.rules[resultCode].then, null, 2)}\n\n\x1b[0m\n`);
    
    const results = await spectral.run(document, { rules: enabledRules });

    // debugDebug(`\x1b[32mSpectral Results: ${JSON.stringify(results)}  \x1b[0m\n`);

    // Log each result, including targetVal
    // results.forEach((result) => {

    //   if (result.code === resultCode) {

    //     debugLog(`\x1b[32mResult for ${resultCode}:\x1b[36m ${result} \x1b[0m\n`);
    //     debugLog(`\x1b[33mTarget Value:\x1b[36m ${result.targetVal} \x1b[0m\n`);
      
    //   }
    
    // });
        
    return results.filter((result) => result.code === resultCode);
  
  } catch (error) {

    debugError('An error occurred while running Spectral: ', error);
    throw error;
  
  }

}
