/* eslint-env mocha */
/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
import { expect } from 'chai';

// Rules to test
import ruleset from '../rules/jsonapi-errors-error-object.js';

// Helper Functions
import setupSpectral from './utils/setupSpectral.js';
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { getAllRulesets } from './utils/getAllRulesets.js';
import { getRulesFromTestTitle } from './utils/getRulesFromTestTitle.js';
import { enableSpecificRuleset } from './utils/enableSpecificRuleset.js';
import { displayRulesets } from './utils/displayRulesets.js';
import { formattedErrorMessage } from './utils/formattedErrorMessage.js';
import { processErrors } from './utils/processErrors.js';
// import validArrayStructureDocument from './docs/errors/errorObjects/validArrayStructureDocument.js';
import validApiDocument from './docs/errors/errorObjects/validApiDocument.js';

// Valid OpenAPI Documents

/**
 * @fileoverview This test suite validates the behavior of the JSON: API fetching data ruleset
 * when given OpenAPI documents. It tests the different rules defined in jsonapi-fetching-data-fetching-resources.js
 * against various OpenAPI documents that are valid based on JSON: API standards
 * 
 * The tests leverage several helper methods:
 *  - `setupSpectral`: Initializes a Spectral instance with the ruleset.
 *  - `handleSpectralResults`: Handles the results returned by Spectral.
 *  - `getAllRulesets`: Retrieves all rules from the ruleset.
 *  - `getRulesFromTestTitle`: Extracts the rule being tested from the test title.
 *  - `enableSpecificRuleset`: Enables a specific rule within the Spectral instance.
 *  - `displayRulesets`: Logs the enabled/disabled state of all rulesets.
 * 
 * The suite uses Mocha for test execution and Chai for assertions.
 * 
 * Each test focuses on one of the following rules, aiming to NOT trigger any errors:
 */
describe('jsonapi-errors-error-objects ruleset passing scenarios:', function errorsErrorObjectsPassingSuite() {

  let spectral;
  beforeEach(function errorsErrorObjectsPassingBeforeEach() {

    try {

      spectral = setupSpectral(ruleset);

      // console.debug(`\x1b[32m Spectral beforeEach: ${JSON.stringify(spectral, null, 2)}`);

      this.currentTestTitle = this.currentTest.title;

      // console.debug(`Current Test Title: ${this.currentTestTitle}`);

      const rulesFromTitle = getRulesFromTestTitle(this.currentTestTitle, getAllRulesets(ruleset));

      // console.debug(`Rules From Title: ${rulesFromTitle} \n Rules From Title Length: ${rulesFromTitle.length}`);

      if (rulesFromTitle && rulesFromTitle.length > 0) {

        enableSpecificRuleset(spectral, rulesFromTitle);
      
      }

      displayRulesets(spectral);
    
    } catch (error) {

      processErrors(error);
    
    }
  
  });

  it('should pass with no errors for |errors-error-objects-array-structure|', async function errorsErrorObjectsPassingArrayStructure() {

    try {

      // const relevantResults = await handleSpectralResults(spectral, validArrayStructureDocument, 'errors-error-objects-array-structure');
      const relevantResults = await handleSpectralResults(spectral, validApiDocument, 'errors-error-objects-array-structure');

      // console.debug(`Spectral JSONPath: ${JSON.stringify(spectral.ruleset.rules['errors-error-objects-array-structure'].given)}`);
      // console.debug(`\x1b[32m ${JSON.stringify(relevantResults.given)}  \x1b[0m`);

      // console.debug(`OpenAPI Document: ${JSON.stringify(validArrayStructureDocument, null, 2)}`);

      console.log(`  Confirmed Errors:`);
      console.log(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

      // console.log(`\x1b[31m  Spectral Results: \x1b[0m ${JSON.stringify(relevantResults, null, 2)} \n`);
      const errorMessage = `
              \x1b[31mError count should be 0 for Array Structure within OpenAPI structure.\n
              \x1b[31mFailing Ruleset Details:
          `;
      const jsData = JSON.stringify(relevantResults, null, 2);
      expect(relevantResults.length).to.equal(0, errorMessage + jsData.replace(/", /gu, `",\n`));
    
    } catch (error) {

      throw new Error(formattedErrorMessage(error));
    
    }
  
  });

  it('should pas with no errors for |errors-error-objects-object-structure|', async function errorsErrorObjectsPassingObjectStructure() {

    try {

      const relevantResults = await handleSpectralResults(spectral, validApiDocument, 'errors-error-objects-object-structure');
      console.log(`  Confirmed Errors:`);
      console.log(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);
      const errorMessage = `
              \x1b[31mError count should be 0 for Object Structure within OpenAPI structure.\n
              \x1b[31mFailing Ruleset Details:
          `;
      const jsData = JSON.stringify(relevantResults, null, 2);
      expect(relevantResults.length).to.equal(0, errorMessage + jsData.replace(/", /gu, `",\n`));
    
    } catch (error) {

      throw new Error(formattedErrorMessage(error));
    
    }

  });
      
});
