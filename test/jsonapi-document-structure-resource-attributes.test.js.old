'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');
const {JSONPath} = require('jsonpath-plus');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-document-structure-resource-attributes.yaml');

describe('jsonapi-document-structure-top-level ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('document-strucuture-resource-attributes-type', function () {

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
                            'properties': {
                              'attributes': {}
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
                          'type': 'object',
                          'properties': {
                            'attributes': {}
                          }
                        },
                        'included': {
                          'type': 'object',
                          'properties': {
                            'attributes': {}
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
      const jsonPathExpression = "$..properties[?(@property === 'attributes')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.attributes,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.included.properties.attributes
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(3, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return resource attribute type errors', function (done) {

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
                              properties:
                                attributes:
                                  type: object
              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            included:
                              properties:
                                attributes:
                                  type: string
            /junk:
              patch:
                requestBody:
                  content:
                    application/json:
                      schema:
                        type: object
                        properties:
                          data:
                            properties:
                              attributes:
                                type: string

          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['attributes-object-properties'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('attributes-object-type', 'Incorrect error');
          expect(results[1].code).to.equal('attributes-object-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/included/properties/attributes/type', 'Wrong path');
          expect(results[1].path.join('/')).to.include('paths//junk/patch/requestBody/content/application/json/schema/properties/data/properties/attributes/type', 'Wrong path');
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
                              properties:
                                attributes:
                                  type: object
              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            included:
                              properties:
                                attributes:
                                  type: object
            /junk:
              patch:
                requestBody:
                  content:
                    application/json:
                      schema:
                        type: object
                        properties:
                          data:
                            properties:
                              attributes:
                                type: object

          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['attributes-object-properties'];

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

  describe('document-strucuture-resource-attributes-properties', function () {

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
                            'properties': {
                              'attributes': {
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
            },
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'data': {
                          'type': 'object',
                          'properties': {
                            'attributes': {
                              'properties': {}
                            }
                          }
                        },
                        'included': {
                          'type': 'object',
                          'properties': {
                            'attributes': {
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
          }
        }
      };
      const jsonPathExpression = "$..properties[?(@property === 'attributes')].properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.data.properties.attributes.properties,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.included.properties.attributes.properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(3, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return resource attribute property errors', function (done) {

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
                              properties:
                                attributes:
                                  type: object
                                  properties:
                                    name: {}
                                    relationships: {}

              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            included:
                              properties:
                                attributes:
                                  type: object
                                  properties:
                                    links: {}
            /junk:
              patch:
                requestBody:
                  content:
                    application/json:
                      schema:
                        type: object
                        properties:
                          data:
                            properties:
                              attributes:
                                type: object
                                properties:
                                  name: {}
                                  description: {}

          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['attributes-object-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('attributes-object-properties', 'Incorrect error');
          expect(results[1].code).to.equal('attributes-object-properties', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/properties/attributes/properties/relationships', 'Wrong path');
          expect(results[1].path.join('/')).to.include('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/included/properties/attributes/properties/links', 'Wrong path');
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
                              properties:
                                attributes:
                                  type: object
                                  properties:
                                    name: {}
                                    description: {}
              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            included:
                              properties:
                                attributes:
                                  type: object
                                  properties:
                                    property1: {}
                                    property2: {}

          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['attributes-object-type'];

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
