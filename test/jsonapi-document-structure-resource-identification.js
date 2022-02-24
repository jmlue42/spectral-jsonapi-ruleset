'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');
const {JSONPath} = require('jsonpath-plus');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-document-structure-resource-identification.yaml');

describe('jsonapi-document-structure-resource-identification:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('jsonapi-document-structure-resource-identification-property', function () {

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
                          'errors': {},
                          'data': {
                            'items': {
                              'allOf': [
                                {
                                  'properties': {
                                    'id': {},
                                    'type': {}
                                  }
                                }
                              ]
                            }
                          },
                          'included': {
                            'items': {
                              'allOf': [
                                {
                                  'properties': {
                                    'id': {},
                                    'type': {}
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

      const jsonPathExpression = "$..properties[?(@property === 'data' || @property === 'included')]..allOf.*.properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.allOf[0].properties,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.allOf[0].properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "resource-identification-property" errors', function (done) {

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
                            data:
                              items:
                                allOf:
                                  - properties:
                                      foo:
                                        type: string
                                      id:
                                        type: string

              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            included:
                              items:
                                allOf:
                                  - properties:
                                      type:
                                        type: string
                                      foo:
                                        type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing.
        .then(() => {

          //delete spectral.rules[''];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('resource-identification-property', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/items/allOf/0/properties/foo', 'Wrong path');
          expect(results[1].path.join('/')).to.include('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/included/items/allOf/0/properties/foo', 'Wrong path');


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
                          data:
                            items:
                              allOf:
                                - properties:
                                    type:
                                      type: string
                                    id:
                                      type: string

        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['error-object-properties'];

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

  describe('jsonapi-document-structure-resource-identification-type', function () {

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
                          'errors': {},
                          'data': {
                            'items': {
                              'allOf': [
                                {
                                  'properties': {
                                    'id': {
                                      'type': 'string'
                                    },
                                    'type': {
                                      'type': 'string'
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          'included': {
                            'items': {
                              'allOf': [
                                {
                                  'properties': {
                                    'id': {
                                      'type': 'string'
                                    },
                                    'type': {
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

      const jsonPathExpression = "$..properties[?(@property === 'data' || @property === 'included')]..allOf.*.properties[?(@property === 'id' || @property === 'type')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.allOf[0].properties.id,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.items.allOf[0].properties.type,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.allOf[0].properties.id,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.allOf[0].properties.type
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(4, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "resource-identification-type" errors', function (done) {

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
                            data:
                              items:
                                allOf:
                                  - properties:
                                      foo:
                                        type: string
                                      id:
                                        type: object

              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            included:
                              items:
                                allOf:
                                  - properties:
                                      type:
                                        type: object
                                      foo:
                                        type: string
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing.
        .then(() => {

          //delete spectral.rules[''];
          delete spectral.rules['resource-identification-property'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('resource-identification-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/items/allOf/0/properties/id/type', 'Wrong path');
          expect(results[1].path.join('/')).to.include('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/included/items/allOf/0/properties/type', 'Wrong path');


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
                          data:
                            items:
                              allOf:
                                - properties:
                                    type:
                                      type: string
                                    id:
                                      type: string

        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-identification-property'];

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
