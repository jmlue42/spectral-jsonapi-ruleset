// Errors - Error Objects - https://jsonapi.org/format/#error-objects

// All rules in the file MUST have corresponding tests

import { schema, truthy } from '@stoplight/spectral-functions';

import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/#error-objects',
  rules: {

    /**
     * Ensures that error objects are structured correctly within the response.
     * According to JSON:API specification, error objects must be returned as 
     * an array under the 'errors' key. This rule checks the root ofthe document
     * to ensure that 'errors' is an array and contains objects.
     */
    'errors-error-objects-array-structure': {
      description: 'Error objects must be returned in an array under `errors` key.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: '$.paths.*.*.responses.*.content.*.schema.properties.errors',
      // given: '$.paths.*.*.responses.*.content[*].schema.properties.errors',
      // given: '$.paths.*.*.responses.*.content[*].schema.properties.errors',
      // given: "$.paths.*.*.responses.*.content['application/vnd.api+json'].schema.properties[?(@.errors)].errors",
      // given: "$.paths.*.*.responses.*.content['application/vnd.api+json'].schema.properties.errors",
      // given: ['$..components..errors'],
      then: {
        function: schema,
        functionOptions: {

          // schema: {
          //   type: 'object',
          //   not: {
          //     properties: {
          //       type: {
          //         const: 'object'
          //       }
          //     }
          //   },
          //   properties: {
          //     errors: {
          //       const: 'array'
          //       // items: { type: 'object' }
          //     }
          //   }
          //   // ,
          //   // required: ['errors']
          // }

          // schema: {
          //   type: 'array',
          //   items: {
          //     type: 'object',
          //     properties: {
          //       // Error Object Properties here
          //     }
          //     // constraints here if needed
          //   }
          // }

          schema: {
            type: 'array'
          }

        }
      }
    },

    /**
     * Validatesthe structure of each error object within the errors array.
     * According to JSON:API, an error object must contain at least one of the
     * specified members. This rule checks for the presence of at least one
     * property out of the specified oens in each error object.
     */
    'errors-error-objects-object-structure': {
      description: 'Error object must contain at least one of the specified members.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      // given: '$.errors[*]',
      given: '$.paths.*.*.responses.*.content.*.schema.properties.errors[*]',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            // Original type: 'object'
            type: 'object',
            properties: {
              id: { type: 'string' },
              links: { type: 'object' },
              status: { type: 'string' },
              code: { type: 'string' },
              title: { type: 'string' },
              detail: { type: 'string' },
              source: { type: 'object' },
              meta: { type: 'object' }
            },
            minProperties: 1
          }
        }
      }
    },

    /**
     * Checks the structure of the 'links' object within each error object.
     * Validates that the 'about' and 'type' properties in the 'links' object
     * are well-formed URIs. This ensures that any reference URLs provided
     * in error objects are valid and adhere tothe URI format.
     */
    'errors-error-objects-links': {
      description: 'Links object within error object should have valid URLs in "about" and/or "type".',
      message: '{{path}} - {{description}}',
      // Confirm if 'Warning' is acceptable or 'Error' is the required severity
      severity: DiagnosticSeverity.Warning, 
      given: '$.error[*].links',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'object',
            properties: {
              about: {
                type: 'string',
                format: 'uri'
              },
              type: {
                type: 'string',
                format: 'uri'
              },
              additionalProperties: false
            }
          }
        }
      }
    },

    /**
     * Validates the 'source' object in each error object.
     * Ensures that the 'source' object, if present, contains valid
     * 'pointer', 'parameter', or 'header' properties. This rule
     * helps in pinpointing the exact source of the error in the request,
     * whether it's a specific part of the payload (pointer), a query
     * paramter, or a header.
     */
    'errors-error-objects-source': {
      description: 'Source object in error object should contain valid "pointer", "parameter", or "header".',
      message: '{{path}} - {description}}',
      // Ask about severity
      severity: DiagnosticSeverity.Warning, 
      given: '$.errors[*].source',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'object',
            properties: {
              // Can add additional validation for JSON Pointer format, if required
              pointer: { type: 'string' },
              parameter: { type: 'string' },
              header: { type: 'string' }
            },
            additionalProperties: false
          }
        }
      }
    },

    /**
     * Checks for the presence and validity of the 'status' field in error objects.
     * this rule ensures that a 'status' is provided for each error and that it is
     * a string. Further validation can be added toconfirm it's a valid HTTP status
     * code if needed.
     */
    'errors-error-objects-status': {
      description: 'Status in error object should be a valid HTTP status code.',
      message: '{{path}} - {{description}}',
      // Ask about severity
      severity: DiagnosticSeverity.Warning, 
      given: '$.errors[*].status',
      then: {
        // Additional validation for status code format can be implemented with a custom function
        function: truthy        
      }
    },

    /**
     * Ensures the 'id' property in each error object, if present, is a string.
     * The 'id' serves as a unique identifier for a particular occurrence of the problem.
     */
    'errors-error-objects-id': {
      description: 'The `id` property in error objects should be a string.',
      message: '{{path}} - {{description}}',
      // Ask about severity
      severity: DiagnosticSeverity.Warning, 
      given: '$.errors[*].id',
      then: {
        function: schema,
        functionOptions: {
          schema: { type: 'string' }
        }
      }
    },


    /**
     * Validates the 'code' property in each object, ensuring it's a string.
     * The 'code' is an application-specific error code expressed as a string value.
     */
    'errors-error-objects-code': {
      description: 'The `code` property in error objects should be a string.',
      message: '{{path}} - {{description}}',
      // Ask about severity
      severity: DiagnosticSeverity.Warning, 
      given: '$.errors[*].code',
      then: {
        function: schema,
        functionOptions: {
          schema: { type: 'string' }
        }
      }
    },

    /**
     * Checks the 'title' property in each error object, ensuring it's a string.
     * The 'title' is a short, human-readable summary of the problem.
     */
    'errors-error-objects-title': {
      description: 'The `title` property in error objects should be a string.',
      message: '{{path}} - {{description}}',
      // Ask about severity
      severity: DiagnosticSeverity.Warning, 
      given: '$.errors[*].title',
      then: {
        function: schema,
        functionOptions: {
          schema: { type: 'string' }
        }
      }
    },

    /**
     * Validates the 'detail' property in each error object, ensuring it's a string.
     * The 'detail' provides a more detailed, human-readable explanation of the problem.
     */
    'errors-error-objects-detail': {
      description: 'The `detail` property in error objects should be a string.',
      message: '{{path} - {{description}}',
      // Ask about severity
      severity: DiagnosticSeverity.Warning, 
      given: '$.errors[*].detail',
      then: {
        function: schema,
        functionOptions: {
          schema: { type: 'string' }
        }
      }
    },

    /**
     * Checks the 'meta' property in each error object, ensuring it's an object.
     * The 'meta' is a place for non-standard meta-information about the error.
     */
    'errors-error-objects-meta': {
      description: 'the `meta` property in error objects should be an object',
      message: '{{path}} - {{description}}',
      // Ask about severity
      severity: DiagnosticSeverity.Warning, 
      given: '$.errors[*].meta',
      then: {
        function: schema,
        functionOptions: {
          schema: { type: 'object' }
        }
      }
    }


  }

};
