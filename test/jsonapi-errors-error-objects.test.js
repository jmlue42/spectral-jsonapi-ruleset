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
import invalidApiDocumentItemsLinksMembers from './docs/errors/errorObjects/invalidApiDocumentItemsLinksMembers.js';
import invalidApiDocumentItemsLinksStructureLength from './docs/errors/errorObjects/invalidApiDocumentItemsLinksStructureLength.js';
import invalidApiDocumentItemsLinksAboutType from './docs/errors/errorObjects/invalidApiDocumentItemsLinksAboutType.js';
import invalidApiDocumentItemsLinksTypeType from './docs/errors/errorObjects/invalidApiDocumentItemsLinksTypeType.js';
import invalidApiDocumentItemsLinksAboutFormat from './docs/errors/errorObjects/invalidApiDocumentItemsLinksAboutFormat.js';
import invalidApiDocumentItemsLinksTypeFormat from './docs/errors/errorObjects/invalidApiDocumentItemsLinksTypeFormat.js';
import invalidApiDocumentItemsStatusType from './docs/errors/errorObjects/invalidApiDocumentItemsStatusType.js';
import invalidApiDocumentItemsCodeType from './docs/errors/errorObjects/invalidApiDocumentItemsCodeType.js';
import invalidApiDocumentItemsTitleType from './docs/errors/errorObjects/invalidApiDocumentItemsTitleType.js';
import invalidApiDocumentItemsDetailType from './docs/errors/errorObjects/invalidApiDocumentItemsDetailType.js';
import invalidApiDocumentItemsSourceType from './docs/errors/errorObjects/invalidApiDocumentItemsSourceType.js';
import invalidApiDocumentItemsSourceMembers from './docs/errors/errorObjects/invalidApiDocumentItemsSourceMembers.js';
import invalidApiDocumentItemsSourcePointerType from './docs/errors/errorObjects/invalidApiDocumentItemsSourcePointerType.js';
import invalidApiDocumentItemsSourceParameterType from './docs/errors/errorObjects/invalidApiDocumentItemsSourceParameterType.js';
import invalidApiDocumentItemsSourceHeaderType from './docs/errors/errorObjects/invalidApiDocumentItemsSourceHeaderType.js';
import invalidApiDocumentItemsSourceStructureLength from './docs/errors/errorObjects/invalidApiDocumentItemsSourceStructureLength.js';
import invalidApiDocumentItemsMetaType from './docs/errors/errorObjects/invalidApiDocumentItemsMetaType.js';

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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsArrayStructureFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayStructure, invalidApiDocumentArrayStructure);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsArrayStructurePassing() {

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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsObjectStructureFailure() {

      try {
        
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentObjectStructure, invalidApiDocumentObjectStructure);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 24;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsObjectStructureLengthFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentObjectStructureLength, invalidApiDocumentObjectStructureLength);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsIdTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsIdType, invalidApiDocumentItemsIdType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsLinksTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksType, invalidApiDocumentItemsLinksType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-items-links-members
   */
  describe('errors-error-objects-items-links-members:', function errorsErrorObjectsItemsLinksMembers() {

    const testingRuleName = 'errors-error-objects-items-links-members';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsLinksMembersPath() {

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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsLinksMembersFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksMembers, invalidApiDocumentItemsLinksMembers);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsLinksMembersPassing() {

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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsLinksStructureLengthFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksStructureLength, invalidApiDocumentItemsLinksStructureLength);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsLinksAboutTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksAboutType, invalidApiDocumentItemsLinksAboutType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsLinksAboutFormatFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksAboutFormat, invalidApiDocumentItemsLinksAboutFormat);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsLinksTypeTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksTypeType, invalidApiDocumentItemsLinksTypeType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsLinksTypeFormatFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsLinksTypeFormat, invalidApiDocumentItemsLinksTypeFormat);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

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

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
        expect(relevantResults.length).to.equal(0, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

  });

  /**
   * Ruleset: errors-error-objects-items-status-type
   */
  describe('errors-error-objects-items-status-type:', function errorsErrorObjectsItemsStatusType() {

    const testingRuleName = 'errors-error-objects-items-status-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsStatusTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.status },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.status },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.status }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsStatusTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsStatusType, invalidApiDocumentItemsStatusType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsStatusTypePassing() {

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
   * Ruleset: errors-error-objects-items-code-type
   */
  describe('errors-error-objects-items-code-type:', function errorsErrorObjectsItemsCodeType() {

    const testingRuleName = 'errors-error-objects-items-code-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsCodeTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.code },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.code },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.code }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsCodeTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsCodeType, invalidApiDocumentItemsCodeType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsCodeTypePassing() {

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
   * Ruleset: errors-error-objects-items-title-type
   */
  describe('errors-error-objects-items-title-type:', function errorsErrorObjectsItemsTitleType() {

    const testingRuleName = 'errors-error-objects-items-title-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsTitleTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.title },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.title },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.title }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsTitleTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsTitleType, invalidApiDocumentItemsTitleType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsTitleTypePassing() {

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
   * Ruleset: errors-error-objects-items-detail-type
   */
  describe('errors-error-objects-items-detail-type:', function errorsErrorObjectsItemsDetailType() {

    const testingRuleName = 'errors-error-objects-items-detail-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsDetailTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.detail },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.detail },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.detail }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsDetailTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsDetailType, invalidApiDocumentItemsDetailType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsDetailTypePassing() {

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
   * Ruleset: errors-error-objects-items-source-type
   */
  describe('errors-error-objects-items-source-type:', function errorsErrorObjectsItemsSourceType() {

    const testingRuleName = 'errors-error-objects-items-source-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsSourceTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsSourceTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsSourceType, invalidApiDocumentItemsSourceType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsSourceTypePassing() {

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
   * Ruleset: errors-error-objects-items-source-members
   */
  describe('errors-error-objects-items-source-members:', function errorsErrorObjectsItemsSourceMembers() {

    const testingRuleName = 'errors-error-objects-items-source-members';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsSourceMembersPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsSourceMembersFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsSourceMembers, invalidApiDocumentItemsSourceMembers);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsSourceMembersPassing() {

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
   * Ruleset: errors-error-objects-items-source-pointer-type
   */
  describe('errors-error-objects-items-source-pointer-type:', function errorsErrorObjectsItemsSourcePointerType() {

    const testingRuleName = 'errors-error-objects-items-source-pointer-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsSourcePointerTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.pointer },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.pointer },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.pointer }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsSourcePointerTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsSourcePointerType, invalidApiDocumentItemsSourcePointerType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsSourcePointerTypePassing() {

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
   * Ruleset: errors-error-objects-items-source-parameter-type
   */
  describe('errors-error-objects-items-source-parameter-type:', function errorsErrorObjectsItemsSourceParameterType() {

    const testingRuleName = 'errors-error-objects-items-source-parameter-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsSourceParameterTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.parameter },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.parameter },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.parameter }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsSourceParameterTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsSourceParameterType, invalidApiDocumentItemsSourceParameterType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsSourceParameterTypePassing() {

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
   * Ruleset: errors-error-objects-items-source-header-type
   */
  describe('errors-error-objects-items-source-header-type:', function errorsErrorObjectsItemsSourceHeaderType() {

    const testingRuleName = 'errors-error-objects-items-source-header-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsSourceHeaderTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.header },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.header },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source.properties.header }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsSourceHeaderTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsSourceHeaderType, invalidApiDocumentItemsSourceHeaderType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsSourceHeaderTypePassing() {

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
   * Ruleset: errors-error-objects-items-source-structure-length
   */
  describe('errors-error-objects-items-source-structure-length:', function errorsErrorObjectsItemsSourceStructureLength() {

    const testingRuleName = 'errors-error-objects-items-source-structure-length';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsSourceStructureLengthPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsSourceStructureLengthFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsSourceStructureLength, invalidApiDocumentItemsSourceStructureLength);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsSourceStructureLengthPassing() {

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
   * Ruleset: errors-error-objects-items-meta-type
   */
  describe('errors-error-objects-items-meta-type:', function errorsErrorObjectsItemsMetaType() {

    const testingRuleName = 'errors-error-objects-items-meta-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function errorsErrorObjectsItemsMetaTypePath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.meta },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['404'].content['application/vnd.api+json'].schema.properties.errors.items.properties.meta },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['500'].content['application/vnd.api+json'].schema.properties.errors.items.properties.meta }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsErrorObjectsItemsMetaTypeFailure() {

      try {

        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentItemsMetaType, invalidApiDocumentItemsMetaType);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

        debugLog(`  Confirmed Errors:`);
        debugLog(`     \x1b[31m- ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '${testingRuleName}':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {

        processErrors(error);
        
      }

    });

    it('the rule should pass with NO errors', async function errorsErrorObjectsItemsMetaTypehPassing() {

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
