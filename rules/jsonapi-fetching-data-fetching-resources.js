// Fetching Data - Fetching Resources - https://jsonapi.org/format/1.0/#fetching-resources

// All rules in the file MUST have corresponding tests

import { truthy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#fetching-resources',
  rules: {

    /**
     * Ensure top-level resposnes include a `self` link in a `links` object
     */
    'fetching-data-fetching-resources-top-level-links': {
      description: 'Ensure top-level resposnes include a `self` link in a `links` object',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$.paths.*.*.responses.*.content['application/vnd.api+json'].schema.properties.links.properties",
      then: {
        field: 'self',
        function: truthy
      }
    },

    /**
     * Checks for the presence of a `self` link in each resource object within a single responses
     */
    'fetching-data-fetching-resources-single-level-self-link': {
      description: 'Ensure single resource object responses include a `self` link in a `links` object',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$.paths.*.*.responses.*.content['application/vnd.api+json'].schema.properties.data.properties.links.properties",
      then: {
        field: 'self',
        function: truthy
      }
    },

    /**
     * Ensures that relationship objects within each resource in responses has a `related` link
     */
    'fetching-data-fetching-resources-single-relationship-level-related-link': {
      description: 'Ensure relationship objects in responses include a `related` link',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$.paths.*.*.responses.*.content['application/vnd.api+json'].schema.properties.data.properties.relationships.properties.*.properties",
      then: {
        field: 'related',
        function: truthy
      }
    },

    /**
     * Checks for the presence of a `self` link in each resource object within array responses
     */
    'fetching-data-fetching-resources-array-level-self-link': {
      description: 'Ensure single resource object responses include a `self` link in a `links` object',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$.paths.*.*.responses.*.content['application/vnd.api+json'].schema.properties.data.items.properties.links.properties",
      then: {
        field: 'self',
        function: truthy
      }
    },

    /**
     * Ensures that relationship objects within each resource in array responses has a `related` link
     */
    'fetching-data-fetching-resources-array-relationship-level-related-link': {
      description: 'Ensure relationship objects in each resource in array resposnes include a `related` link',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$.paths.*.*.responses.*.content['application/vnd.api+json'].schema.properties.data.items.properties.relationships.properties.*.properties",
      then: {
        field: 'related',
        function: truthy
      }
    }

  }
};
