'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');
const {JSONPath} = require('jsonpath-plus');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-document-structure-resource-object.yaml');

describe('jsonapi-document-structure-resource-object ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });


  describe('jsonapi-document-structure-resource-object-properties-object', function () {

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
                          'data': {
                            'type': 'object',
                            'properties': {}
                          },
                          'links': {
                            'type': 'object'
                          },
                          'included': {
                            'type': 'array',
                            'items': {
                              'allOf': [
                                {
                                  'type': 'object',
                                  'properties': {}
                                },
                                {
                                  'type': 'object',
                                  'properties': {}
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
            },
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'data': {
                          'type': 'array',
                          'items': {
                            'allOf': [
                              {
                                'type': 'object',
                                'properties': {}
                              },
                              {
                                'type': 'object',
                                'properties': {}
                              }
                            ]
                          }
                        },
                        'included': {
                          'type': 'object',
                          'properties': {}
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

      const jsonPathExpression = "$.paths..content[?(@property === 'application/vnd.api+json')].schema.properties[?(@property === 'data' || @property === 'included')][?(@property === 'type' && @ === 'object')]^.properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.included.properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "resource object properties" errors for object type', function (done) {

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
                                  type: object
                                  properties:
                                    type: {}
                                    id: {}
                                    property1: {}
                                    property2: {}
                  patch:
                    requestBody:
                      content:
                        application/vnd.api+json:
                            schema:
                              type: array
                              properties:
                                data:
                                  type: array
                                  allOf:
                                    - type: object
                                      properties: {}
                                    - type: object
                                      properties: {}
                                included:
                                  type: object
                                  properties:
                                    type: {}
                                    id: {}
                                    property1: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception-object'];
          delete spectral.rules['resource-object-id-exception-array'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(3, 'Error count should be 3');
          expect(results[0].code).to.equal('resource-object-properties-object', 'Incorrect error');
          expect(results[1].code).to.equal('resource-object-properties-object', 'Incorrect error');
          expect(results[2].code).to.equal('resource-object-properties-object', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/properties/property1', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/properties/property2', 'Wrong path');
          expect(results[2].path.join('/')).to.equal('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/included/properties/property1', 'Wrong path');
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
                        data:
                          type: object
                          properties:
                            type: {}
                            id: {}
                            attributes: {}
                            relationships: {}
          patch:
            requestBody:
              content:
                application/vnd.api+json:
                    schema:
                      type: array
                      properties:
                        data:
                          type: array
                          allOf:
                            - type: object
                              properties: {}
                            - type: object
                              properties: {}
                        included:
                          type: object
                          properties:
                            type: {}
                            id: {}
                            links: {}
                            meta: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception-object'];
          delete spectral.rules['resource-object-id-exception-array'];

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

  describe('jsonapi-document-structure-resource-object-properties-array', function () {

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
                          'data': {
                            'type': 'object',
                            'properties': {}
                          },
                          'links': {
                            'type': 'object'
                          },
                          'included': {
                            'type': 'array',
                            'items': {
                              'allOf': [
                                {
                                  'type': 'object',
                                  'properties': {}
                                },
                                {
                                  'type': 'object',
                                  'properties': {}
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
            },
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'data': {
                          'type': 'array',
                          'items': {
                            'allOf': [
                              {
                                'type': 'object',
                                'properties': {}
                              },
                              {
                                'type': 'object',
                                'properties': {}
                              }
                            ]
                          }
                        },
                        'included': {
                          'type': 'object',
                          'properties': {}
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

      const jsonPathExpression = "$.paths..content[?(@property === 'application/vnd.api+json')].schema.properties[?(@property === 'data' || @property === 'included')][?(@property === 'type' && @ === 'array')]^..allOf.*.properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.allOf[0].properties,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.allOf[1].properties,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.data.items.allOf[0].properties,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.data.items.allOf[1].properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(4, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "resource object properties" errors for array type', function (done) {

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
                          type: object
                          properties: {}

                        included:
                          type: array
                          allOf:
                            - type: object
                              properties:
                                id: {}
                                type: {}
                                property1: {}
                                property2: {}
          patch:
            requestBody:
              content:
                application/vnd.api+json:
                    schema:
                      type: array
                      properties:
                        data:
                          type: array
                          allOf:
                            - type: object
                              properties:
                                id: {}
                                type: {}
                                relationships: {}
                            - type: object
                              properties:
                                property1: {}
                        included:
                          type: object
                          properties: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception-object'];
          delete spectral.rules['resource-object-id-exception-array'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(3, 'Error count should be 3');
          expect(results[0].code).to.equal('resource-object-properties-array', 'Incorrect error');
          expect(results[1].code).to.equal('resource-object-properties-array', 'Incorrect error');
          expect(results[2].code).to.equal('resource-object-properties-array', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/included/allOf/0/properties/property1', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/included/allOf/0/properties/property2', 'Wrong path');
          expect(results[2].path.join('/')).to.equal('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/data/allOf/1/properties/property1', 'Wrong path');
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
                        data:
                          type: object
                          properties: {}

                        included:
                          type: array
                          allOf:
                            - type: object
                              properties:
                                id: {}
                                type: {}
          patch:
            requestBody:
              content:
                application/vnd.api+json:
                    schema:
                      type: array
                      properties:
                        data:
                          type: array
                          allOf:
                            - type: object
                              properties:
                                id: {}
                                type: {}
                                meta: {}
                                relationships: {}
                            - type: object
                              properties:
                                attributes: {}
                        included:
                          type: object
                          properties: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception-object'];
          delete spectral.rules['resource-object-id-exception-array'];

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
