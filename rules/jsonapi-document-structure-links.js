// Document Structure - Links - https://jsonapi.org/format/1.0/#document-links

// All rules in this file MUST have corresponding tests

import { enumeration } from '@stoplight/spectral-functions';
import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-links',
  rules: {
    'links-object': {
      description: 'The value of each links member MUST be an object (a “links object”)',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$..properties[?(@property === 'links')]",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: ['object']
        }
      }
    },
    'links-object-schema-type': {
      description: 'A link must be represented as either a string containing the link\'s URL or an object',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$..properties[?(@property === 'links')].properties.*",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: ['object', 'string']
        }
      }
    },
    'links-object-schema-properties': {
      description: 'An object (“link object”) which can contain the following members (href and meta)',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$..properties[?(@property === 'links')].properties..properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: ['href', 'meta']
        }
      }
    },
    'links-object-schema-properties-href': {
      description: 'href is a string containing the link\'s URL',
      message: '{{path}} - {{description}}',
      severity: DiagnosticSeverity.Error,
      given: "$..properties[?(@property === 'links')].properties..properties[?(@property === 'href')]",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: ['string']
        }
      }
    },
  }
};
