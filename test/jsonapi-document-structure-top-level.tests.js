'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');
const {JSONPath} = require('jsonpath-plus');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-document-structure-top-level.yaml');

describe('jsonapi-document-structure-top-level ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('top-level-request-json-object', function () {

    it('the json path expression should find the correct paths from the given document', function (done) {

      const doc = {
        'openapi': '3.0.2',
        'paths': {
          '/stuff': {
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object'
                    }
                  }
                }
              }
            }
          },
          '/junk': {
            'patch': {
              'requestBody': {
                'content': {
                  'application/json': {
                    'schema': {
                      'type': 'string'
                    }
                  }
                }
              }
            }
          },
          '/things': {
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'string'
                    }
                  }
                }
              }
            }
          }
        }
      };
      const jsonPathExpression = "$.paths.[*].requestBody.content[?(@property === 'application/vnd.api+json')].schema";
      const expectedPaths = [
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema,
        doc.paths['/things'].patch.requestBody.content['application/vnd.api+json'].schema
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should pass with NO errors', function (done) {

      const cleanDocument = new Document(`
          openapi: 3.0.2
          paths:
            /stuff:
              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
            /junk:
              patch:
                requestBody:
                  content:
                    application/json:
                        schema:
                          type: string
            /things:
              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                    application/json:
                        schema:
                          type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          //delete spectral.rules[''];

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
