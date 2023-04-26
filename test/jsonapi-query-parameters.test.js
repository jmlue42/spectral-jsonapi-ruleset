import { expect } from 'chai';
import spectralCore from '@stoplight/spectral-core';
const { Spectral } = spectralCore;

// rules under test
import ruleset from '../rules/jsonapi-query-parameters.js';

describe('jsonapi-query-parameters ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  // see test/assets/example-jsonapi-oas.yaml see filter and fields
  // describe('get-filter-query-parameters:', function () {

  it('the query fields/parameters should adhere to the specification', function (done) {

    const doc = {
      'openapi': '3.0.2',
      'paths': {
        '/myResources?{abcEfg}=22': {
          'get': {
            'parameters': {
              'name': 'abcEfg',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              }
            },
            'responses': {
              '200': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'meta': {},
                        'data:': {
                          'type': 'object',
                          'properties': {
                            'meta': {}
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
                      'jsonapi': {},
                      'meta': {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    spectral.setRuleset(ruleset);
    spectral.run(doc)
      .then((results) => {

        // results: ${JSON.stringify(results, null, 2)}`);
        expect(results.length).to.equal(0, 'Error count should be 0');
        done();

      })
      .catch((error) => {

        done(error);

      });

  });


  // If a server encounters a query parameter that does not follow the naming
  //   conventions above, and the server does not know how to process it as a
  //   query parameter from this specification, it MUST return 400 Bad Request
  // https://jsonapi.org/format/1.0/#query-parameters
  it('the query should return a 400 Bad Request error if the parameters do not adhere to ' +
     'the specification', function (done) {

    const badDocument = {
      'openapi': '3.0.2',
      'paths': {
        '/myResources?{abefg}=22': {
          'get': {
            'parameters': {
              'name': 'abcefg',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              }
            },

            'responses': {
              '400': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'meta': {},
                        'data:': {
                          'type': 'object',
                          'properties': {
                            'meta': {}
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
                      'jsonapi': {},
                      'meta': {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    spectral.setRuleset(ruleset);
    spectral.run(badDocument)
      .then((results) => {

        // results: ${JSON.stringify(results, null, 2)}`);
        expect(results[0].code).to.equal('get-filter-query-parameters', 'Incorrect error');
        done();

      })
      .catch((error) => {

        done(error);

      });

  });


  // https://support.stoplight.io/s/article/Does-Stoplight-support-query-parameters
  it('the rule should pass with NO errors', function (done) {

    const cleanDoc3 = {
      'openapi': '3.0.2',
      'paths': {
        '/myResources?{abcEfg}=22&{a_b}=23': {

          'get': {

            'parameters': [{ 'name': 'abcEfg',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              } },
            { 'name': 'a_b',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              } }],

            'responses': {
              '200': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'meta': {},
                        'data:': {
                          'type': 'object',
                          'properties': {
                            'meta': {}
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
                      'jsonapi': {},
                      'meta': {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    spectral.setRuleset(ruleset);
    spectral.run(cleanDoc3)
      .then((results) => {

        // results: ${JSON.stringify(results, null, 2)}`);
        expect(results.length).to.equal(0, 'Error count should be 0');

        done();

      })
      .catch((error) => {

        done(error);

      });

  });

  // https://support.stoplight.io/s/article/Does-Stoplight-support-query-parameters
  it('the rule should pass with errors, bad parameter name, paremeter name must have at ' +
     'least one non a-z character, could be [-_A-Z]', function (done) {

    const badDoc4 = {
      'openapi': '3.0.2',
      'paths': {
        // second parameter is the bad one
        '/myResources?{abcEfg}=22&{ab}=23': {

          'get': {

            'parameters': [{ 'name': 'abcEfg',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              } },
            // this parameter is a baddie
            { 'name': 'ab',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              } }],

            'responses': {
              '200': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'meta': {},
                        'data:': {
                          'type': 'object',
                          'properties': {
                            'meta': {}
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
                      'jsonapi': {},
                      'meta': {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    spectral.setRuleset(ruleset);
    spectral.run(badDoc4)
      .then((results) => {

        // results: ${JSON.stringify(results, null, 2)}

        expect(results[0].code).to.equal('get-filter-query-parameters', 'Incorrect error');
        done();

      })
      .catch((error) => {

        done(error);

      });

  });

  // https://support.stoplight.io/s/article/Does-Stoplight-support-query-parameters
  it('the rule should pass with errors, bad parameter name, cannot be a number', function (done) {

    const badDoc5 = {
      'openapi': '3.0.2',
      'paths': {
        // second parameter is the bad one
        '/myResources?{33}=22&{33}=23': {

          'get': {

            'parameters': [{ 'name': '33',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              } },
            // this parameter is the baddie
            { 'name': '33',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              } }],

            'responses': {
              '200': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'meta': {},
                        'data:': {
                          'type': 'object',
                          'properties': {
                            'meta': {}
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
                      'jsonapi': {},
                      'meta': {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };


    spectral.setRuleset(ruleset);

    spectral.run(badDoc5)
      .then((results) => {

        // results: ${JSON.stringify(results, null, 2)}`);

        expect(results[0].code).to.equal('get-filter-query-parameters', 'Incorrect error');
        done();

      })
      .catch((error) => {

        done(error);

      });

  });

  it('the rule should pass with errors, bad parameter name, unallowed special character', function (done) {

    const badDoc6 = {
      'openapi': '3.0.2',
      'paths': {
        // second parameter is the bad one
        "/myResources?{'A_-___'}=22&{'A_-__'}=23": {

          'get': {

            'parameters': [{ 'name': 'A_-___',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              } },
            // this parameter is the baddie
            { 'name': 'A_-___',
              'description': 'schema for \'fields\' query parameter',
              'in': 'query',
              'schema': {
                'type': 'string'
              } }],

            'responses': {
              '200': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'meta': {},
                        'data:': {
                          'type': 'object',
                          'properties': {
                            'meta': {}
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
                      'jsonapi': {},
                      'meta': {}
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    spectral.setRuleset(ruleset);

    spectral.run(badDoc6)
      .then((results) => {

        // results: ${JSON.stringify(results, null, 2)}`);

        expect(results[0].code).to.equal('member-names-end_with', 'Incorrect error');
        done();

      })
      .catch((error) => {

        done(error);

      });

  });

});
