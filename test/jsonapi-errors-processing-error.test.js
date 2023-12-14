
/* eslint-env mocha */
import { JSONPath } from 'jsonpath-plus';
import {expect} from 'chai'

// Rules to test
import ruleset from '../rules/jsonapi-errors-processing-error.js';

// Helper Functions
import { resolveRef } from './utils/refResolver.js';
import { handleSpectralResults } from './utils/handleSpectralResults.js';
import { processErrors } from './utils/processErrors.js';
import { debugLog, debugError, debugInfo, debugDebug } from './utils/debugUtils.js';
import { setupSpectralBeforeEach } from './utils/setupSpectralBeforeEach.js';

// OpenAPI Documents
 import validApiDocument from './docs/errors/processingErrors/validApiDocument.js';
 import invalidApiDocument4xx from './docs/errors/processingErrors/invalidApiDocument4xx.js';
 import invalidApiDocument5xx from './docs/errors/processingErrors/invalidApiDocument5xx.js';

 describe('errors-process-errors-general ruleset:', function errorsProcessErrorsSuite() 
{

  let dereferenceValidApiDocument;

  before(function () {

    dereferenceValidApiDocument = resolveRef(validApiDocument, validApiDocument);

  });

/**
 * Ruleset: errors-processing-errors-no-multiple-4xx-codes
 */
describe('errors-processing-errors-no-multiple-4xx-codes:', function errorsProcessingErrorsNoMultiple4xxCodes() {

  const testingRuleName = 'errors-processing-errors-no-multiple-4xx-codes';

  beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

  it('the json path expression should find the correct paths from the given document', function errorsProcessingErrorsNoMultiple4xxCodesPath() {

    try {

      
      const jsonPathExpression = ruleset.rules[testingRuleName].given;
      debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
      const expectedExpressionPaths = [
        { expected: dereferenceValidApiDocument.paths['/users'].get.responses },
        { expected: dereferenceValidApiDocument.paths['/users'].post.responses },
        { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses },
        { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses },
        { expected: dereferenceValidApiDocument.paths['/users/{userId}'].delete.responses }
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

  it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsProcessingErrorsNoMultiple4xxCodesFailure() {

    try {
  
      const dereferencedOpenApiDocument = resolveRef(invalidApiDocument4xx, invalidApiDocument4xx);

      
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

  it('the rule should pass with NO errors', async function errorsProcessingErrorsNoMultiple4xxCodesPassing() {

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
 * Ruleset: errors-processing-errors-no-multiple-5xx-codes
 */
describe('errors-processing-errors-no-multiple-5xx-codes:', function errorsProcessingErrorsNoMultiple5xxCodes() {

  const testingRuleName = 'errors-processing-errors-no-multiple-5xx-codes';

  beforeEach(setupSpectralBeforeEach(ruleset, [testingRuleName]));

  it('the json path expression should find the correct paths from the given document', function errorsProcessingErrorsNoMultiple5xxCodesPath() {

    try {

      
      const jsonPathExpression = ruleset.rules[testingRuleName].given;

      debugDebug(`JSONPath Expression: ${jsonPathExpression}`);
      
      const expectedExpressionPaths = [
        { expected: dereferenceValidApiDocument.paths['/users'].get.responses },
        { expected: dereferenceValidApiDocument.paths['/users'].post.responses },
        { expected: dereferenceValidApiDocument.paths['/users/{userId}'].get.responses },
        { expected: dereferenceValidApiDocument.paths['/users/{userId}'].put.responses },
        { expected: dereferenceValidApiDocument.paths['/users/{userId}'].delete.responses }
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

  it(`the rule should return "${testingRuleName}" errors, if ${ruleset.rules[testingRuleName].description} is false`, async function errorsProcessingErrorsNoMultiple5xxCodesFailure() {

    try {
  
      const dereferencedOpenApiDocument = resolveRef(invalidApiDocument5xx, invalidApiDocument5xx);

      
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

  it('the rule should pass with NO errors', async function errorsProcessingErrorsNoMultiple5xxCodesPassing() {

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



