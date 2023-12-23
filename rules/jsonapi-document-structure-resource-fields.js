
// Errors - Processing Error  - https://jsonapi.org/format/#document-resource-object-fields

// All rules in the file MUST have corresponding tests

import { falsy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/#document-resource-object-fields',
  rules: {
   
  
    /**
     * Ensures that the `Attributes` name in an array of `Resource Objects` does not
     * contain a `id` name, which is stated 'MUST NOT cotain a `id` name'
     * per JSON:API v1.0. This rule will also conduct a check for deeply nested
     * objects to ensure that a `id` name is not present.
     */
    'document-structure-resource-array-attributes-no-id-name': {
      description: '`attributes` name in an array of `Resource Objects` MUST NOT contain a `id` name',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties",
      
      then: {
        field: 'id',         
        function: falsy
      }
    },

  
    /**
     * Ensures that the `Attributes` name in an array of `Resource Objects` does not
     * contain a `type` name, which is stated 'MUST NOT cotain a `type` name'
     * per JSON:API v1.0. This rule will also conduct a check for deeply nested
     * objects to ensure that a `type` name is not present.
     */
    'document-structure-resource-array-attributes-no-type-name': {
      description: '`relationship` member in an array of `Resource Objects` MUST NOT contain a `type` name',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.attributes.properties",
      then: {
        field: 'type',
        function: falsy
      }
    },
  
  
    /**
     * Ensures that the `Relationships` name in an array of `Resource Objects` does not
     * contain a `id` name, which is stated 'MUST NOT cotain a `id` name'
     * per JSON:API v1.0. This rule will also conduct a check for deeply nested
     * objects to ensure that a `id` name is not present.
     */

    'document-structure-resource-array-relationships-no-id-name': {
      description: '`relationship` name in an array of `Resource Objects` MUST NOT contain a `id` name',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.relationships.properties",
      then: {
        field: 'id',
        function: falsy
      }
    },

    /**
     * Ensures that the `Relationships` name in an array of `Resource Objects` does not
     * contain a `type` name, which is stated 'MUST NOT cotain a `type` name'
     * per JSON:API v1.0. This rule will also conduct a check for deeply nested
     * objects to ensure that a `type` name is not present.
     */
    'document-structure-resource-array-relationships-no-type-name': {
      description: '`relationship` name in an array of `Resource Objects` MUST NOT contain a `type` name',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$..[?(@property == 'get' || @property == 'delete' || @property == 'put' || @property == 'patch' || @property == 'post')]..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data.items.properties.relationships.properties",
      then: {
        field: 'type',
        function: falsy
      }
    }
  }
};
