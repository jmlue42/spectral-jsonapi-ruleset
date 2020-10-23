'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');
const {JSONPath} = require('jsonpath-plus');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-content-negotiation-servers.yaml');

describe('jsonapi-content-negotiation-servers ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('response-content-type:', function () {

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
                        'type': 'string'
                      }
                    }
                  }
                },
                '201': {
                  'content': {
                    'application/vnd.api+json': {
                      'schema': {
                        'type': 'string'
                      }
                    }
                  }
                },
                '202': {
                  'content': {
                    'application/json': {
                      'schema': {
                        'type': 'string'
                      }
                    }
                  }
                },
                '203': {
                  'content': {
                    'application/vnd.api+json': {
                      'schema': {
                        'type': 'string'
                      }
                    },
                    'application/json': {
                      'schema': {
                        'type': 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      const jsonPathExpression = '$.paths[*].*.responses.*.content';
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content,
        doc.paths['/stuff'].get.responses[201].content,
        doc.paths['/stuff'].get.responses[202].content,
        doc.paths['/stuff'].get.responses[203].content
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(4, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "response-content-type" errors if response content-type is not JSON:API', function (done) {

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
                              type: string
                      '201':
                        content:
                          application/vnd.api+json:
                              schema:
                                type: string
                      '202':
                        content:
                          application/json:
                            schema:
                              type: string
                      '203':
                        content:
                          application/vnd.api+json:
                            schema:
                              type: string
                          application/json:
                            schema:
                              type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['415-406-response-codes'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('response-content-type', 'Incorrect error');
          expect(results[1].code).to.equal('response-content-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/202/content/application/json', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/203/content/application/json', 'Wrong path');
          done();

        });

    });

    it('the rule should pass with NO errors', function (done) {

      const cleanDocument = new Document(`
          openapi: 3.0.2
          paths:
            /stuff:
              get:
                responses:
                  '200':
                    content:
                      application/vnd.api+json:
                        schema:
                          type: string
                  '201':
                    content:
                      application/vnd.api+json:
                        schema:
                          type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['415-406-response-codes'];

        })
        .then(() => {

          return spectral.run(cleanDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(0, 'Error(s) found');
          done();

        });

    });

  });

  describe('415-406-response-codes', function () {

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
                        'type': 'string'
                      }
                    }
                  }
                },
                '201': {
                  'content': {
                    'application/vnd.api+json': {
                      'schema': {
                        'type': 'string'
                      }
                    }
                  }
                },
                '202': {
                  'content': {
                    'application/json': {
                      'schema': {
                        'type': 'string'
                      }
                    }
                  }
                },
                '203': {
                  'content': {
                    'application/vnd.api+json': {
                      'schema': {
                        'type': 'string'
                      }
                    },
                    'application/json': {
                      'schema': {
                        'type': 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      const jsonPathExpression = '$.paths[*].*.responses';
      const expectedPaths = [
        doc.paths['/stuff'].get.responses
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(1, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return a "415-406-response-codes" error when missing a 415 AND 406 response', function (done) {

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
                              type: string
                      '201':
                        content:
                          application/vnd.api+json:
                              schema:
                                type: string
                      '202':
                        content:
                          application/json:
                            schema:
                              type: string
                      '203':
                        content:
                          application/vnd.api+json:
                            schema:
                              type: string
                          application/json:
                            schema:
                              type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['response-content-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('415-406-response-codes', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses', 'Wrong path');
          done();

        });

    });

    it('the rule should return a "415-406-response-codes" error when missing a 415 responses', function (done) {

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
                              type: string
                      '406':
                        content:
                          application/vnd.api+json:
                              schema:
                                type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['response-content-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('415-406-response-codes', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses', 'Wrong path');
          done();

        });

    });

    it('the rule should return a "415-406-response-codes" error when missing a 406 response', function (done) {

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
                              type: string
                      '415':
                        content:
                          application/vnd.api+json:
                              schema:
                                type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['response-content-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('415-406-response-codes', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses', 'Wrong path');
          done();

        });

    });

    it('the rule should pass with NO errors', function (done) {

      const cleanDocument = new Document(`
          openapi: 3.0.2
          paths:
            /stuff:
              get:
                responses:
                  '200':
                    content:
                      application/vnd.api+json:
                        schema:
                          type: string
                  '415':
                    content:
                      application/vnd.api+json:
                        schema:
                          type: string
                  '406':
                    content:
                      application/vnd.api+json:
                        schema:
                          type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['response-content-type'];

        })
        .then(() => {

          return spectral.run(cleanDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(0, 'Error(s) found');
          done();

        });

    });

  });

});
