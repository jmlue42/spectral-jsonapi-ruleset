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
import { debugDebug, debugLog } from './utils/debugUtils.js';

// Valid OpenAPI Documents
// import validArrayStructureDocument from './docs/errors/errorObjects/validArrayStructureDocument.js';
import validApiDocument from './docs/errors/errorObjects/validApiDocument.js';

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

      this.currentTestTitle = this.currentTest.title;

      const rulesFromTitle = getRulesFromTestTitle(this.currentTestTitle, getAllRulesets(ruleset));

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

      debugDebug(`\x1b[35mSpectral JSONPath:\x1b[36m ${JSON.stringify(spectral.ruleset.rules['errors-error-objects-array-structure'].given)}\x1b[0m\n`);

      debugLog(`  Confirmed Errors:`);
      debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

      const errorMessage = `
              \x1b[31mError count should be 0 for Array Structure within OpenAPI structure.\n
              \x1b[31mFailing Ruleset Details: \x1b[0m
          `;
      const jsData = JSON.stringify(relevantResults, null, 2);
      expect(relevantResults.length).to.equal(0, errorMessage + jsData.replace(/", /gu, `",\n`));
    
    } catch (error) {

      throw new Error(formattedErrorMessage(error));
    
    }
  
  });

  it('should pass with no errors for |errors-error-objects-object-structure|', async function errorsErrorObjectsPassingObjectStructure() {

    try {

      const relevantResults = await handleSpectralResults(spectral, validApiDocument, 'errors-error-objects-object-structure');

      debugLog(`  Confirmed Errors:`);
      debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

      const errorMessage = `
              \x1b[31mError count should be 0 for Object Structure within OpenAPI structure.\n
              \x1b[31mFailing Ruleset Details: \x1b[0m
          `;
      const jsData = JSON.stringify(relevantResults, null, 2);
      expect(relevantResults.length).to.equal(0, errorMessage + jsData.replace(/", /gu, `",\n`));
    
    } catch (error) {

      throw new Error(formattedErrorMessage(error));
    
    }

  });
      
});
