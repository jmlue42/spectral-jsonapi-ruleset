/* eslint-env mocha */
import { JSONPath } from 'jsonpath-plus';

// Rules to test
import ruleset from '../rules/jsonapi-document-structure-resource-identification.js';

// Helper Functions
import { resolveRef } from './utils/refResolver.js';
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { processErrors } from './utils/processErrors.js';
import { debugLog, debugError, debugInfo, debugDebug } from './utils/debugUtils.js';
import { setupSpectralBeforeEach } from './utils/setupSpectralBeforeEach.js';

// OpenAPI Documents
import invalidApiDocumentSingleIdMember from './docs/documentStructure/resourceObjects/identification/invalidApiDocumentSingleIdMember.js';
import invalidApiDocumentSingleIdType from './docs/documentStructure/resourceObjects/identification/invalidApiDocumentSingleIdType.js';
import invalidApiDocumentSingleTypeMember from './docs/documentStructure/resourceObjects/identification/invalidApiDocumentSingleTypeMember.js';
import invalidApiDocumentSingleTypeType from './docs/documentStructure/resourceObjects/identification/invalidApiDocumentSingleTypeType.js';
import invalidApiDocumentArrayIdMember from './docs/documentStructure/resourceObjects/identification/invalidApiDocumentArrayIdMember.js';
import invalidApiDocumentArrayIdType from './docs/documentStructure/resourceObjects/identification/invalidApiDocumentArrayIdType.js';
import invalidApiDocumentArrayTypeMember from './docs/documentStructure/resourceObjects/identification/invalidApiDocumentArrayTypeMember.js';
import invalidApiDocumentArrayTypeType from './docs/documentStructure/resourceObjects/identification/invalidApiDocumentArrayTypeType.js';

