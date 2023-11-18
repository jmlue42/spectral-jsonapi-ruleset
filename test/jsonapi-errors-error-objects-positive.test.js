/* eslint-env mocha */
import { expect } from 'chai';
// import { JSONPath } from 'jsonpath-plus';

// Rules to test
import ruleset from '../rules/jsonapi-errors-error-object.js';

// Helper Functions
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { processErrors } from './utils/processErrors.js';
import { debugLog } from './utils/debugUtils.js';
import { setupSpectralBeforeEach } from './utils/setupSpectralBeforeEach.js';

// OpenAPI Documents
// import validArrayStructureDocument from './docs/errors/errorObjects/validArrayStructureDocument.js';
import validApiDocument from './docs/errors/errorObjects/validApiDocument.js';
import invalidApiDocument from './docs/errors/errorObjects/invalidApiDocument.js';

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
describe('jsonapi-errors-error-objects ruleset:', function errorsErrorObjectsSuite() {

  describe('errors-error-objects-array-structure:', function errorsErrorObjectsArrayStructure() {

    const testingRuleName = 'errors-error-objects-array-structure';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    // it.only('the json path expression should find the correct paths from the given document', async function errorsErrorObjectsArrayStructurePath() {

    //   try {
    
    //     const relevantResults = await handleSpectralResults(this.spectral, validApiDocument, testingRuleName);
          
    //     // debugDebug(`Testing Rule Description: \x1b[36m${this.spectral.ruleset.rules[testingRuleName].description}\x1b[0m\n`);
    //     const propsToInclude = ['path'];
    //     const jsData = JSON.stringify(relevantResults, propsToInclude, 2);
    //     debugDebug(`Testing Rule Path: \x1b[36m${jsData}\x1b[0m\n`);

    //     debugDebug(ruleset.rules[testingRuleName].given);
    
    //     const jsonPathExpression = ruleset.rules[testingRuleName].given;
    //     const expectedPaths = [
    //       validApiDocument.paths['/users/{userId}'].get.responses[400]
    //       // validApiDocument.paths['/users/{userId}'].get.responses[404].content['application/vnd.api+json.api+json'].schema.properties,
    //       // validApiDocument.paths['/users/{userId}'].get.responses[500].content['application/vnd.api+json.api+json'].schema.properties,
    //     ]

    //     const results = JSONPath("$..[?(@property >= '400' && @property <= '599')]", validApiDocument);

    //     debugLog(`  Confirmed Errors:`);
    //     debugLog(`\x1b[33m    - ${results.length}\x1b[0m\n`);

    //     expect(results.length).to.equal(3, `\x1b[31mExpected results to equal \x1b[33m3\x1b[31m, instead \x1b[33m${results.length}\x1b[31m was found.\x1b[0m\n`);
    //     expect(results).to.deep.equal(expectedPaths, `\x1b[31mThe wrong JSONPaths were provided.\x1b[0m\n`);

    //     // const errorMessage = `\x1b[31mError count should be 0.\n\x1b[31m Failing Ruleset Details: \x1b[31m`;
    //     // const propsToInclude = ['message', 'path'];
    //     // const jsData = JSON.stringify(relevantResults, propsToInclude, 2);
    //     // expect(relevantResults.length).to.equal(0, `${errorMessage} \x1b[33m${jsData.replace(/", /gu, `",\n`)}\x1b[0m`);
        
    //   } catch (error) {
    
    //     processErrors(error);
        
    //   }
      
    // });

    it('the rule should return "errors-error-objects-array-structure" errors if errors property type is NOT an array', async function errorsErrorObjectsFailureArrayStructure() {

      try {
    
        const relevantResults = await handleSpectralResults(this.spectral, invalidApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);
    
        const errorMessage = `\x1b[31mError count should be \x1b[33m3.\n\x1b[31m Failing Ruleset Details: \x1b[31m`;
        const propsToInclude = ['message', 'path'];
        const jsData = JSON.stringify(relevantResults, propsToInclude, 2);
        expect(relevantResults.length).to.equal(3, `${errorMessage} \x1b[33m${jsData.replace(/", /gu, `",\n`)}\x1b[0m`);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsPassingArrayStructure() {

      try {
    
        const relevantResults = await handleSpectralResults(this.spectral, validApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);
    
        const errorMessage = `\x1b[31mError count should be 0.\n\x1b[31m Failing Ruleset Details: \x1b[31m`;
        const propsToInclude = ['message', 'path'];
        const jsData = JSON.stringify(relevantResults, propsToInclude, 2);
        expect(relevantResults.length).to.equal(0, `${errorMessage} \x1b[33m${jsData.replace(/", /gu, `",\n`)}\x1b[0m`);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

  });

  // describe('errors-error-objects-object-structure', function errorsErrorObjectsObjectStructure() {

  //   beforeEach(setupSpectralBeforeEach(ruleset, ['errors-error-objects-object-structure']));

  //     it('should pass with no errors for ....', async function errorsErrorObjectsPassingObjectStructure() {

  //       try {

  //         const relevantResults = await handleSpectralResults(this.spectral, validApiDocument, 'errors-error-objects-object-structure');

  //         debugLog(`  Confirmed Errors:`);
  //         debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

  //         const errorMessage = `
  //                 \x1b[31mError count should be 0 for Object Structure within OpenAPI structure.\n
  //                 \x1b[31mFailing Ruleset Details: \x1b[0m
  //             `;
  //         const jsData = JSON.stringify(relevantResults, null, 2);
  //         expect(relevantResults.length).to.equal(0, errorMessage + jsData.replace(/", /gu, `",\n`));
        
  //       } catch (error) {

  //         throw new Error(formattedErrorMessage(error));
        
  //       }

  //     });

  // });
      
});
