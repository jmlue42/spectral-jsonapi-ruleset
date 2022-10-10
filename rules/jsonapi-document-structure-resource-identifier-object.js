// Document Structure - Resource Identifier Object - https://jsonapi.org/format/1.0/#document-resource-identifier-objects

// All rules in this file MUST have corresponding tests

import { enumeration, truthy } from '@stoplight/spectral-functions';
import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-resource-identifier-objects',
  rules: {
    'relationships-data': {
      description: '\'relationships..data\' property MUST be an object or an array of objects ',
    }
  }
};
