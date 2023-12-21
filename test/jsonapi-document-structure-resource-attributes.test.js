/* eslint-env mocha */
import { JSONPath } from 'jsonpath-plus';
import { expect } from 'chai';

// Rules to test
import ruleset from '../rules/jsonapi-document-structure-resource-fields-attributes.js';

// Helper Functions
import { resolveRef } from './utils/refResolver.js';
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { processErrors } from './utils/processErrors.js';
import { debugLog, debugError, debugInfo, debugDebug } from './utils/debugUtils.js';
import { setupSpectralBeforeEach } from './utils/setupSpectralBeforeEach.js';

// OpenAPI Documents
 import validApiDocument from './docs/errors/resourceObjectFields/validApiDocument.js';
import invalidApiDocumentAttributesIdNotRequired from './docs/errors/resourceObjectFields/invalidApiDocumentAttributesIdNotRequired.js';
import invalidApiDocumentAttributesTypeNotRequired from './docs/errors/resourceObjectFields/invalidApiDocumentAttributesTypeNotRequired.js';
import invalidApiDocumentRelationshipsIdNotRequired from './docs/errors/resourceObjectFields/invalidApiDocumentRelationshipsIdNotRequired.js';
import invalidApiDocumentRelationshipsTypeNotRequired from './docs/errors/resourceObjectFields/invalidApiDocumentRelationshipsTypeNotRequired.js';
import invalidApiDocumentAttributesRelationshipsUniqueName from './docs/errors/resourceObjectFields/invalidApiDocumentAttributesRelationshipsUniqueName.js';

