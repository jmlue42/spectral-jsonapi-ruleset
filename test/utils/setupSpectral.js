/* eslint-disable no-console */
import spectralCore from '@stoplight/spectral-core';
import { disableAllRulesets } from './disableAllRulesets.js';

const { Spectral } = spectralCore;

/**
 * Sets up a new Spectral instance and sets its ruleset
 * 
 * @param {Object} ruleset - The ruleset to be applied to the Spectral instance.
 * @returns {Object} The Initialized Spectral isntance.
 */
export default function setupSpectral(ruleset) {

  console.debug(`\n\n\n\x1b[34m==================================\x1b[0m Setting Up Test Case \x1b[34m==================================\x1b[0m`);

  const spectral = new Spectral();

  // console.debug(`\x1b[32m Spectral Results Step 1: ${JSON.stringify(spectral.ruleset, null, 2)}`);

  spectral.setRuleset(ruleset);

  // console.debug(`\x1b[33m Spectral Results Step 2: ${JSON.stringify(spectral.ruleset, null, 2)}`);

  disableAllRulesets(spectral);

  // console.debug(`\x1b[34m Spectral Results Step 3: ${JSON.stringify(spectral.ruleset, null, 2)}`);
    
  return spectral;

}
