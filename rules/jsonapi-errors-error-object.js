// Errors - Error Objects - https://jsonapi.org/format/#error-objects

// All rules in the file MUST have corresponding tests

import { enumeration, length, truthy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/#error-objects',
  rules: {

    /**
     * Checks that error objects are structured correctly within the response.
     * Specifically, it ensures that the 'errors' key is an array, adhering
     * to the JSON:API specification.
     */
    'errors-error-objects-array-structure': {
      description: '`error` objects MUST be returned in an array under `errors` key',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]]",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'array'
          ]
        }
      }
    },

    /**
     * Validates the structure of error objects within the 'errors' array.
     * It ensures that error objects only contain specified members as per
     * JSON:API guidelines.
     */
    'errors-error-objects-object-structure': {
      description: '`error` objects MUST only contain the specified members',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties",
      then: {
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
      description: '`error` objects MAY contain between one or eight specified members',
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
      description: '`id` member in `errors` array MUST by of type `string`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.id",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'string'
          ]
        }
      }
    },

    /**
     * Ensures that the 'links' member in each error object is of type 'object'.
     * This rule checks the structure of 'links' objects within error responses.
     */
    'errors-error-objects-items-links-type': {
      description: '`links` member in `errors` array MUST by of type `object`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.links",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'object'
          ]
        }
      }
    },

    /**
     * Checks the members of 'links' objects in error responses.
     * It validates that 'links' object only contain the 'about' and/or 'type' members.
     */
    'errors-error-objects-items-links-members': {
      description: '`links` object MAY contain only one of the following members: `about` and/or `type`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.links.properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'about'
          ]
        }
      }
    },

    /**
     * Validates the number of members in 'links' objects within error objects.
     * Ensures that each 'links' object contains only one or two specified members.
     */
    'errors-error-objects-items-links-structure-length': {
      description: '`links` objects MAY only contain the specified members and not be empty',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.links",
      then: {
        field: 'properties',
        function: length,
        functionOptions: {
          min: 1,
          max: 1
        }
      }
    },

    /**
     * Ensures the 'status' member in error objects is of type 'string'.
     * This rule checks the format of HTTP status codes in error responses.
     */
    'errors-error-objects-items-status-type': {
      description: '`status` member in `errors` array MUST by of type `string`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.status",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'string'
          ]
        }
      }
    },

    /**
     * Validates that the 'code' member in error objects is a string.
     * This rule helps in standardizing error codes within error responses.
     */
    'errors-error-objects-items-code-type': {
      description: '`code` member in `errors` array MUST by of type `string`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.code",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'string'
          ]
        }
      }
    },

    /**
     * Ensures that the 'title' member in error objects is of type 'string'.
     * This rule checks the format of error titles, ensuring they are textual descriptions.
     */
    'errors-error-objects-items-title-type': {
      description: '`title` member in `errors` array MUST by of type `string`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.title",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'string'
          ]
        }
      }
    },

    /**
     * Validates that the 'detail member in error objects is a string.
     * This rule ensures that error details provide a clear textual explanation.
     */
    'errors-error-objects-items-detail-type': {
      description: '`detail` member in `errors` array MUST by of type `string`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.detail",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'string'
          ]
        }
      }
    },

    /**
     * Checks that the 'source' member in error objects is of type 'object'.
     * This rule validates the structure of 'source' objects, which pinpoint the origin of errors.
     */
    'errors-error-objects-items-source-type': {
      description: '`source` member in `errors` array MUST by of type `object`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'object'
          ]
        }
      }
    },

    /**
     * Validates the members of 'source' objects in error responses.
     * Ensures 'source' objects contain only 'pointer', 'parameter', and/or 'header' members.
     */
    'errors-error-objects-items-source-members': {
      description: '`source` object SHOULD contain only one of the following members: `pointer`, `parameter` and/or `header`',
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
          ]
        }
      }
    },

    /**
     * Ensures that the 'pointer' member in 'source' objects is a string.
     * This rule checks the format of 'pointer', which should indicate the exact location of the error.
     */
    'errors-error-objects-items-source-pointer-type': {
      description: '`pointer` member in the `source` object MUST be of type `string`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source.properties.pointer",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'string'
          ]
        }
      }
    },

    /**
     * Validates the 'parameter' member in 'source' objects as a string.
     * This rule is important for correctly identifying query parameters related to errors.
     */
    'errors-error-objects-items-source-parameter-type': {
      description: '`parameter` member in the `source` object MUST be of type `string`',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source.properties.parameter",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'string'
          ]
        }
      }
    },

    /**
     * Validates the number of members in 'source' objects within error objects.
     * Ensures that each 'source' object has between one and three members.
     */
    'errors-error-objects-items-source-structure-length': {
      description: '`source` object MUST be between one or three members and not be empty',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..[?(@property >= '400' && @property <= '599')]..[*[?(@property === 'errors')]].items.properties.source",
      then: {
        field: 'properties',
        function: length,
        functionOptions: {
          min: 1,
          max: 2
        }
      }
    },

  }

};
