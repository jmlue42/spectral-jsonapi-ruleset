// Document Structure - Resource Objects - https://jsonapi.org/format/1.0/#document-resource-object-attributes

// All rules in the file MUST have corresponding tests

import { enumeration, pattern, falsy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-resource-object-attributes',
  rules: {

    /**
     * Verifies that the `attributes` member in each single `Resource Object` is of type `object`.
     * This rule is crucial for maintaining consistency in representing some of the resource's data.
     */
    'document-structure-resource-single-attributes-type': {
      description: '`attributes` member in a single `Resource Object` MUST be of type `object`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties.attributes",
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
     * Ensures that the `attributes` member in a single `Resource Object` does not
     * contain any foreign keys, which is stated 'SHOULD NOT appear as attributes'
     * per JSON:API v1.0.
     */
    'document-structure-resource-single-attributes-no-foreign-keys': {
      description: '`attributes` member in a single `Resource Object` SHOULD NOT contain any foreign keys',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties",
      then: {
        field: '@key',
        function: pattern,
        functionOptions: {
          notMatch: '.*_id$'
        }
      }
    },

    /**
     * Ensures that the `attributes` member in a single `Resource Object` does not
     * contain a `relationships` member, which is stated 'MUST NOT cotain a `relationships`
     * member' per JSON:API v1.0. This rule will also conduct a check for deeply nested
     * objects to ensure that a `relationships` member is not present.
     */
    'document-structure-resource-single-attributes-no-relationships-member': {
      description: '`attributes` member in a single `Resource Object` MUST NOT contain a `relationships` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties.attributes..[?(@property == 'relationships')]",
      then: {
        function: falsy
      }
    },

    /**
     * Ensures that the `attributes` member in a single `Resource Object` does not
     * contain a `links` member, which is stated 'MUST NOT cotain a `links` member'
     * per JSON:API v1.0. This rule will also conduct a check for deeply nested
     * objects to ensure that a `links` member is not present.
     */
    'document-structure-resource-single-attributes-no-links-member': {
      description: '`attributes` member in a single `Resource Object` MUST NOT contain a `links` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties.attributes..[?(@property == 'links')]",
      then: {
        function: falsy
      }
    },

    /**
     * Verifies that the `attributes` member in an array of `Resource Objects` is of type `object`.
     * This rule is crucial for maintaining consistency in representing some of the resource's data.
     */
    'document-structure-resource-array-attributes-type': {
      description: '`attributes` member in an array of `Resource Objects` MUST be of type `object`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.attributes",
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
     * Ensures that the `attributes` member in an array of `Resource Objects` does not
     * contain any foreign keys, which is stated 'SHOULD NOT appear as attributes'
     * per JSON:API v1.0.
     */
    'document-structure-resource-array-attributes-no-foreign-keys': {
      description: '`attributes` member in an array of `Resource Objects` SHOULD NOT contain any foreign keys',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties",
      then: {
        field: '@key',
        function: pattern,
        functionOptions: {
          notMatch: '.*_id$'
        }
      }
    },

    /**
     * Ensures that the `attributes` member in an array of `Resource Objects` does not
     * contain a `relationships` member, which is stated 'MUST NOT cotain a `relationships`
     * member' per JSON:API v1.0. This rule will also conduct a check for deeply nested
     * objects to ensure that a `relationships` member is not present.
     */
    'document-structure-resource-array-attributes-no-relationships-member': {
      description: '`attributes` member in an array of `Resource Objects` MUST NOT contain a `relationships` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.attributes..[?(@property == 'relationships')]",
      then: {
        function: falsy
      }
    },

    /**
     * Ensures that the `Attributes` member in an array of `Resource Objects` does not
     * contain a `links` member, which is stated 'MUST NOT cotain a `links` member'
     * per JSON:API v1.0. This rule will also conduct a check for deeply nested
     * objects to ensure that a `links` member is not present.
     */
    'document-structure-resource-array-attributes-no-links-member': {
      description: '`attributes` member in an array of `Resource Objects` MUST NOT contain a `links` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.attributes..[?(@property == 'links')]",
      then: {
        function: falsy
      }
    }

  }
};
