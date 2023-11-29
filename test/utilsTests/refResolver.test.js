import mockApiDocument from '../docs/utilsTests/mockApiDocument.js';
import { resolveRef } from '../utils/refResolver.js';

describe('resolveRef Utils In OpenAPI:', function () {

  let dereferenceDocument;

  before(function () {

    // Derference the document before running the tests
    dereferenceDocument = resolveRef(mockApiDocument, mockApiDocument);

  });

  it('should resolve $ref references', function () {

    const expectedSchema = {
      'type': 'object',
      'properties': {
        'errors': {
          'type': 'array',
          'items': {
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

    expect(dereferenceDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema).to.deep.equal(expectedSchema);

  });

  it('should correctly resolve properties of ErrorObject', function () {

    const expectedSchema = {
      'paths': {
        '/users/{userId}': {
          'get': {
            'responses': {
              '400': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'errors': {
                          'type': 'array',
                          'items': {
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
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    expect(dereferenceDocument.paths).to.deep.equal(expectedSchema.paths);

  });

  it('should handle resolution of deeply nested $ref', function () {

    const expectedSchema = {
      type: 'object',
      properties: {
        pointer: { type: 'string' },
        parameter: { type: 'string' },
        header: { type: 'string' }
      }
    };
        
    expect(dereferenceDocument.paths['/users/{userId}'].get.responses['400'].content['application/vnd.api+json'].schema.properties.errors.items.properties.source).to.deep.equal(expectedSchema);

  });

  it('should handle resolution when $ref is at the root of the document', function () {

    const expectedResolvedSchema = { };

    expect(dereferenceDocument.components.schemas).to.deep.equal(expectedResolvedSchema);

  });

  it('should return the same object if no $ref is present', function () {

    const originalObject = mockApiDocument.info;
    const resolvedObject = resolveRef(originalObject, mockApiDocument);

    expect(resolvedObject).to.deep.equal(originalObject);

  });

  it('should throw an error for unresolved $ref', function () {

    const invalidRefObject = {
      '$ref': '#/components/schemas/NonExistent'
    };

    expect(() => {

      return resolveRef(invalidRefObject, mockApiDocument); 

    }).to.throw();

  });

});
