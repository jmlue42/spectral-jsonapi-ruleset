// Document Structure - Resource Objects - https://jsonapi.org/format/1.0/#document-resource-object-fields

// All rules in the file MUST have corresponding tests

import { falsy } from '@stoplight/spectral-functions';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-resource-object-fields',
  rules: {

    /**
     * Ensures that no fields are directly named `type` or `id`, which are reserved per
     * JSON:API v1.0
     */
    'document-structure-resource-fields-no-type-or-id': {
      description: 'Ensure that `type` and `id` are not used as field names in `attributes` or `relationships`',
      message: `{{path}} - {{description}}`,
      severity: 'error',
      given: "$.paths..[?(@property == 'responses' || @property == 'requestBody')]..content['application/vnd.api+json'].schema.properties.data..[?(@property == 'attributes' || @property == 'relationships')].properties",
      then: [
        {
          field: 'id',
          function: falsy
        },
        {
          field: 'type',
          function: falsy
        }
      ]
    }

  }
};
