import { expect } from 'chai';
import { JSONPath } from 'jsonpath-plus';
import spectralCore from '@stoplight/spectral-core';
const { Spectral, Document } = spectralCore;
import Parsers from '@stoplight/spectral-parsers';

//rules under test
import ruleset from '../rules/jsonapi-content-negotiation-clients.js';

describe('jsonapi-content-negotiation-clients ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('request-content-type:', function () {

    it('the json path expression should find the correct paths from the given document', function (done) {

      const doc = {
        openapi: '3.0.2',
        paths: {
          '/junk': {
            patch: {
              requestBody: {
                content: {
                  'application/vnd.api+json': {
                    schema: {
                      type: 'string'
                    }
                  },
                  'application/json': {
                    schema: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          '/stuff': {
            patch: {
              requestBody: {
                content: {
                  'application/vnd.api+json': {
                    schema: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      };
      const jsonPathExpression = ruleset.rules['request-content-type'].given;
      const expectedPaths = [
        doc.paths['/junk'].patch.requestBody.content,
        doc.paths['/stuff'].patch.requestBody.content
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "request-content-type" errors if request content-type is not JSON:API', function (done) {

      const badDocument = new Document(`
        openapi: 3.0.2
        paths:
          /junk:
            patch:
              requestBody:
                content:
                  application/vnd.api+json:
                    schema:
                      type: string
                  application/json:
                    schema:
                      type: string
      `, Parsers.Yaml);

      spectral.setRuleset(ruleset);
      spectral.run(badDocument)
        .then(results => {
          
          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('request-content-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//junk/patch/requestBody/content/application/json', 'Wrong path');
          done();

        })
        .catch(error => {

          done(error);

        });

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
                      type: string
      `, Parsers.Yaml);

      spectral.setRuleset(ruleset);
      spectral.run(cleanDocument)
        .then(results => {
          
          expect(results.length).to.equal(0, 'Error(s) found');
          done();

        })
        .catch(error => {

          done(error);

        });

    });

  });
  
});
