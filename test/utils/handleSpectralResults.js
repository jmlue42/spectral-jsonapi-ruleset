/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
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
    
    // console.log(spectral.ruleset.rules[resultCode]);
    
    // Log the details of the rule
    console.log(`Rule Details:`, spectral.ruleset.rules[resultCode]);
    // console.log(spectral.ruleset.rules[resultCode].message);
    // console.log(spectral.ruleset.rules[resultCode].given);
    // console.log(spectral.ruleset.rules[resultCode].then);
    
    const results = await spectral.run(document, { rules: enabledRules });
    // const results = await spectral.run(document);

    console.debug(`\x1b[32mSpectral Results: ${JSON.stringify(results)}  \x1b[0m`);

    // Log each result, including targetVal
    results.forEach((result) => {

      if (result.code === resultCode) {

        console.log(`\x1b[32mResult for ${resultCode}:`, result);
        console.log(`\x1b[33mTarget Value:`, result.targetVal);
      
      }

      
      console.log(`\x1b[32mResult for ${resultCode}:`, result);
      console.log(`\x1b[33mTarget Value:`, result.targetVal);
    
    });
        
    return results.filter((result) => result.code === resultCode);
  
  } catch (error) {

    console.error('An error occurred while running Spectral: ', error);
    throw error;
  
  }

}