describe('errors-process-errors-general ruleset:', function errorsProcessErrorsSuite() {

  let dereferenceValidApiDocument;

  before(function () {

    dereferenceValidApiDocument = resolveRef(validApiDocument, validApiDocument);

  });

  /**
 * Ruleset: document-structure-resource-array-attributes-no-id-name
 */
  describe('document-structure-resource-array-attributes-no-id-name:', function documentStructureResourceArrayAttributesNoIdName() {

    const testingRuleName = 'document-structure-resource-array-attributes-no-id-name';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayAttributesNoIdNamePath() {

      try
       {
      
        const jsonPathExpression = ruleset.rules[testingRuleName].given;

        const actualresult = JSONPath({ path: jsonPathExpression,
          json: dereferenceValidApiDocument });



        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);

      
        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties,}
          ];

          debugLog(expectedExpressionPaths.length);

        expectedExpressionPaths.forEach((path, index) => {

    
          debugInfo(`Element ${index + 1} found from JSONPath Expression: \x1b[32m${JSON.stringify(actualresult[index], null, 2)}`);

          // Check if the number of results matches the expected number
          expect(actualresult.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
        
          // Check if each result matches the corresponding expected path
          expect(actualresult[index]).to.deep.equal(path.expected, `\x1b[31mThe wrong JSONPath Expression was provided in expected path: ${index + 1}\x1b[0m`);

        });
      }
      
       catch (error) {
  
        processErrors(error);
      
      }
    });
    
      

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayAttributesNoIdNameFailure() {

      try {
  
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentAttributesIdNotRequired, invalidApiDocumentAttributesIdNotRequired);

        
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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayAttributesNoIdNamePassing() {

      try {
  
        const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);
  
        debugLog(`Confirmed Errors:`);
        debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

        const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
        expect(relevantResults.length).to.equal(0, errorMessage);
      
      } catch (error) {
  
        processErrors(error);
    
      }
  
    });
  });

  
  /**
 * Ruleset: document-structure-resource-array-attributes-no-type-name
 */
  describe('document-structure-resource-array-attributes-no-type-name:', function documentStructureResourceArrayAttributesNoTypeName() {

    const testingRuleName = 'document-structure-resource-array-attributes-no-type-name';

    beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

    it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayAttributesNoTypeNamePath() {

      try {

      
        const jsonPathExpression = ruleset.rules[testingRuleName].given;

        debugDebug(`JSONPath Expression: ${jsonPathExpression}`);

        const expectedExpressionPaths = [
          { expected: dereferenceValidApiDocument.paths['/users'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties,}
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

    it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayAttributesNoTypeNamePathFailure() {

      try {
  
        const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentAttributesTypeNotRequired, invalidApiDocumentAttributesTypeNotRequired);

      
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

    it('the rule should pass with NO errors', async function documentStructureResourceArrayAttributesNoTypeNamePathPassing() {

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
 * Ruleset: document-structure-resource-array-relationships-no-id-name
 */
describe('document-structure-resource-array-relationships-no-id-name:', function documentStructureResourceArrayRelationshipsNoIdName() {

  const testingRuleName = 'document-structure-resource-array-relationships-no-id-name';

  beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

  it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayRelationshipsNoIdNamePath() {

    try
     {
    
      const jsonPathExpression = ruleset.rules[testingRuleName].given;
      const result = JSONPath({ path: jsonPathExpression,
        json: dereferenceValidApiDocument });

      debugDebug(`JSONPath Expression: ${jsonPathExpression}`);

      
      const expectedExpressionPaths = [
        { expected: dereferenceValidApiDocument.paths['/users'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.properties.relationships.properties,}
        ];

      expectedExpressionPaths.forEach((path, index) => {

        

        debugInfo(`Element ${index + 1} found from JSONPath Expression: \x1b[32m${JSON.stringify(result[index], null, 2)}`);

        // Check if the number of results matches the expected number
        expect(result.length).to.equal(expectedExpressionPaths.length, `\x1b[31mExpected ${expectedExpressionPaths.length} elements to match in the OpenAPI Document.\x1b[0m\n`);
      
        // Check if each result matches the corresponding expected path
        expect(result[index]).to.deep.equal(path.expected, `\x1b[31mThe wrong JSONPath Expression was provided in expected path: ${index + 1}\x1b[0m`);

      });
    }
    
     catch (error) {

      processErrors(error);
    
    }
  });
  
    

  it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayRelationshipsNoIdNameFailure() {

    try {

      const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentRelationshipsIdNotRequired, invalidApiDocumentRelationshipsIdNotRequired);

      
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

  it('the rule should pass with NO errors', async function documentStructureResourceArrayRelationshipsNoIdNamePassing() {

    try {

      const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

      debugLog(`Confirmed Errors:`);
      debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

      const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
      expect(relevantResults.length).to.equal(0, errorMessage);
    
    } catch (error) {

      processErrors(error);
  
    }

  });
});


/**
 * Ruleset: document-structure-resource-array-relationships-no-type-name
 */


describe('document-structure-resource-array-relationships-no-type-name:', function documentStructureResourceArrayRelationshipsNoTypeName() {

  const testingRuleName = 'document-structure-resource-array-relationships-no-type-name';

  beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

  it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayRelationshipsNoTypeNamePath() {

    try
     {
    
      const jsonPathExpression = ruleset.rules[testingRuleName].given;
      debugDebug(`JSONPath Expression: ${jsonPathExpression}`);

      
      const expectedExpressionPaths = [
       
           {  expected: dereferenceValidApiDocument.paths['/users'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.properties.relationships.properties,}
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
    }
    
     catch (error) {

      processErrors(error);
    
    }
  });
  
    

  it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayRelationshipsNoTypeNameFailure() {

    try {

      const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentRelationshipsTypeNotRequired, invalidApiDocumentRelationshipsTypeNotRequired);

      
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

  it('the rule should pass with NO errors', async function documentStructureResourceArrayRelationshipsNoTypeNamePassing() {

    try {

      const relevantResults = await handleSpectralResults(this.spectral, dereferenceValidApiDocument, testingRuleName);

      debugLog(`Confirmed Errors:`);
      debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

      const errorMessage = `\x1b[31mError count should be 0, ${ruleset.rules[testingRuleName].description}\x1b[0m`;
      expect(relevantResults.length).to.equal(0, errorMessage);
    
    } catch (error) {

      processErrors(error);
  
    }

  });
});


/**
* Ruleset: document-structure-resource-array-attributes-relationships-unique-name
*/
describe('document-structure-resource-array-attributes-relationships-unique-name:', function documentStructureResourceArrayRelationshipsNoTypeName() {

  const testingRuleName = 'document-structure-resource-array-attributes-relationships-unique-name';

  beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

  it('the json path expression should find the correct paths from the given document', function documentStructureResourceArrayRelationshipsNoTypeNamePath() {

    try {

    
      const jsonPathExpression = ruleset.rules[testingRuleName].given;

      debugDebug(`JSONPath Expression: ${jsonPathExpression}`);

      const expectedExpressionPaths = [
        { expected: dereferenceValidApiDocument.paths['/users'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties,},
        {  expected: dereferenceValidApiDocument.paths['/users'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.properties.relationships.properties,}
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

  it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function documentStructureResourceArrayRelationshipsNoTypeNamePathFailure() {

    try {

      const dereferencedOpenApiDocument = resolveRef(invalidApiDocumentAttributesRelationshipsUniqueName, invalidApiDocumentAttributesRelationshipsUniqueName);

    
      const relevantResults = await handleSpectralResults(this.spectral, dereferencedOpenApiDocument, testingRuleName);

      debugLog(`  Confirmed Errors:`);
      debugLog(`\x1b[33m    - ${relevantResults.length}\x1b[0m\n`);

      relevantResults.forEach((result) => {

        debugError(`\x1b[32mResults for '\x1b[33m${testingRuleName}\x1b[32m':\x1b[36m ${JSON.stringify(result, ['message', 'path'], 2)} \x1b[0m\n`);

      });

      const confirmedErrors = 2;
      const errorMessage = `\x1b[31mError count should be ${confirmedErrors}.\x1b[0m`;

      expect(relevantResults.length).to.equal(confirmedErrors, errorMessage);
    
    } catch (error) {

      processErrors(error);
    
    }
  
  });

  it('the rule should pass with NO errors', async function documentStructureResourceArrayRelationshipsNoTypeNamePassing() {

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




  
 
    


