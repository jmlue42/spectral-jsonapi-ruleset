// Document Structure - Resource Objects - Identification - https://jsonapi.org/format/1.0/#document-resource-object-identification

// All rules in the file MUST have corresponding tests

import { enumeration, truthy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-resource-object-identification',
  rules: {

    /**
     * Ensures that a single `Resource Object` contains a `id` member.
     */
    'document-structure-resource-single-identification-id-member': {
      description: 'A single `Resource Object` MUST contain an `id` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: [
        "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses')]..content['application/vnd.api+json'].schema.properties.data.properties",
        "$..[?(@property == 'put' || @property == 'patch')]..[?(@property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties"
      ],
      then: {
        field: 'id',
        function: truthy
      }
    },

    /**
     * Ensures that a single `Resource Object` contains a `id` member.
     */
    'document-structure-resource-single-identification-id-type': {
      description: 'A single `Resource Object` `id` member MUST be of type `string`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: [
        "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses')]..content['application/vnd.api+json'].schema.properties.data.properties.id",
        "$..[?(@property == 'put' || @property == 'patch')]..[?(@property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties.id"
      ],
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
     * Ensures that a single `Resource Object` contains a `type` member.
     */
    'document-structure-resource-single-identification-type-member': {
      description: 'A single `Resource Object` MUST contain an `type` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties",
      then: {
        field: 'type',
        function: truthy
      }
    },

    /**
     * Ensures that a single `Resource Object` contains a `type` member.
     */
    'document-structure-resource-single-identification-type-type': {
      description: 'A single `Resource Object` `type` member MUST be of type `string`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties.type",
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
     * Ensures that an array of `Resource Objects` contains a `id` member.
     */
    'document-structure-resource-array-identification-id-member': {
      description: 'An array of `Resource Objects` MUST contain an `id` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: [
        "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses')]..content['application/vnd.api+json'].schema.properties.data.items.properties",
        "$..[?(@property == 'put' || @property == 'patch')]..[?(@property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties"
      ],
      then: {
        field: 'id',
        function: truthy
      }
    },

    /**
     * Ensures that an array of `Resource Objects` contains a `id` member.
     */
    'document-structure-resource-array-identification-id-type': {
      description: 'An array of `Resource Objects` `id` member MUST be of type `string`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: [
        "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses')]..content['application/vnd.api+json'].schema.properties.data.items.properties.id",
        "$..[?(@property == 'put' || @property == 'patch')]..[?(@property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.id"
      ],
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
     * Ensures that an array of `Resource Objects` contains a `type` member.
     */
    'document-structure-resource-array-identification-type-member': {
      description: 'An array of `Resource Objects` MUST contain an `type` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties",
      then: {
        field: 'type',
        function: truthy
      }
    },

    /**
     * Ensures that an array of `Resource Objects` contains a `type` member.
     */
    'document-structure-resource-array-identification-type-type': {
      description: 'An array of `Resource Objects` `type` member MUST be of type `string`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.type",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'string'
          ]
        }
      }
    }

  }
};
