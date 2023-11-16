// Document Structure - Links - https://jsonapi.org/format/1.0/#query-parameters
// All rules in this file MUST have corresponding tests

import { pattern } from '@stoplight/spectral-functions';
import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#query-parameters',
  rules: {
    'get-filter-query-parameters': {
      description: 'Implementation specific query parameters MUST adhere to the same constraints as member names ' +
                   'with the additional requirement that they MUST contain at least one non a-z character, which ' +
                   'is selected to be [-_A-Z].',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: [
        '$.paths[*][get].parameters.name',
        '$.paths[*][get].parameters[*].name'
      ],
      then: {
        field: '@key', // The value can also be @key to apply the rule to the keys of an object.
        function: pattern, // I want to apply ALL Matches listed below to ALL Members
        functionOptions: {
          match: '[A-Z-_]' // 4 regex may have to be expanded to 4 rules
        }
      }
    },

    // documentationUrl: 'https://jsonapi.org/format/1.0/#document-member-names',
    'member-names-begins_with': {
      description: 'Implementation specific query parameters MUST adhere to the same constraints as member names along with additional requirements.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      // query may be more like a POST https://dev.wix.com/api/rest/members/members/query-members
      // given: "$.paths[*][get]",   // "$..properties[?(@property === 'query')]",
      given: [
        '$.paths[*][get].parameters.name',
        '$.paths[*][get].parameters[*].name'
      ],
      then: {
        // field: "@key", //The value can also be @key to apply the rule to the keys of an object.
        function: pattern, // I want to apply ALL Matches listed below to ALL Members
        functionOptions: {
          match: '^[a-zA-Z0-9]'
        }

      }
    },

    // documentationUrl: 'https://jsonapi.org/format/1.0/#document-member-names',
    'member-names-end_with': {
      description: 'Implementation specific query parameters MUST adhere to the same constraints as member names along with additional requirements.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: [
        '$.paths[*][get].parameters.name',
        '$.paths[*][get].parameters[*].name'
      ],
      then: {
        // field: "@key", // The value can also be @key to apply the rule to the keys of an object.
        function: pattern, // Want to apply ALL Matches listed below to ALL Members
        functionOptions: {
          match: '[a-zA-Z0-9]$'
        }
      }
    },
    // documentationUrl: 'https://jsonapi.org/format/1.0/#document-member-names',
    'member-names-chars': {
      description: 'Implementation specific query parameters MUST adhere to the same constraints as member names along with additional requirements.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: [
        '$.paths[*][get].parameters.name',
        '$.paths[*][get].parameters[*].name'
      ],
      then: {
        // field: "@key", // The value can also be @key to apply the rule to the keys of an object.
        function: pattern, // Want to apply ALL Matches listed below to ALL Members
        functionOptions: {
          match: '[a-zA-Z0-9-_]'
        }


      }
    }

  }

};
