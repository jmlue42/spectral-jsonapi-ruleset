// Document Structure - Top Level - https://jsonapi.org/format/1.0/#document-jsonapi-object

// All rules in this file MUST have corresponding tests

import { schema, falsy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-jsonapi-object',
  rules: {
    'jsonapi-object-schema': {
      description: 'jsonapi object must match schema',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..properties[?(@property === 'jsonapi')]",
      then: [
        {
          function: schema,
          functionOptions: {
            schema: {
              type: 'object',
              required: [
                'properties',
                'type',
                'additionalProperties'
              ],
              properties: {
                type: {
                  type: 'string',
                  enum: ['object']
                },
                properties: {
                  type: 'object',
                  properties: {
                    version: {
                      type: 'object',
                      required: ['type'],
                      properties: {
                        type: {
                          type: 'string',
                          enum: ['string']
                        }
                      }
                    },
                    meta: {
                      type: 'object',
                      required: ['type'],
                      properties: {
                        type: {
                          type: 'string',
                          enum: ['object']
                        },
                        additionalProperties: {
                          type: 'boolean'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        {
          field: 'additionalProperties',
          function: falsy
        }
      ]
    }
  }
};
