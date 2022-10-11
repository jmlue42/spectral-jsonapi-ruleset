import { expect } from 'chai';
import { JSONPath } from 'jsonpath-plus';
import spectralCore from '@stoplight/spectral-core';
const { Spectral, Document } = spectralCore;
import Parsers from '@stoplight/spectral-parsers';

// rules under test
import ruleset from '../rules/jsonapi-document-structure-resource-identifier-object.js';

describe('jsonapi-document-structure-resource-identifier-object ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('relationships-data:', function () {

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
                              'relationships': {
                                'type': 'object',
                                'properties': {
                                  'myRelName': {
                                    'type': 'object',
                                    'properties': {
                                      'data': {
                                        'type': 'object',
                                        'properties': {
                                          'id': {
                                            'type': 'string'
                                          },
                                          'type': {
                                            'type': 'string'
                                          }  
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          'included': {
                            'type': 'array',
                            'items': {
                              'type': 'object',
                              'properties': {
                                'relationships': {
                                  'type': 'object',
                                  'properties': {
                                    'anotherRelName': {
                                      'type': 'object',
                                      'properties': {
                                        'data': {
                                          'type': 'object',
                                          'properties': {
                                            'id': {
                                              'type': 'string'
                                            },
                                            'type': {
                                              'type': 'string'
                                            },
                                            'meta': {
                                              'type': 'object'
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
                      }
                    }
                  }
                }
              }
            }
          },
          '/junk': {
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
                              'relationships': {
                                'type': 'object',
                                'properties': {
                                  'myRelName': {
                                    'type': 'object',
                                    'properties': {
                                      'data': {
                                        'type': 'array',
                                        'items': {
                                          'type': 'object',
                                          'properties': {
                                            'id': {
                                              'type': 'string'
                                            },
                                            'type': {
                                              'type': 'string'
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
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      const jsonPathExpression = ruleset.rules['relationships-data'].given;
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.relationships.properties.myRelName.properties.data,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.properties.relationships.properties.anotherRelName.properties.data,
        doc.paths['/junk'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.relationships.properties.myRelName.properties.data   
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(3, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it.skip('the rule should return "relationships-data" errors if relationships..data members do not meet min resource identifier object schema', function (done) {

      const badDocument = new Document(`
        openapi: 3.0.2
        paths:
          /stuff:
            get:
              responses:
                '200':
                  content:
                    application/vnd.api+json:
                      schema:
                        type: object
                        properties:
                          relationships:
                            type: object
                            properties:
                              myRelName:
                                type: object
                                properties:
                                  data: 
                                    type: object
                                    required: ["id", "type"]
                                    properties:
                                      id:
                                        type: string
                          included:
                            type: array
                            items:
                              type: object
                              properties:
                                relationships:
                                  type: object
                                  properties:
                                    data: 
                                      type: object
                                      required: ["id", "type"]
                                      properties:
                                        type:
                                          type: string
          /junk:
            get:
              responses:
                '200':
                content:
                  application/vnd.api+json:
                    schema:
                      type: object
                      properties:
                        relationships:
                          type: object
                          properties:
                            myRelName:
                              type: object
                              properties:
                                data: 
                                  type: object
                                  properties:
                                    id:
                                      type: string
                                    type:
                                      type: string
                        included:
                          type: array
                          items:
                            type: object
                            properties:
                              relationships:
                                type: object
                                properties:
                                  data: 
                                    type: array
                                    items:
                                      type: object
                                      required: ["id", "type"]
                                      properties:
                                        id:
                                          type: string
                                        type:
                                          type: string
                                        meta:
                                          type: object
      `, Parsers.Yaml);

      spectral.setRuleset(ruleset);
      delete spectral.ruleset.rules['relationships-data-allow-meta'];
      spectral.run(badDocument)
        .then((results) => {
          
          expect(results.length).to.equal(3, 'Error count should be 3');
          // expect(results[0].code).to.equal('response-content-type', 'Incorrect error');
          // expect(results[1].code).to.equal('response-content-type', 'Incorrect error');
          // expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/202/content/application/json', 'Wrong path');
          // expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/203/content/application/json', 'Wrong path');
          done();

        })
        .catch((error) => {

          done(error);

        });

    });

    // it('', function(done) {});

  });

  describe('relationships-data-allow-meta:', function () {

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
                              'relationships': {
                                'type': 'object',
                                'properties': {
                                  'myRelName': {
                                    'type': 'object',
                                    'properties': {
                                      'data': {
                                        'type': 'object',
                                        'properties': {
                                          'id': {
                                            'type': 'string'
                                          },
                                          'type': {
                                            'type': 'string'
                                          }  
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          'included': {
                            'type': 'array',
                            'items': {
                              'type': 'object',
                              'properties': {
                                'relationships': {
                                  'type': 'object',
                                  'properties': {
                                    'anotherRelName': {
                                      'type': 'object',
                                      'properties': {
                                        'data': {
                                          'type': 'object',
                                          'properties': {
                                            'id': {
                                              'type': 'string'
                                            },
                                            'type': {
                                              'type': 'string'
                                            },
                                            'meta': {
                                              'type': 'object'
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
                      }
                    }
                  }
                }
              }
            }
          },
          '/junk': {
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
                              'relationships': {
                                'type': 'object',
                                'properties': {
                                  'myRelName': {
                                    'type': 'object',
                                    'properties': {
                                      'data': {
                                        'type': 'array',
                                        'items': {
                                          'type': 'object',
                                          'required': ['id', 'type'],
                                          'properties': {
                                            'id': {
                                              'type': 'string'
                                            },
                                            'type': {
                                              'type': 'string'
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
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      const jsonPathExpression = ruleset.rules['relationships-data-allow-meta'].given;
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.relationships.properties.myRelName.properties.data.properties,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.properties.relationships.properties.anotherRelName.properties.data.properties,
        doc.paths['/junk'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.relationships.properties.myRelName.properties.data.items.properties   
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(3, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    // it('', function(done) {});

    // it('', function(done) {});

  });

});
