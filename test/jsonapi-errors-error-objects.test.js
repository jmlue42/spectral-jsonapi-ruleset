/* eslint-env mocha */
import { JSONPath } from 'jsonpath-plus';

// Rules to test
import ruleset from '../rules/jsonapi-errors-error-object.js';

// Helper Functions
import { resolveRef } from './utils/refResolver.js';
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { processErrors } from './utils/processErrors.js';
import { debugLog, debugError, debugInfo } from './utils/debugUtils.js';
import { setupSpectralBeforeEach } from './utils/setupSpectralBeforeEach.js';

// OpenAPI Documents
import validApiDocument from './docs/errors/errorObjects/validApiDocument.js';
import invalidApiDocumentArrayStructure from './docs/errors/errorObjects/invalidApiDocumentArrayStructure.js';
import invalidApiDocumentObjectStructure from './docs/errors/errorObjects/invalidApiDocumentObjectStructure.js';
import invalidApiDocumentItemsIdType from './docs/errors/errorObjects/invalidApiDocumentItemsIdType.js';
import invalidApiDocumentObjectStructureLength from './docs/errors/errorObjects/invalidApiDocumentObjectStructureLength.js';
import invalidApiDocumentItemsLinksType from './docs/errors/errorObjects/invalidApiDocumentItemsLinksType.js';
import invalidApiDocumentItemsLinks from './docs/errors/errorObjects/invalidApiDocumentItemsLinks.js';
import invalidApiDocumentItemsLinksStructureLength from './docs/errors/errorObjects/invalidApiDocumentItemsLinksStructureLength.js';
import invalidApiDocumentItemsLinksAboutType from './docs/errors/errorObjects/invalidApiDocumentItemsLinksAboutType.js';
import invalidApiDocumentItemsLinksTypeType from './docs/errors/errorObjects/invalidApiDocumentItemsLinksTypeType.js';
import invalidApiDocumentItemsLinksAboutFormat from './docs/errors/errorObjects/invalidApiDocumentItemsLinksAboutFormat.js';
import invalidApiDocumentItemsLinksTypeFormat from './docs/errors/errorObjects/invalidApiDocumentItemsLinksTypeFormat.js';

/**
 * @fileoverview This test suite validates the behavior of the JSON: API Errors.ErrorObjects ruleset
 * when given OpenAPI documents. It tests the different rules defined in jsonapi-errors-error-object.js
 * against various OpenAPI documents that are valid based on JSON: API standards
 * 
 * The tests leverage several helper methods:
 *  - `setupSpectralBeforeEach`: Creates a beforeEach function for Mocha tests, setting up Spectral with a given ruleset and enabling specific rules.
 *  - `handleSpectralResults`: Filters and handles the results of the spectral run.
 *  - `processErrors`: Processes and logs errors, specifically handling AggregateErrors separately. This function checks if the provided error is an instance of AggregateError. If so, it iterates over each individual error within the aggregate and logs them separately. For all other types of errors, it logs them as unexpected errors. This utility is particularly useful for handling and debugging multiple errors that can occur during Spectral setup or execution.
 *  - `resolveRef`: Recursively resolves $ref references in an OpenAPI document. This function handles objects and arrays, resolving all $ref references found within. It supports nested structures and arrays, handles circular references, and removes resolved references from the components section if they are no longer needed.
 * 
 * The suite uses Mocha for test execution and Chai for assertions.
 * 
 * Each ruleset has three test cases that focuses on the following:
 *   - Validate the JSONPath Expression for that rule
 *   - Generate a negative case scenario for that rule
 *   - Generate a positive case scenario for that rule
 */
