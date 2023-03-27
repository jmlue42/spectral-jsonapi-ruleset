// Document Structure - Links - https://jsonapi.org/format/1.0/#document-member-names

// All rules in this file MUST have corresponding tests


import { enumeration, pattern, casing} from '@stoplight/spectral-functions';
import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-member-names',
  rules: {
    'member-names': {
      description: 'Implementation specific query parameters MUST adhere to the same constraints as member names along with additional requirements.',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error, // error
      // query may be more like a POST https://dev.wix.com/api/rest/members/members/query-members
      // given: "$.paths[*][get]",   // "$..properties[?(@property === 'query')]",
      given: [
        "$.paths[*][get].parameters.name",
        "$.paths[*][get].parameters[*].name"
      ],
      then: {
        //field: "@key", //The value can also be @key to apply the rule to the keys of an object.
        function: pattern, //I want to apply ALL Matches listed below to ALL Members
        functionOptions: {
          // 4 regex may have to be expanded to 4 rules
          Match: "^[a-zA-Z0-9]",
          Match: "[a-zA-Z0-9]$",
          Match: "[a-zA-Z0-9-_]"
        }
      }
    }
  }
};
