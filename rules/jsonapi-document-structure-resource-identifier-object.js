// Document Structure - Resource Identifier Object - https://jsonapi.org/format/1.0/#document-resource-identifier-objects

// All rules in this file MUST have corresponding tests

import { enumeration, truthy } from '@stoplight/spectral-functions';
import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-resource-identifier-objects',
  rules: {
    'relationships-data': {
      description: '\'relationships..data\' properties MUST be an object or an array of objects with a min schema ',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$..*[?(@property === 'relationships')]..properties.data",
      then: [
        {
          field: 'type',
          function: enumeration,
          functionOptions: {
            values: ['object', 'array']
          }
        },
        {
          field: 'required',
          function: truthy
        },
        {
          field: 'required',
          function: enumeration,
          functionOptions: {
            values: ['id', 'type']
          }
        }
      ]
    },
    'relationships-data-allow-meta': {
      description: 'Resource Identifier Objects MUST have id and type fields with an optional meta object',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$..*[?(@property === 'relationships')]..properties.data..properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: ['id', 'type', 'meta']
        }
      }
    }
  }
};
