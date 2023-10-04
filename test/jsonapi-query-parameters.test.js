import { expect } from 'chai';
import spectralCore from '@stoplight/spectral-core';
const { Spectral } = spectralCore;

// rules under test
import ruleset from '../rules/jsonapi-query-parameters.js';

describe('jsonapi-query-parameters ruleset:', function () {
  let spectral;

  // Common setup for all test cases
  beforeEach(function () {
    spectral = new Spectral();
    spectral.setRuleset(ruleset);
  });

  // see test/assets/example-jsonapi-oas.yaml see filter and fields
  // describe('get-filter-query-parameters:', function () {

  // Test cases for valid query fields/parameters
  it('should pass with no errors for valid query fields/parameters', async function () {
    const validDocument = {
      'openapi': '3.0.2',
      'paths': {
        '/myResources': {
          'get': {
            'parameters': [
              {
                'name': 'abcEfg_A',
                'description': 'schema for \'fields\' query parameter',
                'in': 'query',
                'schema': {
                  'type': 'string'
                }
              }
            ],
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

    try{
      const results = await spectral.run(validDocument);
      expect(results.length).to.equal(0, 'Error count should be 0');
    } catch (error) {
      throw new Error(error);
    }
  });


  // If a server encounters a query parameter that does not follow the naming
  //   conventions above, and the server does not know how to process it as a
  //   query parameter from this specification, it MUST return 400 Bad Request
  // https://jsonapi.org/format/1.0/#query-parameters
  // Test case for invalid parameter names
  it('should return an error for invalid parameter names', async function () {
    const documentWithInvalidParameterName = {
      'openapi': '3.0.2',
      'paths': {
        '/myResources': {
          'get': {
            'parameters': [
              {
                'name': 'abcefg',
                'description': 'schema for \'fields\' query parameter',
                'in': 'query',
                'schema': {
                  'type': 'string'
                }
              }
            ],
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

    try{
      const results = await spectral.run(documentWithInvalidParameterName);

      // Check for error length
      expect(results.length).to.be.greaterThan(0, 'Error count should be greater than 0');

      // Check for severity
      expect(results[0].severity).to.equal(DiagnosticSeverity.Error);
    } catch (error) {
      throw new Error(error);
    }
  });


  // https://support.stoplight.io/s/article/Does-Stoplight-support-query-parameters
  // Test case for query parameters with no errors
  it('should pass with no errors for valid query parameters', async function () {

    const validQueryParametersDocument = {
      'openapi': '3.0.2',
      'paths': {
        '/myResources': {
          'get': {
            'parameters': [
              {
                'name': 'abcEfg_A',
                'description': 'schema for \'fields\' query parameter',
                'in': 'query',
                'schema': {
                  'type': 'string'
                }
              },
              {
                'name': 'a_b',
                'description': 'schema for \'fields\' query parameter',
                'in': 'query',
                'schema': {
                  'type': 'string'
                }
              }
            ],
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

    try{
      const results = await spectral.run(validQueryParametersDocument);
      expect(results.length).to.equal(0, 'Error count should be 0');
    } catch (error){
      throw new Error(error);
    }
  });

  // https://support.stoplight.io/s/article/Does-Stoplight-support-query-parameters
  // test case for bad parameter name with one non a-z character
  it('should return an error for bad parameter name with one non a-z character', async function () {
    const badParameterNameDocument = {
      'openapi': '3.0.2',
      'paths': {
        // second parameter is the bad one
        '/myResources': {
          'get': {
            'parameters': [
              {
                'name': 'abcEfg_A',
                'description': 'schema for \'fields\' query parameter',
                'in': 'query',
                'schema': {
                  'type': 'string'
                }
              },
              // this parameter is a baddie
              {
                'name': 'ab@',
                'description': 'schema for \'fields\' query parameter',
                'in': 'query',
                'schema': {
                  'type': 'string'
                }
              }
            ],
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

    try{
      const results = await spectral.run(badParameterNameDocument);

      // Check that an error is returned
      expect(results.length).to.be.greaterThan(0, 'At least one error should be returned');

      // Check for the correct error code
      expect(results[0].code).to.equal('get-filter-query-parameters', 'Incorrect error code');

      // Optionally, check for severity level
      expect(results[0].severity).to.equal(DiagnosticSeverity.Error, 'Severity should be "Error"');
    } catch (error) {
      throw new Error(error);
    }
  });

  // https://support.stoplight.io/s/article/Does-Stoplight-support-query-parameters
  // Test case for bad parameter name with a number
  it('should return an error for bad parameter name with a number', async function () {
    const badParameterNumberDocument = {
      'openapi': '3.0.2',
      'paths': {
        '/myResources': {
          'get': {
            'parameters': [
              {
                'name': '33',
                'description': 'schema for \'fields\' query parameter',
                'in': 'query',
                'schema': {
                  'type': 'string'
                }
              }
            ],
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

    try{
      const results = await spectral.run(badParameterNumberDocument);

      // Check that an error is returned
      expect(results.length).to.be.greaterThan(0, 'At least one error should be returned');
      
      // Check for the correct error code
      expect(results[0].code).to.equal('get-filter-query-parameters', 'Incorrect error code');
      
      // Optionally, check for severity level
      expect(results[0].severity).to.equal(DiagnosticSeverity.Error, 'Severity should be "Error"');
    } catch (error) {
      throw new Error (error);
    }
  });

  // Test case for bad parameter name with unallowed special characters
  it('should return an error for bad parameter name with unallowed special characters', async function () {
    const badParameterSpecialCharDocument = {
      'openapi': '3.0.2',
      'paths': {
        "/myResources": {
          'get': {
            'parameters': [
              {
                'name': 'A_-___',
                'description': 'schema for \'fields\' query parameter',
                'in': 'query',
                'schema': {
                  'type': 'string'
                }
              }
            ],
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

    try{
      const results = await spectral.run(badParameterSpecialCharDocument);
      
      // Check that an error is returned
      expect(results.length).to.be.greaterThan(0, 'At least one error should be returned');
      
      // Check for the correct error code
      expect(results[0].code).to.equal('get-filter-query-parameters', 'Incorrect error code');
      
      // Optionally, check for severity level
      expect(results[0].severity).to.equal(DiagnosticSeverity.Error, 'Severity should be "Error"');
    } catch (error) {
      throw new Error(error);
    }
  });



  
});
