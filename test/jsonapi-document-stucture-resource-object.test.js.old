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
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

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
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

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
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

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
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

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

  describe('jsonapi-document-structure-resource-object-properties-type-object', function () {

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
                              'meta': {},
                              'attributes': {},
                              'relationships': {}
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
                          'type': 'array'
                        },
                        'included': {
                          'type': 'object',
                          'properties': {
                            'links': {},
                            'meta': {}
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

      const jsonPathExpression = "$.paths..content[?(@property === 'application/vnd.api+json')].schema.properties[?(@property === 'data' || @property === 'included')][?(@property === 'type' && @ === 'object')]^.properties[?(@property === 'attributes' || @property === 'relationships' || @property === 'links' || @property === 'meta')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.meta,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.attributes,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties.relationships,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.included.properties.links,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.included.properties.meta
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(5, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "resource object properties type" errors for object type', function (done) {

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
                                    attributes: 
                                      type: string
                                    meta: 
                                      type: string
                                    relationships:
                                      type: array
                  patch:
                    requestBody:
                      content:
                        application/vnd.api+json:
                            schema:
                              type: array
                              properties:
                                data:
                                  type: array
                                included:
                                  type: object
                                  properties:
                                    links: 
                                      type: string
                                    meta: 
                                      type: object
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(4, 'Error count should be 4');
          expect(results[0].code).to.equal('resource-object-properties-type-object', 'Incorrect error');
          expect(results[1].code).to.equal('resource-object-properties-type-object', 'Incorrect error');
          expect(results[2].code).to.equal('resource-object-properties-type-object', 'Incorrect error');
          expect(results[3].code).to.equal('resource-object-properties-type-object', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/properties/attributes/type', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/properties/meta/type', 'Wrong path');
          expect(results[2].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/properties/relationships/type', 'Wrong path');
          expect(results[3].path.join('/')).to.equal('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/included/properties/links/type', 'Wrong path');
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
                            attributes: 
                              type: object
                            meta: 
                              type: object
                            relationships:
                              type: object
          patch:
            requestBody:
              content:
                application/vnd.api+json:
                    schema:
                      type: array
                      properties:
                        data:
                          type: array
                        included:
                          type: object
                          properties:
                            links: 
                              type: object
                            meta: 
                              type: object
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

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

  describe('jsonapi-document-structure-resource-object-properties-type-array', function () {

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
                                  'properties': {
                                    'links': {},
                                    'meta': {}
                                  }
                                },
                                {
                                  'type': 'object',
                                  'properties': {
                                    'relationships': {},
                                    'anotherproperty': {}
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
                                'properties': {
                                  'id': {},
                                  'type': {},
                                  'attributes': {}
                                }
                              },
                              {
                                'type': 'object',
                                'properties': {
                                  'meta': {}
                                }
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

      const jsonPathExpression = "$.paths..content[?(@property === 'application/vnd.api+json')].schema.properties[?(@property === 'data' || @property === 'included')][?(@property === 'type' && @ === 'array')]^..allOf.*.properties[?(@property === 'attributes' || @property === 'relationships' || @property === 'links' || @property === 'meta')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.allOf[0].properties.links,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.allOf[0].properties.meta,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.items.allOf[1].properties.relationships,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.data.items.allOf[0].properties.attributes,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.data.items.allOf[1].properties.meta
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(5, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "resource object properties type" errors for array type', function (done) {

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
                            id: {}
                            type: {}
                        included:
                          type: array
                          allOf:
                            - type: object
                              properties:
                                links: 
                                  type: array
                                meta: 
                                  type: string
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
                                relationships:
                                  type: array
                            - type: object
                              properties:
                                meta:
                                  type: object
                            - type: object
                              properties:
                                id: {}
                                type: {}
                        included:
                          type: object
                          properties: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(3, 'Error count should be 3');
          expect(results[0].code).to.equal('resource-object-properties-type-array', 'Incorrect error');
          expect(results[1].code).to.equal('resource-object-properties-type-array', 'Incorrect error');
          expect(results[2].code).to.equal('resource-object-properties-type-array', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/included/allOf/0/properties/links/type', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/included/allOf/0/properties/meta/type', 'Wrong path');
          expect(results[2].path.join('/')).to.equal('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/data/allOf/0/properties/relationships/type', 'Wrong path');
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
                            - type: object
                              properties:
                                meta:
                                  type: object
                                links:
                                  type: object
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
                                meta:
                                  type: object
                                relationships:
                                  type: object
                            - type: object
                              properties:
                                attributes:
                                  type: object
                        included:
                          type: object
                          properties: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

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

  describe('jsonapi-document-structure-resource-object-properties-included-object', function () {

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
                            'type': 'object',
                            'properties': {}
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            'post': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'data': {
                          'type': 'object',
                          'properties': {}
                        }
                      }
                    }
                  }
                }
              },
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
                            'items': {}
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

      const jsonPathExpression = "$.paths.*.[?(@property === 'requestBody' && @parentProperty !== 'post' || @property === 'responses')]..content[?(@property === 'application/vnd.api+json')].schema.properties[?(@property === 'data' || @property === 'included')][?(@property === 'type' && @ === 'object')]^.properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.data.properties,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.included.properties,
        doc.paths['/stuff'].post.responses[200].content['application/vnd.api+json'].schema.properties.data.properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(3, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "resource object properties included" errors for object type', function (done) {

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
                        included:
                          type: array
                          allOf:
                            - type: object
                              properties: {}
          post:
            requestBody:
              content:
              application/vnd.api+json:
                  schema:
                    type: array
                    properties:
                      data:
                        type: object
                        properties:
                          type: {}
            responses:
              '200':
                content:
                  application/vnd.api+json:
                      schema:
                        type: array
                        properties:
                          data:
                            type: object
                            properties:
                              type: {}
                          included:
                            type: object
                            properties:
                              id: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(3, 'Error count should be 3');
          expect(results[0].code).to.equal('resource-object-properties-included-object', 'Incorrect error');
          expect(results[1].code).to.equal('resource-object-properties-included-object', 'Incorrect error');
          expect(results[2].code).to.equal('resource-object-properties-included-object', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/data/properties', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/post/responses/200/content/application/vnd.api+json/schema/properties/data/properties', 'Wrong path');
          expect(results[2].path.join('/')).to.equal('paths//stuff/post/responses/200/content/application/vnd.api+json/schema/properties/included/properties', 'Wrong path');
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
                            id: {}
                            type: {}

                        included:
                          type: array
                          allOf:
                            - type: object
                              properties: {}
          post:
            requestBody:
              content:
              application/vnd.api+json:
                  schema:
                    type: array
                    properties:
                      data:
                        type: object
                        properties:
                          type: {}
            responses:
              '200':
                content:
                  application/vnd.api+json:
                      schema:
                        type: array
                        properties:
                          data:
                            type: object
                            properties:
                              id: {}
                              type: {}
                          included:
                            type: object
                            properties:
                              type: {}
                              id: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-array'];
          delete spectral.rules['resource-object-id-exception'];

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

  describe('jsonapi-document-structure-resource-object-id-exception', function () {

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
                        'properties': {}
                      }
                    }
                  }
                }
              }
            },
            'post': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'data': {
                          'type': 'object',
                          'properties': {}
                        }
                      }
                    }
                  }
                }
              },
              'responses': {
                '200': {
                  'content': {
                    'application/vnd.api+json': {
                      'schema': {
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
      };

      const jsonPathExpression = "$.paths..[?(@property === 'post')][?(@property === 'requestBody')]..schema.properties[data][?(@property === 'type' && @ === 'object')]^.properties";
      const expectedPaths = [
        doc.paths['/stuff'].post.requestBody.content['application/vnd.api+json'].schema.properties.data.properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(1, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "resource object id exception" errors', function (done) {

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
                      properties: {}

          post:
            requestBody:
              content:
                application/vnd.api+json:
                    schema:
                      type: array
                      properties:
                        data:
                          type: object
                          properties:
                            property1: {}
            responses:
              '200':
                content:
                  application/vnd.api+json:
                      schema:
                        type: array
                        properties: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('resource-object-id-exception', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/post/requestBody/content/application/vnd.api+json/schema/properties/data/properties', 'Wrong path');
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
                      properties: {}

          post:
            requestBody:
              content:
                application/vnd.api+json:
                    schema:
                      type: array
                      properties:
                        data:
                          type: object
                          properties:
                            type: {}
                            property1: {}
                            property2: {}
            responses:
              '200':
                content:
                  application/vnd.api+json:
                      schema:
                        type: array
                        properties: {}
          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing
        .then(() => {

          delete spectral.rules['resource-object-properties-object'];
          delete spectral.rules['resource-object-properties-array'];
          delete spectral.rules['resource-object-properties-type-object'];
          delete spectral.rules['resource-object-properties-type-array'];
          delete spectral.rules['resource-object-properties-included-object'];
          delete spectral.rules['resource-object-properties-included-array'];

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
