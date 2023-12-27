/* eslint-env mocha */
import { JSONPath } from 'jsonpath-plus';

// Rules to test
import ruleset from '../rules/jsonapi-fetching-data-fetching-resources.js';

// Helper Functions
import { resolveRef } from './utils/refResolver.js';
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { processErrors } from './utils/processErrors.js';
import { debugLog, debugError, debugInfo, debugDebug } from './utils/debugUtils.js';
import { setupSpectralBeforeEach } from './utils/setupSpectralBeforeEach.js';

// OpenAPI Documents
import invalidApiDocumentTopLevelLinks from './docs/fetchingData/fetchingResources/invalidApiDocumentTopLevelLinks.js';
import invalidApiDocumentSingleLevelSelfLink from './docs/fetchingData/fetchingResources/invalidApiDocumentSingleLevelSelfLink.js';
import invalidApiDocumentSingleRelationshipLevelRelatedLink from './docs/fetchingData/fetchingResources/invalidApiDocumentSingleRelationshipLevelRelatedLink.js';
import invalidApiDocumentArrayLevelSelfLink from './docs/fetchingData/fetchingResources/invalidApiDocumentArrayLevelSelfLink.js';
import invalidApiDocumentArrayRelationshipLevelRelatedLink from './docs/fetchingData/fetchingResources/invalidApiDocumentArrayRelationshipLevelRelatedLink.js';

/**
 * @fileoverview This test suite validates the behavior of the JSON: API FetchingData.FetchingResources ruleset
 * when given OpenAPI documents. It tests the different rules defined in jsonapi-fetching-data-fetching-resources.js
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

describe('jsonapi-fetching-data-fetching-resources ruleset:', function fetchingDataFetchingResourcesSuite() {

  let dereferenceValidApiDocument;

  before(function () {

    // Access the globally dereferenced document
    dereferenceValidApiDocument = global.dereferencedValidOpenApiDocument;
    
  });

  /**
   * Ruleset: fetching-data-fetching-resources-top-level-links
   */
  describe('fetching-data-fetching-resources-top-level-links:', function fetchingDataFetchingResourcesTopLevelLinks() {

    const testingRuleName = 'fetching-data-fetching-resources-top-level-links';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function fetchingDataFetchingResourcesTopLevelLinksPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.links.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function fetchingDataFetchingResourcesTopLevelLinksFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentTopLevelLinks, invalidApiDocumentTopLevelLinks);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 1;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function fetchingDataFetchingResourcesTopLevelLinksPassing() {

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
   * Ruleset: fetching-data-fetching-resources-single-level-self-link
   */
  describe('fetching-data-fetching-resources-single-level-self-link:', function fetchingDataFetchingResourcesSingleLevelSelfLink() {

    const testingRuleName = 'fetching-data-fetching-resources-single-level-self-link';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function fetchingDataFetchingResourcesSingleLevelSelfLinkPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties.links.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.links.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.links.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function fetchingDataFetchingResourcesSingleLevelSelfLinkFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentSingleLevelSelfLink, invalidApiDocumentSingleLevelSelfLink);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function fetchingDataFetchingResourcesSingleLevelSelfLinkPassing() {

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
   * Ruleset: fetching-data-fetching-resources-single-relationship-level-related-link
   */
  describe('fetching-data-fetching-resources-single-relationship-level-related-link:', function fetchingDataFetchingResourcesSingleRelationshipLevelRelatedLink() {

    const testingRuleName = 'fetching-data-fetching-resources-single-relationship-level-related-link';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function fetchingDataFetchingResourcesSingleRelationshipLevelRelatedLinkPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties.relationships.properties.posts.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.relationships.properties.posts.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.relationships.properties.posts.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function fetchingDataFetchingResourcesSingleRelationshipLevelRelatedLinkFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentSingleRelationshipLevelRelatedLink, invalidApiDocumentSingleRelationshipLevelRelatedLink);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 3;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function fetchingDataFetchingResourcesSingleRelationshipLevelRelatedLinkPassing() {

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
   * Ruleset: fetching-data-fetching-resources-array-level-self-link
   */
  describe('fetching-data-fetching-resources-array-level-self-link:', function fetchingDataFetchingResourcesArrayLevelSelfLink() {

    const testingRuleName = 'fetching-data-fetching-resources-array-level-self-link';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function fetchingDataFetchingResourcesArrayLevelSelfLinkPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties.links.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function fetchingDataFetchingResourcesArrayLevelSelfLinkFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayLevelSelfLink, invalidApiDocumentArrayLevelSelfLink);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 1;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function fetchingDataFetchingResourcesArrayLevelSelfLinkPassing() {

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
   * Ruleset: fetching-data-fetching-resources-array-relationship-level-related-link
   */
  describe('fetching-data-fetching-resources-array-relationship-level-related-link:', function fetchingDataFetchingResourcesArrayRelationshipLevelRelatedLink() {

    const testingRuleName = 'fetching-data-fetching-resources-array-relationship-level-related-link';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function fetchingDataFetchingResourcesArrayRelationshipLevelRelatedLinkPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties.relationships.properties.posts.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function fetchingDataFetchingResourcesArrayRelationshipLevelRelatedLinkFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayRelationshipLevelRelatedLink, invalidApiDocumentArrayRelationshipLevelRelatedLink);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 1;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function fetchingDataFetchingResourcesArrayRelationshipLevelRelatedLinkPassing() {

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
