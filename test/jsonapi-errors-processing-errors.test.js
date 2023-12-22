/* eslint-env mocha */
import { JSONPath } from 'jsonpath-plus';

// Rules to test
import ruleset from '../rules/jsonapi-errors-processing-errors.js';

// Helper Functions
import { resolveRef } from './utils/refResolver.js';
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { processErrors } from './utils/processErrors.js';
import { debugLog, debugError, debugInfo, debugDebug } from './utils/debugUtils.js';
import { setupSpectralBeforeEach } from './utils/setupSpectralBeforeEach.js';

// OpenAPI Documents
import invalidApiDocumentArrayMaxItems from './docs/errors/processingErrors/invalidApiDocumentArrayMaxItems.js';
import invalidApiDocumentArrayMaxItemsValue from './docs/errors/processingErrors/invalidApiDocumentArrayMaxItemsValue.js';

/**
 * @fileoverview This test suite validates the behavior of the JSON: API Errors.ProcessingErrors ruleset
 * when given OpenAPI documents. It tests the different rules defined in jsonapi-errors-processing-errors.js
 * against various OpenAPI documents that are valid based on JSON: API v1.0 standards
 * 
 * The tests leverage several helper methods:
 *  - `setupSpectralBeforeEach`: Creates a beforeEach function for Mocha tests, setting up Spectral with a given ruleset
 *      and enabling specific rules.
 *  - `handleSpectralResults`: Filters and handles the results of the spectral run.
 *  - `processErrors`: Processes and logs errors, specifically handling AggregateErrors separately. This function checks if
 *      the provided error is an instance of AggregateError. If so, it iterates over each individual error within the aggregate
 *      and logs them separately. For all other types of errors, it logs them as unexpected errors. This utility is particularly
 *      useful for handling and debugging multiple errors that can occur during Spectral setup or execution.
 *  - `resolveRef`: Recursively resolves $ref references in an OpenAPI document. This function handles objects and arrays,
 *      resolving all $ref references found within. It supports nested structures and arrays, handles circular references, and
 *      keeps resolved references from the components section for when they are needed at a later time.
 * 
 * The suite uses Mocha for test execution and Chai for assertions.
 * 
 * Each ruleset has three test cases that focuses on the following:
 *   - Validate the JSONPath Expression for that rule
 *   - Generate a negative case scenario for that rule
 *   - Generate a positive case scenario for that rule
 */
describe('jsonapi-errors-processing-errors ruleset:', function errorsProcessingErrorsSuite() {

  let dereferenceValidApiDocument;

  before(function () {

    // Access the globally dereferenced document
    dereferenceValidApiDocument = global.dereferencedValidOpenApiDocument;
    
  });

  /**
   * Ruleset: errors-processing-errors-array-max-items
   */
  describe('errors-processing-errors-array-max-items:', function errorsProcessingErrorsArrayMaxItems() {

    const testingRuleName = 'errors-processing-errors-array-max-items';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it.only('the json path expression should find the correct paths from the given document', function errorsProcessingErrorsArrayMaxItemsPath() {

      try {

        debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['400'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['500'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['400'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['500'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].delete.responses['404'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].delete.responses['500'].content['application/vnd.api+json'].schema.properties.errors }
        ];

        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element ${index + 1} found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, `\x1b[31mThe wrong JSONPath Expression was provided in expected path: ${index + 1}\x1b[0m`);

        });
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsProcessingErrorsArrayMaxItemsFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayMaxItems, invalidApiDocumentArrayMaxItems);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 10;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function errorsProcessingErrorsArrayMaxItemsPassing() {

      try {
    
        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

  });

  /**
   * Ruleset: errors-processing-errors-array-max-items-value
   */
  describe('errors-processing-errors-array-max-items-value:', function errorsProcessingErrorsArrayMaxItemsValue() {

    const testingRuleName = 'errors-processing-errors-array-max-items-value';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsProcessingErrorsArrayMaxItemsValuePath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['400'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['500'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['400'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['500'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].delete.responses['404'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].delete.responses['500'].content['application/vnd.api+json'].schema.properties.errors }
        ];

        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element ${index + 1} found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, `\x1b[31mThe wrong JSONPath Expression was provided in expected path: ${index + 1}\x1b[0m`);

        });
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsProcessingErrorsArrayMaxItemsValueFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayMaxItemsValue, invalidApiDocumentArrayMaxItemsValue);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 10;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function errorsProcessingErrorsArrayMaxItemsValuePassing() {

      try {
    
        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

  });

});
