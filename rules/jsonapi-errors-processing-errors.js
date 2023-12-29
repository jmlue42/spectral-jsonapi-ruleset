// Errors - Error Objects - https://jsonapi.org/format/#error-processing

// All rules in the file MUST have corresponding tests

import { enumeration, truthy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/#error-processing',
  rules: {

    /**
     * Checks that error objects array contains the JSON Schema keyword 
     * `maxItems` to enforce one status code being returned when multiple
     * probblems are encountered.
     * 
     * It's important to note that while this rule ensures the document
     * includes the `maxItems` keyword, it doesn't enforce the actual behavior
     * in your API's code. Essentially you will want to ensure separately
     * that the API implementation respects this specific contraint.
     */
    'errors-processing-errors-array-max-items': {
      description: 'When multiple problems are encountered one status code needs to be returned',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')].content['application/vnd.api+json'].schema.properties.[?(@property === 'errors')]",
      then: {
        field: 'maxItems',
        function: truthy
      }
    },

    /**
     * Checks that error objects array contains the JSON Schema keyword 
     * `maxItems`  and have the appropraite value which is to enforce
     * one status code being returned when multiple probblems are encountered.
     * 
     * It's important to note that while this rule ensures the document
     * includes the `maxItems` keyword, it doesn't enforce the actual behavior
     * in your API's code. Essentially you will want to ensure separately
     * that the API implementation respects this specific contraint.
     */
    'errors-processing-errors-array-max-items-value': {
      description: 'When multiple problems are encountered one status code needs to be returned',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')].content['application/vnd.api+json'].schema.properties.[?(@property === 'errors')]",
      then: {
        field: 'maxItems',
        function: enumeration,
        functionOptions: {
          values: [
            1
          ]
        }
      }
    }

  }

};
