/* eslint-disable no-console */
import spectralCore from '@stoplight/spectral-core';
import { disableAllRulesets } from './disableAllRulesets.js';
import { debugLog } from './debugUtils.js';

const { Spectral } = spectralCore;

/**
 * Sets up a new Spectral instance and sets its ruleset
 * 
 * @param {Object} ruleset - The ruleset to be applied to the Spectral instance.
 * @returns {Object} The Initialized Spectral isntance.
 */
export default function setupSpectral(ruleset) {

  debugLog(`\n\n\x1b[34m==================================\x1b[0m Setting Up Test Case \x1b[34m==================================\x1b[0m`);

  const spectral = new Spectral();

  spectral.setRuleset(ruleset);

  disableAllRulesets(spectral);

  // Enable this to log details for the entire ruleset results
  // debugDebug(`\x1b[35m Spectral Results:\x1b[36m ${JSON.stringify(spectral.ruleset, null, 2)}\x1b[0m\n`);
    
  return spectral;

}
