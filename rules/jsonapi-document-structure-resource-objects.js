// Document Structure - Resource Objects - https://jsonapi.org/format/#document-resource-objects

// All rules in the file MUST have corresponding tests

import { enumeration, length, truthy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/#document-resource-objects',
  rules: {

    /**
     * Ensures that a `Resource Object` is of type `object` or `array`
     */
    'document-structure-resource-objects-type': {
      description: 'A `Resource Object` MUST be of type `object` or `array`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      // given: "$..[?(@.get || @.delete || @.put || @.patch || @.post)]..[?(@.responses || @.requestBody)]..content['application/vnd.api+json'].schema.properties.data.properties",
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: [
            'object',
            'array'
          ]
        }
      }
    },

    /**
     * Checks the presence of 'id' and 'type' within a single `Resource Object`.
     */
    'document-structure-resource-objects-single-structure': {
      description: 'A single `Resource Object` MUST only contain the specified members',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'id',
            'type',
            'attributes',
            'relationships',
            'links',
            'meta'
          ]
        }
      }
    },

    /**
     * Ensures that the single `Resource Object` contains an appropriate number of members.
     * This rule checks that a single `Resource Object` has a minmum of two members and a 
     * maximum of 6 members. This will even include for when an `id` member is not required
     * Exception because when creating a new resource, typically the `attributes` and/or
     * `relationships` objects are provided to supply the data needed to create the resource.
     */
    'document-structure-resource-objects-single-structure-length': {
      description: 'A single `Resource Object` MAY contain between two or six specified members',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data",
      then: {
        field: 'properties',
        function: length,
        functionOptions: {
          min: 2,
          max: 6
        }
      }
    },

    /**
     * Ensures that a single `Resource Object` has a `type` member.
     */
    'document-structure-resource-objects-single-type-required': {
      description: 'A single `Resource Object` MUST contain `type` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties",
      then: {
        field: 'type',
        function: truthy
      }
    },

    /**
     * Ensures that a single `Resource Object` has a `id` member for the specific
     * targeted HTTP methods: GET, DELETE, PUT, PATCH.
     * 
     * HTTP method 'POST' will not have an `id` member. When a client is sending a request
     * to create a new resource on the server, the `id` of the resource is not yet known, as
     * it is usually generated by the server. In such cases, the `Resource Object` in the 
     * request body will not include an `id` member. This is common in `POST` requests where
     * a new resource is being added.
     */
    'document-structure-resource-objects-single-id-required': {
      description: 'A single `Resource Object` MUST contain `id` member for HTTP methods: GET, DELETE, PUT, PATCH',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.properties",
      then: {
        field: 'id',
        function: truthy
      }
    },

    /**
     * Verifies that the `id` member in each single `Resource Object` is of type `string`.
     * This rule is crucial for maintaining consistency in `Resource Object` indentifiers.
     */
    'document-structure-resource-objects-single-id-type': {
      description: '`id` member in a single `Resource Object` MUST be of type `string`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data",
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
     * Verifies that the `type` member in each single `Resource Object` is of type `string`.
     * This rule is to assist with ensuring a single `Resource Object` share a common 
     * attributes and relationships.
     */
    'document-structure-resource-objects-single-type-type': {
      description: '`type` member in a single `Resource Object` MUST be of type `string`',
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
     * Verifies that the `attributes` member in each single `Resource Object` is of type `object`.
     * This rule is crucial for maintaining consistency in representing some of the resource's data.
     */
    'document-structure-resource-objects-single-attributes-type': {
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
     * Checks the presence of 'id' and 'type' within an array of resource objects.
     */
    'document-structure-resource-objects-array-required-fields': {
      description: 'An array of `Resource Objects` MUST contain `id` and `type` members',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'id',
            'type',
            'attributes',
            'relationships',
            'links',
            'meta'
          ]
        }
      }
    },

    /**
     * Checks the presence of 'id' and 'type' within an array of `Resource Objects`.
     */
    'document-structure-resource-objects-array-structure': {
      description: 'An array of `Resource Objects` MUST only contain the specified members',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'id',
            'type',
            'attributes',
            'relationships',
            'links',
            'meta'
          ]
        }
      }
    },

    /**
   * Ensures that the an array of `Resource Objects` contains an appropriate number of members.
   * This rule checks that an array of `Resource Objects` has a minmum of two members and a 
   * maximum of 6 members. This will even include for when an `id` member is not required
   * Exception because when creating a new resource, typically the `attributes` and/or
   * `relationships` objects are provided to supply the data needed to create the resource.
   */
    'document-structure-resource-objects-array-structure-length': {
      description: 'An array of `Resource Objects` MAY contain between two or six specified members',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items",
      then: {
        field: 'properties',
        function: length,
        functionOptions: {
          min: 2,
          max: 6
        }
      }
    },

    /**
   * Ensures that an array of `Resource Objects` has a `type` member.
   */
    'document-structure-resource-objects-array-type-required': {
      description: 'An array of `Resource Objects` MUST contain `type` member',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties",
      then: {
        field: 'type',
        function: truthy
      }
    },

    /**
   * Ensures that an array of `Resource Objects` has a `id` member for the specific
   * targeted HTTP methods: GET, DELETE, PUT, PATCH.
   * 
   * HTTP method 'POST' will not have an `id` member. When a client is sending a request
   * to create a new resource on the server, the `id` of the resource is not yet known, as
   * it is usually generated by the server. In such cases, the `Resource Object` in the 
   * request body will not include an `id` member. This is common in `POST` requests where
   * a new resource is being added.
   */
    'document-structure-resource-objects-array-id-required': {
      description: 'An array of `Resource Objects` MUST contain `id` member for HTTP methods: GET, DELETE, PUT, PATCH',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties",
      then: {
        field: 'id',
        function: truthy
      }
    },

    /**
   * Verifies that the `id` member in an array of `Resource Objects` is of type `string`.
   * This rule is crucial for maintaining consistency in `Resource Object` indentifiers.
   */
    'document-structure-resource-objects-array-id-type': {
      description: '`id` member in an array of `Resource Objects` MUST be of type `string`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.id",
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
   * Verifies that the `type` member in an array of `Resource Objects` is of type `string`.
   * This rule is to assist with ensuring aa array of `Resource Objects` share a common 
   * attributes and relationships.
   */
    'document-structure-resource-objects-array-type-type': {
      description: '`type` member in an array of `Resource Objects` MUST be of type `string`',
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
    },

    /**
   * Verifies that the `attributes` member in an array of `Resource Objects` is of type `object`.
   * This rule is crucial for maintaining consistency in representing some of the resource's data.
   */
    'document-structure-resource-objects-array-attributes-type': {
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
    }


  }
};
