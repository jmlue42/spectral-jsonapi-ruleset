'use strict';

const {expect} = require('chai');
const {JSONPath} = require('jsonpath-plus');

describe('jsonapi-errors-error-object ruleset:', function () {

  describe('jsonapi-errors-error-object', function () {

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
                          'errors': {}
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
      const jsonPathExpression = "$.paths..content[application/vnd.api+json'].schema.properties[errors]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.errors
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(1, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

  });

});
