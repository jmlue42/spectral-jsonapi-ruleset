/* eslint-env mocha */
import { JSONPath } from 'jsonpath-plus';

// Rules to test
import ruleset from '../rules/jsonapi-document-structure-resource-attributes.js';

// Helper Functions
import { resolveRef } from './utils/refResolver.js';
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { processErrors } from './utils/processErrors.js';
import { debugLog, debugError, debugInfo, debugDebug } from './utils/debugUtils.js';
import { setupSpectralBeforeEach } from './utils/setupSpectralBeforeEach.js';

// OpenAPI Documents
import invalidApiDocumentSingleType from './docs/documentStructure/resourceObjects/attributes/invalidApiDocumentSingleType.js';
import invalidApiDocumentSingleNoForeignKeys from './docs/documentStructure/resourceObjects/attributes/invalidApiDocumentSingleNoForeignKeys.js';
import invalidApiDocumentSingleNoRelationshipsMember from './docs/documentStructure/resourceObjects/attributes/invalidApiDocumentSingleNoRelationshipsMember.js';
import invalidApiDocumentSingleNoLinksMember from './docs/documentStructure/resourceObjects/attributes/invalidApiDocumentSingleNoLinksMember.js';
import invalidApiDocumentArrayAttributesType from './docs/documentStructure/resourceObjects/attributes/invalidApiDocumentArrayAttributesType.js';
import invalidApiDocumentArrayNoForeignKeys from './docs/documentStructure/resourceObjects/attributes/invalidApiDocumentArrayNoForeignKeys.js';
import invalidApiDocumentArrayNoRelationshipsMember from './docs/documentStructure/resourceObjects/attributes/invalidApiDocumentArrayNoRelationshipsMember.js';
import invalidApiDocumentArrayNoLinksMember from './docs/documentStructure/resourceObjects/attributes/invalidApiDocumentArrayNoLinksMember.js';

