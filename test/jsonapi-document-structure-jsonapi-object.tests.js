'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');
const {JSONPath} = require('jsonpath-plus');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-document-structure-jsonapi-object.yaml');

describe('jsonapi-document-structure-jsonapi-object ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('jsonapi-document-structure-jsonapi-object', function () {

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
                          'jsonapi': {}
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
                      'type': 'object'
                    }
                  }
                }
              }
            }
          }
        }
      };
      const jsonPathExpression = "$..properties[?(@property === 'jsonapi')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.jsonapi
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(1, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "jsonapi-object-schema" errors if jsonapi object doesn\'t match schema', function (done) {

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
                            jsonapi:
                              type: object
                              properties:
                                version:
                                  type: string
                                meta:
                                  type: object
                              additionalProperties: false
              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            jsonapi:
                              type: object
                              properties:
                                version:
                                  type: string
                                meta:
                                  type: object
                                  additionalProperties: true
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          //delete spectral.rules[''];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 2');
          expect(results[0].code).to.equal('jsonapi-object-schema', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('//stuff/patch', 'Wrong path');
          expect(results[0].path.join('/')).to.include('/jsonapi', 'Wrong path');
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
                          type: object
                          properties:
                            jsonapi:
                              type: object
                              properties:
                                version:
                                  type: string
                                meta:
                                  type: object
                              additionalProperties: false
              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            jsonapi:
                              type: object
                              properties:
                                version:
                                  type: string
                                meta:
                                  type: object
                                  additionalProperties: true
                              additionalProperties: false
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
