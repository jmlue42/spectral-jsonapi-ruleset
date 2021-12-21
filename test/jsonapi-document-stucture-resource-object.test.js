'use strict';

const {expect} = require('chai');
const {JSONPath} = require('jsonpath-plus');

describe('jsonapi-document-structure-resource-object ruleset:', function () {

  describe('jsonapi-document-structure-resource-object-properties-object', function () {

    it('the json path expression should find the correct paths from the given document', function (done) {

      const doc = {
        'openapi': '3.0.2',
        'paths': {
          '/stuff': {
            'get': {
              'responses': {
                '200': {
                  'content': {
                    'application/vnd.api+json': {
                      'schema': {
                        'type': 'object',
                        'properties': {
                          'data': {
                            'type': 'object',
                            'properties': {
                              'type': {},
                              'id': 'string',
                              'attributes': {
                                'type': 'object',
                                'properties': {
                                  'description': {}
                                }
                              },
                              'relationships': {
                                'type': 'object',
                                'properties': {
                                  'enum': {}
                                }
                              }
                            }
                          },
                          'links': {
                            'type': 'object'
                          },
                          'included': {
                            'type': 'array',
                            'items': {
                              'allOf': [
                                {
                                  'type': 'object',
                                  'properties': {}
                                },
                                {
                                  'links': {}
                                }

                              ]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'data': {
                          'type': 'array',
                          'items': {
                            'allOf': [
                              {
                                'type': 'object',
                                'properties': {
                                  'id': {},
                                  'type': {}
                                }
                              },
                              {
                                'type': 'object',
                                'properties': {
                                  'type': {},
                                  'attributes': {
                                    'type': 'object',
                                    'properties': {
                                      'name': {},
                                      'description': {}
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        },
                        'included': {
                          'type': 'object',
                          'properties': {
                            'type': 'string',
                            'id': 'string',
                            'meta': {}
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

      const jsonPathExpression = "$.paths..content[?(@property === 'application/vnd.api+json')].schema.properties[?(@property === 'data' || @property === 'included')][?(@property === 'type' && @ === 'object')]^.properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.included.properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

  });

});
