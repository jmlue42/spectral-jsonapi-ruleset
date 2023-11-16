// Document Structure - Meta Information - https://jsonapi.org/format/1.0/#document-meta

// All rules in this file MUST have corresponding tests

import { enumeration } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-meta',
  rules: {
    'meta-object-schema': {
      description: 'The value of each meta member MUST be an object (a “meta object”)',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..properties[?(@property === 'meta')]",
      then: {
        field: 'type',
        function: enumeration,
        functionOptions: {
          values: ['object']
        }
      }
    }
  }
};
