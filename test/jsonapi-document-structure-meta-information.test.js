import { expect } from 'chai';
import { JSONPath } from 'jsonpath-plus';
import spectralCore from '@stoplight/spectral-core';
const { Spectral, Document } = spectralCore;
import Parsers from '@stoplight/spectral-parsers';

// rules under test
import ruleset from '../rules/jsonapi-document-structure-meta-information.js';

describe('jsonapi-document-structure-meta-information ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('meta-object-schema:', function () {

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
      const jsonPathExpression = ruleset.rules['meta-object-schema'].given;
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.meta,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties['data:'].properties.meta,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.meta
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(3, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "meta-object-schema" errors if meta object doesn\'t match schema', function (done) {

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
                          meta:
                            type: string


            patch:
              requestBody:
                content:
                  application/vnd.api+json:
                      schema:
                        type: object
                        properties:
                          meta:
                            type: object
                            properties:
                              meta:
                                type: string
      `, Parsers.Yaml);

      spectral.setRuleset(ruleset);
      spectral.run(badDocument)
        .then((results) => {
          
          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('meta-object-schema', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/meta/type', 'Wrong path');
          expect(results[1].path.join('/')).to.include('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/meta/properties/meta/type', 'Wrong path');
          done();

        })
        .catch((error) => {

          done(error);

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
                          meta:
                            type: object
                            properties:
                              meta:
                                type: object
      `, Parsers.Yaml);

      spectral.setRuleset(ruleset);
      spectral.run(cleanDocument)
        .then((results) => {
          
          expect(results.length).to.equal(0, 'Error(s) found');
          done();

        })
        .catch((error) => {

          done(error);

        });

    });

  });

});
