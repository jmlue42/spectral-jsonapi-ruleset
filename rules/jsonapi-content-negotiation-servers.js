// Content Negotiation - Client Responsibilities - https://jsonapi.org/format/1.0/#content-negotiation-servers

// All rules in this file MUST have corresponding tests

import { enumeration, truthy } from '@stoplight/spectral-functions';
// import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#content-negotiation-servers',
  rules: {
    'response-content-type': {
      description: 'All JSON:API response bodies MUST be returned with the header Content-Type: application/vnd.api+json',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: '$.paths..responses..content',
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'application/vnd.api+json'
          ]
        }
      }
    },
    '415-406-response-codes': {
      description: 'Servers MUST document and support a 415 and 406 on all paths in case of invalid media types',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: '$.paths..responses',
      then: [
        {
          field: '415',
          function: truthy
        },
        {
          field: '406',
          function: truthy
        }
      ]
    }
  }
};
