// Document Structure - Links - https://jsonapi.org/format/1.0/#document-member-names

// All rules in this file MUST have corresponding tests


import { pattern } from '@stoplight/spectral-functions';
import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-member-names',
  rules: {
    'member-names': {
      description: 'Implementation specific query parameters MUST adhere to the same constraints as member names along with additional requirements.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: [
        '$.paths[*][get].parameters.name',
        '$.paths[*][get].parameters[*].name'
      ],
      then: {
        // field: "@key", //The value can also be @key to apply the rule to the keys of an object.
        function: pattern, // I want to apply ALL Matches listed below to ALL Members
        functionOptions: {
          match: [
            '^[a-zA-Z0-9]',
            '[a-zA-Z0-9]$',
            '[a-zA-Z0-9-_]'
          ]
        }
      }
    }
  }
};