/**
 * @fileoverview This test suite validates the behavior of the JSON: API DocumentStructure.Resource.identification ruleset
 * when given OpenAPI documents. It tests the different rules defined in jsonapi-document-structure-resource-identification.js
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

describe('jsonapi-document-structure-resource-identification ruleset:', function documentStructureResourceIdentificationSuite() {

  let dereferenceValidApiDocument;

  before(function () {

    // Access the globally dereferenced document
    dereferenceValidApiDocument = global.dereferencedValidOpenApiDocument;
    
  });

  /**
   * Ruleset: document-structure-resource-single-identification-id-member
   */
  describe('document-structure-resource-single-identification-id-member:', function documentStructureResourceSingleIdentificationIdMember() {

    const testingRuleName = 'document-structure-resource-single-identification-id-member';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceSingleIdentificationIdMemberPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpressions = ruleset.rules[testingRuleName].given;
        // debugDebug(`JSONPath Expression: ${jsonPathExpressions}`);

        const expectedExpressionPaths = [
          [
            { expected: dereferenceValidApiDocument.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties },
            { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties },
            { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties }
          ],
          [
            { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.requestBody.content['application/vnd.api+json'].schema.properties.data.properties }
          ]
        ];

        jsonPathExpressions.forEach((jsonPathExpression, exprIndex) => {

          debugDebug(`JSONPath Expression [${exprIndex}]: ${jsonPathExpression}`);

          const expectedPaths = expectedExpressionPaths[exprIndex];
          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });
          
          // Check if the number of results matches the expected number for this expression
          expect(result.length).to.equal(expectedPaths.length, `\x1b[31mExpected ${expectedPaths.length} elements to match in the OpenAPI Document for expression array index [${exprIndex}].\x1b[0m\n`);

          expectedPaths.forEach((path, pathIndex) => {

            // Additional checks for each path
            debugInfo(`Element ${pathIndex + 1} found from JSONPath Expression array index [${exprIndex}]: \x1b[32m${JSON.stringify(result[pathIndex], null, 2)}`);
            
            // Check if each result matches the corresponding expected path
            expect(result[pathIndex]).to.deep.equal(path.expected, `\x1b[31mThe wrong JSONPath Expression was provided in expected path: ${pathIndex + 1}\x1b[0m`);

          });

        });
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceSingleIdentificationIdMemberFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentSingleIdMember, invalidApiDocumentSingleIdMember);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 4;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function documentStructureResourceSingleIdentificationIdMemberPassing() {

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
   * Ruleset: document-structure-resource-single-identification-id-type
   */
  describe('document-structure-resource-single-identification-id-type:', function documentStructureResourceSingleIdentificationIdType() {

    const testingRuleName = 'document-structure-resource-single-identification-id-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceSingleIdentificationIdTypePath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpressions = ruleset.rules[testingRuleName].given;
        // debugDebug(`JSONPath Expression: ${jsonPathExpressions}`);

        const expectedExpressionPaths = [
          [
            { expected: dereferenceValidApiDocument.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties.id },
            { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.id },
            { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.id }
          ],
          [
            { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.id }
          ]
        ];

        jsonPathExpressions.forEach((jsonPathExpression, exprIndex) => {
          
          debugDebug(`JSONPath Expression [${exprIndex}]: ${jsonPathExpression}`);

          const expectedPaths = expectedExpressionPaths[exprIndex];
          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });
          
          // Check if the number of results matches the expected number for this expression
          expect(result.length).to.equal(expectedPaths.length, `\x1b[31mExpected ${expectedPaths.length} elements to match in the OpenAPI Document for expression array index [${exprIndex}].\x1b[0m\n`);

          expectedPaths.forEach((path, pathIndex) => {

            // Additional checks for each path
            debugInfo(`Element ${pathIndex + 1} found from JSONPath Expression array index [${exprIndex}]: \x1b[32m${JSON.stringify(result[pathIndex], null, 2)}`);
            
            // Check if each result matches the corresponding expected path
            expect(result[pathIndex]).to.deep.equal(path.expected, `\x1b[31mThe wrong JSONPath Expression was provided in expected path: ${pathIndex + 1}\x1b[0m`);

          });

        });
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceSingleIdentificationIdTypeFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentSingleIdType, invalidApiDocumentSingleIdType);

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferencedOpenApiDocument,null,2)}`);

        const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);
    
        debugLog(`  Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        relevantResults.forEach((result) => {

          debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

        });

        const confirmedErrors = 4;
        const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

        expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it('the rule should pass with NO errors', async function documentStructureResourceSingleIdentificationIdTypePassing() {

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
   * Ruleset: document-structure-resource-single-identification-type-member
   */
  describe('document-structure-resource-single-identification-type-member:', function documentStructureResourceSingleIdentificationTypeMember() {

    const testingRuleName = 'document-structure-resource-single-identification-type-member';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceSingleIdentificationTypeMemberPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].post.requestBody.content['application/vnd.api+json'].schema.properties.data.properties },
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.requestBody.content['application/vnd.api+json'].schema.properties.data.properties },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceSingleIdentificationTypeMemberFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentSingleTypeMember, invalidApiDocumentSingleTypeMember);

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

    it('the rule should pass with NO errors', async function documentStructureResourceSingleIdentificationTypeMemberPassing() {

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
   * Ruleset: document-structure-resource-single-identification-type-type
   */
  describe('document-structure-resource-single-identification-type-type:', function documentStructureResourceSingleIdentificationTypeType() {

    const testingRuleName = 'document-structure-resource-single-identification-type-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceSingleIdentificationTypeTypePath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].post.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.type },
          { expected: dereferenceValidApiDocument.paths['/users'].post.responses['201'].content['application/vnd.api+json'].schema.properties.data.properties.type },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.type },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.type },
          { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses['200'].content['application/vnd.api+json'].schema.properties.data.properties.type }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceSingleIdentificationTypeTypeFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentSingleTypeType, invalidApiDocumentSingleTypeType);

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

    it('the rule should pass with NO errors', async function documentStructureResourceSingleIdentificationTypeTypePassing() {

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
   * Ruleset: document-structure-resource-array-identification-id-member
   */
  describe('document-structure-resource-array-identification-id-member:', function documentStructureResourceArrayIdentificationIdMember() {

    const testingRuleName = 'document-structure-resource-array-identification-id-member';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayIdentificationIdMemberPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpressions = ruleset.rules[testingRuleName].given;
        // debugDebug(`JSONPath Expression: ${jsonPathExpressions}`);

        const expectedExpressionPaths = [
          [
            { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties }
          ],
          [
            // Left blank in purpose
          ]
        ];

        jsonPathExpressions.forEach((jsonPathExpression, exprIndex) => {

          debugDebug(`JSONPath Expression [${exprIndex}]: ${jsonPathExpression}`);

          const expectedPaths = expectedExpressionPaths[exprIndex];
          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });
          
          // Check if the number of results matches the expected number for this expression
          expect(result.length).to.equal(expectedPaths.length, `\x1b[31mExpected ${expectedPaths.length} elements to match in the OpenAPI Document for expression array index [${exprIndex}].\x1b[0m\n`);

          expectedPaths.forEach((path, pathIndex) => {

            // Additional checks for each path
            debugInfo(`Element ${pathIndex + 1} found from JSONPath Expression array index [${exprIndex}]: \x1b[32m${JSON.stringify(result[pathIndex], null, 2)}`);
            
            // Check if each result matches the corresponding expected path
            expect(result[pathIndex]).to.deep.equal(path.expected, `\x1b[31mThe wrong JSONPath Expression was provided in expected path: ${pathIndex + 1}\x1b[0m`);

          });

        });
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayIdentificationIdMemberFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayIdMember, invalidApiDocumentArrayIdMember);

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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayIdentificationIdMemberPassing() {

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
   * Ruleset: document-structure-resource-array-identification-id-type
   */
  describe('document-structure-resource-array-identification-id-type:', function documentStructureResourceArrayIdentificationIdType() {

    const testingRuleName = 'document-structure-resource-array-identification-id-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayIdentificationIdTypePath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpressions = ruleset.rules[testingRuleName].given;
        // debugDebug(`JSONPath Expression: ${jsonPathExpressions}`);

        const expectedExpressionPaths = [
          [
            { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties.id }
          ],
          [
            // Left blank on purpose
          ]
        ];

        jsonPathExpressions.forEach((jsonPathExpression, exprIndex) => {
          
          debugDebug(`JSONPath Expression [${exprIndex}]: ${jsonPathExpression}`);

          const expectedPaths = expectedExpressionPaths[exprIndex];
          const result = JSONPath({ path: jsonPathExpression,
            json: dereferenceValidApiDocument });
          
          // Check if the number of results matches the expected number for this expression
          expect(result.length).to.equal(expectedPaths.length, `\x1b[31mExpected ${expectedPaths.length} elements to match in the OpenAPI Document for expression array index [${exprIndex}].\x1b[0m\n`);

          expectedPaths.forEach((path, pathIndex) => {

            // Additional checks for each path
            debugInfo(`Element ${pathIndex + 1} found from JSONPath Expression array index [${exprIndex}]: \x1b[32m${JSON.stringify(result[pathIndex], null, 2)}`);
            
            // Check if each result matches the corresponding expected path
            expect(result[pathIndex]).to.deep.equal(path.expected, `\x1b[31mThe wrong JSONPath Expression was provided in expected path: ${pathIndex + 1}\x1b[0m`);

          });

        });
        
      } catch (error) {
    
        processErrors(error);
        
      }
      
    });

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayIdentificationIdTypeFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayIdType, invalidApiDocumentArrayIdType);

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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayIdentificationIdTypePassing() {

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
   * Ruleset: document-structure-resource-array-identification-type-member
   */
  describe('document-structure-resource-array-identification-type-member:', function documentStructureResourceArrayIdentificationTypeMember() {

    const testingRuleName = 'document-structure-resource-array-identification-type-member';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayIdentificationTypeMemberPath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayIdentificationTypeMemberFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayTypeMember, invalidApiDocumentArrayTypeMember);

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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayIdentificationTypeMemberPassing() {

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
   * Ruleset: document-structure-resource-array-identification-type-type
   */
  describe('document-structure-resource-array-identification-type-type:', function documentStructureResourceArrayIdentificationTypeType() {

    const testingRuleName = 'document-structure-resource-array-identification-type-type';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayIdentificationTypeTypePath() {

      try {

        // debugDebug(`Dereferenced Document: ${JSON.stringify(dereferenceValidApiDocument, null, 2)}`);

        const jsonPathExpression = ruleset.rules[testingRuleName].given;
        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses['200'].content['application/vnd.api+json'].schema.properties.data.items.properties.type }
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayIdentificationTypeTypeFailure() {

      try {
    
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentArrayTypeType, invalidApiDocumentArrayTypeType);

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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayIdentificationTypeTypePassing() {

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