describe('jsonapi-errors-error-objects ruleset:', function errorsErrorObjectsSuite() {

  let dereferenceValidApiDocument;

  before(function () {

    dereferenceValidApiDocument = resolveRef(validApiDocument, validApiDocument);

  });

  /**
   * Ruleset: errors-error-objects-array-structure
   */
  describe('errors-error-objects-array-structure:', function errorsErrorObjectsArrayStructure() {

    const testingRuleName = 'errors-error-objects-array-structure';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsArrayStructurePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors }
        ];

        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should return "errors-error-objects-array-structure" errors if `errors` key is NOT type array', async function errorsErrorObjectsArrayStructureFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayStructure, invalidApiDocumentArrayStructure);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
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

    it('the rule should pass with NO errors', async function errorsErrorObjectsArrayStructurePassing() {

      try {
    
        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);
    
        const errorMessage = `\x1b[31mError count should be 0.\n\x1b[31m Failing Ruleset Details: \x1b[31m`;
        const jsData = JSON.stringify(relevantResults, ['message', 'path'], 2);
        expect(relevantResults.length).to.equal(0, `${errorMessage} \x1b[33m${jsData.replace(/", /gu, `",\n`)}\x1b[0m`);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

  });

  /**
   * Ruleset: errors-error-objects-object-structure
   */
  describe('errors-error-objects-object-structure:', function errorsErrorObjectsObjectStructure() {

    const testingRuleName = 'errors-error-objects-object-structure';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsObjectStructurePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-object-structure" errors if any error object type is NOT correct', async function errorsErrorObjectsObjectStructureFailure() {

      try {
        
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentObjectStructure, invalidApiDocumentObjectStructure);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 24 for Object Structure within OpenAPI structure.\x1b[0m`;
        const confirmedErrors = 24;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsObjectStructurePassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-object-structure-length
   */
  describe('errors-error-objects-object-structure-length:', function errorsErrorObjectsObjectStructureLength() {

    const testingRuleName = 'errors-error-objects-object-structure-length';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsObjectStructureLengthPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-object-structure-length" errors if the incorrect amount of error objects are NOT the `errors` array', async function errorsErrorObjectsObjectStructureLengthFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentObjectStructureLength, invalidApiDocumentObjectStructureLength);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsObjectStructureLengthPassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `
                  \x1b[31mError count should be 0 for Object Structure within OpenAPI structure.\n
                  \x1b[31mFailing Ruleset Details: \x1b[0m
              `;
        const jsData = JSON.stringify(relevantResults, null, 2);
        expect(relevantResults.length).to.equal(0, errorMessage + jsData.replace(/", /gu, `",\n`));
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-items-id-type
   */
  describe('errors-error-objects-items-id-type:', function errorsErrorObjectsItemsIdType() {

    const testingRuleName = 'errors-error-objects-items-id-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsIdTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.id },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.id },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.id }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-items-id-type" errors if the `id` member type is not an `string`', async function errorsErrorObjectsItemsIdTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsIdType, invalidApiDocumentItemsIdType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsIdTypePassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-items-links-type
   */
  describe('errors-error-objects-items-links-type:', function errorsErrorObjectsItemsLinksType() {

    const testingRuleName = 'errors-error-objects-items-links-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsLinksTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-items-links-type" errors if the `links` member type is not an `object`', async function errorsErrorObjectsItemsLinksTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksType, invalidApiDocumentItemsLinksType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsLinksTypePassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-items-links
   */
  describe('errors-error-objects-items-links:', function errorsErrorObjectsItemsLinks() {

    const testingRuleName = 'errors-error-objects-items-links';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsLinksPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-items-links" errors if the `links` member does NOT contain one of the following, `about` and/or `type` members', async function errorsErrorObjectsItemsLinksFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinks, invalidApiDocumentItemsLinks);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsLinksPassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-items-links-structure-length
   */
  describe('errors-error-objects-items-links-structure-length:', function errorsErrorObjectsItemsLinksStructureLength() {

    const testingRuleName = 'errors-error-objects-items-links-structure-length';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsLinksStructureLengthPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-items-links-structure-length" errors if the `links` member object is empty or exceeds more than 2 members.', async function errorsErrorObjectsItemsLinksStructureLengthFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksStructureLength, invalidApiDocumentItemsLinksStructureLength);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsLinksStructureLengthPassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });
  
  /**
   * Ruleset: errors-error-objects-items-links-about-type
   */
  describe('errors-error-objects-items-links-about-type:', function errorsErrorObjectsItemsLinksAboutType() {

    const testingRuleName = 'errors-error-objects-items-links-about-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsLinksAboutTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.about },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.about },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.about }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-items-links-about-type" errors if the `about` member in the `links` object does not  have type `string` in the format of an `URI`', async function errorsErrorObjectsItemsLinksAboutTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksAboutType, invalidApiDocumentItemsLinksAboutType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsLinksAboutTypePassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });


  /**
   * Ruleset: errors-error-objects-items-links-about-format
   */
  describe('errors-error-objects-items-links-about-format:', function errorsErrorObjectsItemsLinksAboutFormat() {

    const testingRuleName = 'errors-error-objects-items-links-about-format';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsLinksAboutFormatPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.about },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.about },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.about }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-items-links-about-format" errors if the `about` member in the `links` object does NOT have correct format of an `URI`', async function errorsErrorObjectsItemsLinksAboutFormatFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksAboutFormat, invalidApiDocumentItemsLinksAboutFormat);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsLinksAboutFormatPassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-items-links-type-type
   */
  describe('errors-error-objects-items-links-type-type:', function errorsErrorObjectsItemsLinksTypeType() {

    const testingRuleName = 'errors-error-objects-items-links-type-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsLinksTypeTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.type },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.type },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.type }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-items-links-type-type" errors if the `type` member in the `links` object does not  have type `string` in the format of an `URI`', async function errorsErrorObjectsItemsLinksTypeTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksTypeType, invalidApiDocumentItemsLinksTypeType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsLinksTypeTypePassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-items-links-type-format
   */
  describe('errors-error-objects-items-links-type-format:', function errorsErrorObjectsItemsLinksTypeFormat() {

    const testingRuleName = 'errors-error-objects-items-links-type-format';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsLinksTypeFormatPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.type },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.type },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.links.properties.type }
        ];
        
        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });

          debugInfo(`Element found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
          
          // Check if each result matches the corresponding expected path
          expect(result[index]).to.deep.equal(path.expected, '\x1b[31mThe wrong JSONPath Expression was provided.\x1b[0m');

        });
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should return "errors-error-objects-items-links-type-format" errors if the `type` member in the `links` object does not  have type `string` in the format of an `URI`', async function errorsErrorObjectsItemsLinksTypeFormatFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksTypeFormat, invalidApiDocumentItemsLinksTypeFormat);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const errorMessage = `\x1b[31mError count should be 3.\x1b[0m`;
        const confirmedErrors = 3;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsLinksTypeFormatPassing() {

      try {

        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0 for Object Structure within OpenAPI structure.`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });
      
});
