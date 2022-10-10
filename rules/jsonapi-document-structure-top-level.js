// Document Structure - Top Level - https://jsonapi.org/format/#document-top-level

// All rules in this file MUST have corresponding tests

import { enumeration, truthy, falsy } from '@stoplight/spectral-functions';
import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/#document-top-level',
  rules: {
    'top-level-json-object': {
      description: 'A JSON object MUST be at the root of every JSON:API request/response body containing data.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$.paths..content[?(@property === 'application/vnd.api+json')].schema",
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
    'top-level-json-properties': {
      description: 'Must follow top level JSON:API document properties.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$.paths..content[?(@property === 'application/vnd.api+json')].schema.properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'data',
            'meta',
            'errors',
            'links',
            'included',
            'jsonapi'
          ]
        }
      }
    },
    'top-level-json-properties-included': {
      description: '\'data\' property must exist if included is returned',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$.paths..content[?(@property === 'application/vnd.api+json')].schema.properties[?(@property === 'included')]^",
      then: {
        field: 'data',
        function: truthy
      }
    },
    'top-level-json-properties-errors': {
      description: '\'data\' property must not exist if errors is returned',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$.paths..content[?(@property === 'application/vnd.api+json')].schema.properties[?(@property === 'errors')]^",
      then: {
        field: 'data',
        function: falsy          
      }
    }
  }
};
