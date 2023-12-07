const mockApiDocument = {
  'openapi': '3.1.0',
  'info': {
    'title': 'User Information API',
    'version': '1.0.0',
    'description': 'API for retrieving user information'
  },
  'paths': {
    '/users/{userId}': {
      'get': {
        'responses': {
          '400': {
            'content': {
              'application/vnd.api+json': {
                'schema': {
                  '$ref': '#/components/schemas/JsonApiError'
                }
              }
            }
          }
        }
      }
    }
  },
  'components': {
    'schemas': {
      'JsonApiError': {
        'type': 'object',
        'properties': {
          'errors': {
            'type': 'array',
            'items': {
              '$ref': '#/components/schemas/ErrorObject'
            }
          }
        }
      },
      'ErrorObject': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'string'
          },
          'links': {
            'type': 'object',
            'properties': {
              'about': {
                'type': 'string',
                'format': 'uri'
              }
            }
          },
          'status': {
            'type': 'string'
          },
          'code': {
            'type': 'string'
          },
          'title': {
            'type': 'string'
          },
          'detail': {
            'type': 'string'
          },
          'source': {
            'type': 'object',
            'properties': {
              'pointer': {
                'type': 'string'
              },
              'parameter': {
                'type': 'string'
              },
              'header': {
                'type': 'string'
              }
            }
          },
          'meta': {
            'type': 'object',
            'additionalProperties': true
          }
        },
        'required': [
          'detail'
        ]
      }
    }
  }
};

export default mockApiDocument;