/**
 * @fileoverview This test suite validates the behavior of the JSON: API DocumentStructure.Resource.Attributes ruleset
 * when given OpenAPI documents. It tests the different rules defined in jsonapi-document-structure-resource-attributes.js
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
describe('jsonapi-document-structure-resource-attributes ruleset:', function documentStructureResourceAttributesSuite() {

  let dereferenceValidApiDocument;

  before(function () {

    // Access the globally dereferenced document
    dereferenceValidApiDocument = global.dereferencedValidOpenApiDocument;
    
  });

  /**
   * Ruleset: document-structure-resource-single-attributes-type
   */
  describe('document-structure-resource-single-attributes-type:', function documentStructureResourceSingleAttributesType() {

    const testingRuleName = 'document-structure-resource-single-attributes-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceSingleAttributesTypePath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].post.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes },
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties.attributes },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.attributes },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.attributes }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceSingleAttributesTypeFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentSingleType, invalidApiDocumentSingleType);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 5;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function documentStructureResourceSingleAttributesTypePassing() {

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
   * Ruleset: document-structure-resource-single-attributes-no-foreign-keys
   */
  describe('document-structure-resource-single-attributes-no-foreign-keys:', function documentStructureResourceSingleAttributesNoForeignKeys() {

    const testingRuleName = 'document-structure-resource-single-attributes-no-foreign-keys';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceSingleAttributesNoForeignKeysPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].post.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties },
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceSingleAttributesNoForeignKeysFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentSingleNoForeignKeys, invalidApiDocumentSingleNoForeignKeys);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 5;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function documentStructureResourceSingleAttributesNoForeignKeysPassing() {

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
   * Ruleset: document-structure-resource-single-attributes-no-relationships-member
   */
  describe('document-structure-resource-single-attributes-no-relationships-member:', function documentStructureResourceSingleAttributesNoRelationshipsMember() {

    const testingRuleName = 'document-structure-resource-single-attributes-no-relationships-member';

    // Utilizing an invalid API Document since `relationships` member is not allowed to be present in an `attributes` member object.
    let dereferencedOpenApiDocumentSingleNoRelationshipsMember;

    before(function beforeNoRelationsMember() {

      dereferencedOpenApiDocumentSingleNoRelationshipsMember = resolveRef(invalidApiDocumentSingleNoRelationshipsMember, invalidApiDocumentSingleNoRelationshipsMember);
    
    });

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceSingleAttributesNoRelationshipsMemberPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocumentNoRelationshipsMember,null,2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferencedOpenApiDocumentSingleNoRelationshipsMember.paths['/users'].post.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.relationships },
          { expected: dereferencedOpenApiDocumentSingleNoRelationshipsMember.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.relationships },
          { expected: dereferencedOpenApiDocumentSingleNoRelationshipsMember.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.relationships },
          { expected: dereferencedOpenApiDocumentSingleNoRelationshipsMember.paths['/users/{userId}'].put.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.relationships },
          { expected: dereferencedOpenApiDocumentSingleNoRelationshipsMember.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.relationships }
        ];

        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferencedOpenApiDocumentSingleNoRelationshipsMember });

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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceSingleAttributesNoRelationshipsMemberFailure() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocumentNoRelationshipsMember,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocumentSingleNoRelationshipsMember, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 5;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function documentStructureResourceSingleAttributesNoRelationshipsMemberPassing() {

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
   * Ruleset: document-structure-resource-single-attributes-no-links-member
   */
  describe('document-structure-resource-single-attributes-no-links-member:', function documentStructureResourceSingleAttributesLinksMember() {

    const testingRuleName = 'document-structure-resource-single-attributes-no-links-member';
    
    // Utilizing an invalid API Document since `links` member is not allowed to be present in an `attributes` member object.
    let dereferencedOpenApiDocumentSingleNoLinksMember;

    before(function beforeNoLinksMember() {

      dereferencedOpenApiDocumentSingleNoLinksMember = resolveRef(invalidApiDocumentSingleNoLinksMember, invalidApiDocumentSingleNoLinksMember);
    
    });

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceSingleAttributesNoLinksMemberPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferencedOpenApiDocumentSingleNoLinksMember.paths['/users'].post.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.links },
          { expected: dereferencedOpenApiDocumentSingleNoLinksMember.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.links },
          { expected: dereferencedOpenApiDocumentSingleNoLinksMember.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.links },
          { expected: dereferencedOpenApiDocumentSingleNoLinksMember.paths['/users/{userId}'].put.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.links },
          { expected: dereferencedOpenApiDocumentSingleNoLinksMember.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties.links }
        ];

        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferencedOpenApiDocumentSingleNoLinksMember });

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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceSingleAttributesNoLinksMemberFailure() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocumentSingleNoLinksMember, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 5;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function documentStructureResourceSingleAttributesNoLinksMemberPassing() {

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
   * Ruleset: document-structure-resource-array-attributes-type
   */
  describe('document-structure-resource-array-attributes-type:', function documentStructureResourceArrayAttributesType() {

    const testingRuleName = 'document-structure-resource-array-attributes-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayAttributesTypePath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties.attributes }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayAttributesTypeFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayAttributesType, invalidApiDocumentArrayAttributesType);

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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayAttributesTypePassing() {

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
   * Ruleset: document-structure-resource-array-attributes-no-foreign-keys
   */
  describe('document-structure-resource-array-attributes-no-foreign-keys:', function documentStructureResourceArrayAttributesNoForeignKeys() {

    const testingRuleName = 'document-structure-resource-array-attributes-no-foreign-keys';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayAttributesNoForeignKeysPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayAttributesNoForeignKeysFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayNoForeignKeys, invalidApiDocumentArrayNoForeignKeys);

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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayAttributesNoForeignKeysPassing() {

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
   * Ruleset: document-structure-resource-array-attributes-no-relationships-member
   */
  describe('document-structure-resource-array-attributes-no-relationships-member:', function documentStructureResourceArrayAttributesNoRelationshipsMember() {

    const testingRuleName = 'document-structure-resource-array-attributes-no-relationships-member';

    // Utilizing an invalid API Document since `relationships` member is not allowed to be present in an `attributes` member object.
    let dereferencedOpenApiDocumentArrayNoRelationshipsMember;

    before(function beforeNoRelationsMember() {

      dereferencedOpenApiDocumentArrayNoRelationshipsMember = resolveRef(invalidApiDocumentArrayNoRelationshipsMember, invalidApiDocumentArrayNoRelationshipsMember);
    
    });

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayAttributesNoRelationshipsMemberPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocumentNoRelationshipsMember,null,2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferencedOpenApiDocumentArrayNoRelationshipsMember.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties.relationships }
        ];

        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferencedOpenApiDocumentArrayNoRelationshipsMember });

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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayAttributesNoRelationshipsMemberFailure() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocumentNoRelationshipsMember,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocumentArrayNoRelationshipsMember, testingRuleName);
    
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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayAttributesNoRelationshipsMemberPassing() {

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
   * Ruleset: document-structure-resource-array-attributes-no-links-member
   */
  describe('document-structure-resource-array-attributes-no-links-member:', function documentStructureResourceArrayAttributesLinksMember() {

    const testingRuleName = 'document-structure-resource-array-attributes-no-links-member';
    
    // Utilizing an invalid API Document since `links` member is not allowed to be present in an `attributes` member object.
    let dereferencedOpenApiDocumentArrayNoLinksMember;

    before(function beforeNoLinksMember() {

      dereferencedOpenApiDocumentArrayNoLinksMember = resolveRef(invalidApiDocumentArrayNoLinksMember, invalidApiDocumentArrayNoLinksMember);
    
    });

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayAttributesNoLinksMemberPath() {

      try {

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferencedOpenApiDocumentArrayNoLinksMember.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties.links }
        ];

        expectedExpressionPaths.forEach((path, index) => {

          const result = JSONPath({ path: jsonPathExpression,
            json: dereferencedOpenApiDocumentArrayNoLinksMember });

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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayAttributesNoLinksMemberFailure() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocumentArrayNoLinksMember, testingRuleName);
    
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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayAttributesNoLinksMemberPassing() {

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