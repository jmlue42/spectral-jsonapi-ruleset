'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');
const {JSONPath} = require('jsonpath-plus');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-errors-error-object.yaml');

describe('jsonapi-errors-error-object ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('jsonapi-errors-error-object-type', function () {

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
      const jsonPathExpression = '$.paths..content[application/vnd.api+json].schema.properties[errors]';
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.errors
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(1, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "error-object-type" error', function (done) {

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
                          errors:
                            type: string
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-source-properties'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('error-object-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/errors/type', 'Wrong path');
          done();

        });

    });

    it('the rule should return no type errors', function (done) {

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
                          errors:
                            type: array
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-source-properties'];

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

  describe('jsonapi-errors-error-object-properties', function () {

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
                          'errors': {
                            'type': 'array',
                            'items': {
                              'allOf': [
                                {
                                  'type': 'object',
                                  'description': 'JSON:API Error Object',
                                  'properties': {
                                    'id': {
                                      'type': 'string'
                                    }
                                  }
                                },
                                {
                                  'type': 'object',
                                  'properties': {
                                    'status': {
                                      'type': 'string'
                                    }
                                  }
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
            }
          }
        }
      };
      const jsonPathExpression = '$.paths..content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties';
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "error-object-property" errors', function (done) {

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
                          errors:
                            type: array
                            items:
                              allOf:
                                - type: object
                                  description: 'Unauthorized: Invalid or Expired Authentication'
                                  properties:
                                    data:
                                      type: object
                                - type: object
                                  properties:
                                    id:
                                      type: string
                                    included:
                                      type: array
                                    code:
                                      type: string
                                    meta:
                                      type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-source-properties'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('error-object-properties', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/data', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/errors/items/allOf/1/properties/included', 'Wrong path');
          done();

        });

    });

    it('the rule should return no property errors', function (done) {

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
                          errors:
                            type: array
                            items:
                              allOf:
                                - type: object
                                  description: 'Unauthorized: Invalid or Expired Authentication'
                                  properties:
                                    status:
                                      type: string
                                    title:
                                      type: string
                                - type: object
                                  properties:
                                    id:
                                      type: string
                                    links:
                                      type: object
                                    code:
                                      type: string
                                    meta:
                                      type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-source-properties'];

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

  describe('jsonapi-errors-error-object-members-type-object', function () {

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
                          'errors': {
                            'type': 'array',
                            'items': {
                              'allOf': [
                                {
                                  'type': 'object',
                                  'properties': {
                                    'id': {},
                                    'links': {}
                                  }
                                },
                                {
                                  'type': 'object',
                                  'properties': {
                                    'status': {},
                                    'links': {},
                                    'meta': {}
                                  }
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
            }
          }
        }
      };
      const jsonPathExpression = '$.paths..content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties[?(@property === "links" || @property === "meta")]';
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties.links,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.links,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.meta
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(3, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return member type errors', function (done) {

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
                          errors:
                            type: array
                            items:
                              allOf:
                                - type: object
                                  properties:
                                    links:
                                      type: object
                                    meta:
                                      type: array
                                - type: object
                                  properties:
                                    id:
                                      type: string
                                    links:
                                      type: string
                                    code:
                                      type: string
                                    meta:
                                      type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-source-properties'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('error-object-members-type-object', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/meta/type', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/errors/items/allOf/1/properties/links/type', 'Wrong path');
          done();

        });

    });

    it('the rule should return no type errors', function (done) {

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
                          errors:
                            type: array
                            items:
                              allOf:
                                - type: object
                                  properties:
                                    status:
                                      type: string
                                    links:
                                      type: object
                                - type: object
                                  properties:
                                    id:
                                      type: string
                                    links:
                                      type: object
                                    code:
                                      type: string
                                    meta:
                                      type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-source-properties'];

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
