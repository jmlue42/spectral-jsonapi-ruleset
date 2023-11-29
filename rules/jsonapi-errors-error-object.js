// Errors - Error Objects - https://jsonapi.org/format/#error-objects

// All rules in the file MUST have corresponding tests

import { enumeration, length, schema } from '@stoplight/spectral-functions';
import validatePropertiesWithCriteria from '../functions/validatePropertyType.js';

export default {
  documentationUrl: 'https://jsonapi.org/format/#error-objects',
  rules: {

    /**
     * Ensures that the 'JsonApiError' schema is only used in responses with
     * status codes between 400 and 599. This rule aims to validate that error
     * responses follow the JSON:API specification by using the correct schema.
     */
    'errors-error-objects-4xx-5xx-responses': {
      description: 'Ensure JsonApiError schema is used only in responses with status codes 400-599',
      message: '{{path - {{description}}',
      severity: 'error',
      given: '$.paths.*.*.responses[?(@property >= 400 && @property <= 599)]',
      then: [
        {
          field: 'content.application/vnd.api+json.schema.$ref',
          function: schema,
          functionOptions: {
            schema: {
              type: 'string',
              pattern: '^#/components/schemas/JsonApiError$'
            }
          }
        }
      ]
    },

    /**
     * Checks that error objects are structured correctly within the response.
     * Specifically, it ensures that the 'errors' key is an array, adhering
     * to the JSON:API specification.
     */
    'errors-error-objects-array-structure': {
      description: 'Error objects must be returned in an array under `errors` key.',
      message: '{{path}} - {{error}}',
      severity: 'error',
      // given: "$.paths.*.*.responses.[?(@property >= '400' && @property <= '599')].content.*.schema.properties",
      // given: "$.paths.*.*.responses.['400'].content.*.schema.properties",
      // given: "$.paths.*.*.responses.['400'].content.*.schema.properties.errors",
      // given: "$.paths.*.*.responses.*[?(@property === 'errors')]",
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property ==='properties')]",
      // given: "$..[?(@property === '400')]..[*[?(@property ==='properties')]",
      // given: "$.components.schemas.JsonApiError.properties.errors",
      then: [
        // {
        //   function: schema,
        //   functionOptions: {

        //     // schema: {
        //     //   type: 'object',
        //     //   not: {
        //     //     properties: {
        //     //       type: {
        //     //         const: 'object'
        //     //       }
        //     //     }
        //     //   },
        //     //   properties: {
        //     //     errors: {
        //     //       const: 'array'
        //     //       // items: { type: 'object' }
        //     //     }
        //     //   }
        //     //   // ,
        //     //   // required: ['errors']
        //     // }

        //     // schema: {
        //     //   type: 'array',
        //     //   items: {
        //     //     type: 'object',
        //     //     properties: {
        //     //       // Error Object Properties here
        //     //     }
        //     //     // constraints here if needed
        //     //   }
        //     // }

        //     schema: {
        //       type: 'array'
        //     }

        //   }
        // }


        {
          function: validatePropertiesWithCriteria,
          functionOptions: {
            propertyName: 'errors',
            propertyType: 'array'
          }
        }

        // {
        //   function: schema,
        //   functionOptions: {
        //     schema: {
        //       type: 'object',
        //       properties: {
        //         type: {
        //           type: 'string',
        //           enum: ['array']
        //         },
        //         items: {
        //           type: 'object'
        //         }
        //       }
        //     }
        //   }
        // }
      ]
    },

    /**
     * Validates the structure of error objects within the 'errors' array.
     * It ensures that error objects only contain specified members as per
     * JSON:API guidelines.
     */
    'errors-error-objects-object-structure': {
      description: 'Error objects must only contain the specified members.',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties",
      // given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items",
      // given: "$..paths.*.*.responses.*.content.*.schema.properties.errors[*]",
      // given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property ==='errors')]",
      then: 
      //   {
      //   // field: "",
      //   function: schema,
      //   functionOptions: {
      //     schema: {
      //       // Original type: 'object'
      //       // type: 'string',
      //       // properties: {
      //         // id: { type: 'string' },
      //         // links: { type: 'object' },
      //         // status: { type: 'string' },
      //         // code: { type: 'string' },
      //         // title: { type: 'string' },
      //         // detail: { type: 'string' },
      //         // source: { type: 'object' },
      //         // meta: { type: 'object' }
      //       // },
      //       // minProperties: 1

      //       // Only check members
      //       properties: {
      //         id,
      //         links,
      //         status,
      //         code,
      //         title,
      //         detail,
      //         source,
      //         meta
      //       },
      //     }
      //   }
      // }

        {
          field: '@key',
          function: enumeration,
          functionOptions: {
            values: [
              'id',
              'links',
              'status',
              'code',
              'title',
              'detail',
              'source',
              'meta'
            ]
          }
        }
    },

    /**
     * Ensures the error objects contain an appropriate number of members.
     * This rule checks that each error object has at least one and no more
     * than eight members.
     */
    'errors-error-objects-object-structure-length': {
      description: 'Error objects must only contain the specified members.',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items",
      then: {
        field: 'properties',
        function: length,
        functionOptions: {
          min: 1,
          max: 8
        }
      }
    },

    /**
     * Verifies that the 'id' member in each error object is of type 'string'.
     * This rule is crucial for maintaining consistency in error object identifiers.
     */
    'errors-error-objects-items-id-type': {
      description: 'Id member in "errors" array must by of type "string".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.id",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            // Original type: 'string'
            type: 'string'
          }
        }
      }
    },

    /**
     * Ensures that the 'links' member in each error object is of type 'object'.
     * This rule checks the structure of 'links' objects within error responses.
     */
    'errors-error-objects-items-links-type': {
      description: 'Links member in "errors" array must by of type "object".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.links",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'object'
          }
        }
      }
    },

    /**
     * Checks the members of 'links' objects in error responses.
     * It validates that 'links' object only contain the 'about' and/or 'type' members.
     */
    'errors-error-objects-items-links': {
      description: 'Links object may contain one of the following members: "about" and/or "type".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.links.properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'about',
            'type'
          ]
        }
      }
    },

    /**
     * Validates the number of members in 'links' objects within error objects.
     * Ensures that each 'links' object contains only one or two specified members.
     */
    'errors-error-objects-items-links-structure-length': {
      description: 'Links objects must only contain the specified members.',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.links",
      then: {
        field: 'properties',
        function: length,
        functionOptions: {
          min: 1,
          max: 2
        }
      }
    },

    /**
     * Checks that the 'about' member in 'links' objects is a well-formed URI string.
     * This rule is essential for ensuring that reference URLs in error objects are valid.
     */
    'errors-error-objects-items-links-about-type': {
      description: 'About member in the Links object must be of type "string" in the format of an "URI".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.links.about",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string',
            format: 'uri'
          }
        }
      }
    },

    /**
     * Validates te structure of the 'type' member in 'links' objects within error arrays.
     * Ensures that it is a string formatted as a URI, aligning with JSON:API specifications.
     */
    'errors-error-objects-items-links-type-type': {
      description: 'Type member in the Links object must be of type "string" in the format of an "URI".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.links.type",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string',
            format: 'uri'
          }
        }
      }
    },

    /**
     * Ensures the 'status' member in error objects is of type 'string'.
     * This rule checks the format of HTTP status codes in error responses.
     */
    'errors-error-objects-items-status-type': {
      description: 'Status member in "errors" array must by of type "string".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.status",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string'
          }
        }
      }
    },

    /**
     * Validates that the 'code' member in error objects is a string.
     * This rule helps in standardizing error codes within error responses.
     */
    'errors-error-objects-items-code-type': {
      description: 'code member in "errors" array must by of type "string".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.code",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string'
          }
        }
      }
    },

    /**
     * Ensures that the 'title' member in error objects is of type 'string'.
     * This rule checks the format of error titles, ensuring they are textual descriptions.
     */
    'errors-error-objects-items-title-type': {
      description: 'title member in "errors" array must by of type "string".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.title",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string'
          }
        }
      }
    },

    /**
     * Validates that the 'detail member in error objects is a string.
     * This rule ensures that error details provide a clear textual explanation.
     */
    'errors-error-objects-items-detail-type': {
      description: 'detail member in "errors" array must by of type "string".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.detail",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string'
          }
        }
      }
    },

    /**
     * Checks that the 'source' member in error objects is of type 'object'.
     * This rule validates the structure of 'source' objects, which pinpoint the origin of errors.
     */
    'errors-error-objects-items-source-type': {
      description: 'Source member in "errors" array must by of type "object".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'object'
          }
        }
      }
    },

    /**
     * Validates the members of 'source' objects in error responses.
     * Ensures 'source' objects contain only 'pointer', 'parameter', and/or 'header' members.
     */
    'errors-error-objects-items-source': {
      description: 'Source object SHOULD contain one of the following members: "pointer", "parameter" and/or "header".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source.properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'pointer',
            'parameter',
            'header'
          ]
        }
      }
    },

    /**
     * Ensures that the 'pointer' member in 'source' objects is a string.
     * This rule checks the format of 'pointer', which should indicate the exact location of the error.
     */
    'errors-error-objects-items-source-pointer-type': {
      description: 'Pointer member in the Source object must be of type "string".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source.properties.pointer.type",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string'
          }
        }
      }
    },

    /**
     * Validates the 'parameter' member in 'source' objects as a string.
     * This rule is important for correctly identifying query parameters related to errors.
     */
    'errors-error-objects-items-source-parameter-type': {
      description: 'Parameter member in the Source object must be of type "string".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source.properties.parameter.type",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string'
          }
        }
      }
    },

    /**
     * Checks that the 'header' member in 'source' objects is of type 'string'.
     * It ensures accurate identification of headers related to errors in requests.
     */
    'errors-error-objects-items-source-header-type': {
      description: 'Header member in the Source object must be of type "string".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source.properties.header.type",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string'
          }
        }
      }
    },

    /**
     * Validates the number of members in 'source' objects within error objects.
     * Ensures that each 'source' object hsa between one and three members.
     */
    'errors-error-objects-items-source-structure-length': {
      description: 'Source objects must only contain the specified members.',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source",
      then: {
        field: 'properties',
        function: length,
        functionOptions: {
          min: 1,
          max: 3
        }
      }
    },

    /**
     * Ensures that the 'meta' member in error objects is of type 'object'.
     * This rule checks the structure of 'meta' objects. which may contain additional error information.
     */
    'errors-error-objects-items-meta-type': {
      description: 'Meta member in "errors" array must by of type "object".',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.meta",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'object'
          }
        }
      }
    }

  }

};
