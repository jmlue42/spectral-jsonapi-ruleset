// Content Negotiation - Client Responsibilities - https://jsonapi.org/format/1.0/#content-negotiation-clients

// All rules in this file MUST have corresponding tests

import { enumeration } from '@stoplight/spectral-functions';
// import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#content-negotiation-clients',
  rules: {
    'request-content-type': {
      description: 'All JSON:API request bodies MUST be received with the header Content-Type: application/vnd.api+json',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: '$.paths..requestBody.content',
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: [
            'application/vnd.api+json'
          ]
        }
      }
    }
  }
};
