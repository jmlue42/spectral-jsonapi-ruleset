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
                '200': {},
                '401': {
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
      const jsonPathExpression = "$.paths..responses[?(@property >= '400' && @property <= '599')].content[application/vnd.api+json].schema.properties[errors]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors
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
                '401':
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
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('error-object-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/type', 'Wrong path');
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
                '401':
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
          delete spectral.rules['error-object-source-parameter-type'];

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
                '200': {},
                '401': {
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
      const jsonPathExpression = "paths..responses[?(@property >= '400' && @property <= '599')].content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties
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
                '401':
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
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('error-object-properties', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/data', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/1/properties/included', 'Wrong path');
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
                '401':
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
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

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
                '302': {},
                '401': {
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
                                    'meta': {},
                                    'source': {}
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
      const jsonPathExpression = "$.paths..responses[?(@property >= '400' && @property <= '599')].content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties[?(@property === 'links' || @property === 'meta' || @property === 'source')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties.links,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.links,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.meta,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.source
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(4, 'Wrong number of results.');
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
                '401':
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
                                    source:
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
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(3, 'Error count should be 3');
          expect(results[0].code).to.equal('error-object-members-type-object', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/meta/type', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/1/properties/source/type', 'Wrong path');
          expect(results[2].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/1/properties/links/type', 'Wrong path');
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
                '401':
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
                                    source:
                                      type: object
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
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

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

  describe('jsonapi-errors-error-object-members-type-string', function () {

    it('the json path expression should find the correct paths from the given document', function (done) {

      const doc = {
        'openapi': '3.0.2',
        'paths': {
          '/stuff': {
            'get': {
              'responses': {
                '202': {},
                '401': {
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
                                    'links': {},
                                    'status': {},
                                    'source': {},
                                    'code': {}
                                  }
                                },
                                {
                                  'type': 'object',
                                  'properties': {
                                    'links': {},
                                    'meta': {},
                                    'title': {},
                                    'detail': {}
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
      const jsonPathExpression = "$.paths..responses[?(@property >= '400' && @property <= '599')].content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties[?(@property === 'status' || @property === 'code' || @property === 'title' || @property === 'detail')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties.status,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties.code,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.title,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.detail
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(4, 'Wrong number of results.');
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
                '401':
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
                                      type: object
                                    code:
                                      type: string
                                    links:
                                      type: object
                                - type: object
                                  properties:
                                    detail:
                                      type: string
                                    title:
                                      type: object
                                    meta:
                                      type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-source-properties'];
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('error-object-members-type-string', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/status/type', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/1/properties/title/type', 'Wrong path');
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
                '401':
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
                                    code:
                                      type: string
                                    links:
                                      type: object
                                - type: object
                                  properties:
                                    detail:
                                      type: string
                                    title:
                                      type: string
                                    meta:
                                      type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-source-properties'];
          delete spectral.rules['error-object-source-pointer-type'];

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

  describe('jsonapi-errors-error-object-links-properties', function () {

    it('the json path expression should find the correct paths from the given document', function (done) {

      const doc = {
        'openapi': '3.0.2',
        'paths': {
          '/stuff': {
            'get': {
              'responses': {
                '200': {},
                '401': {
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
                                    'links': {
                                      'properties': {}
                                    }
                                  }
                                },
                                {
                                  'type': 'object',
                                  'properties': {
                                    'links': {
                                      'properties': {}
                                    },
                                    'detail': {}
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
      const jsonPathExpression = "$.paths..responses[?(@property >= '400' && @property <= '599')].content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties[links].properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties.links.properties,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.links.properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return link property errors', function (done) {

      const badDocument = new Document(`
        openapi: 3.0.2
        paths:
          /stuff:
            get:
              responses:
                '401':
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
                                      properties:
                                        id:
                                          type: string
                                - type: object
                                  properties:
                                    links:
                                      type: object
                                      properties:
                                        meta:
                                          type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-source-properties'];
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('error-object-links-properties', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/links/properties', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/1/properties/links/properties', 'Wrong path');
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
                '401':
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
                                      properties:
                                        about:
                                          type: object
                                        meta:
                                          type: object
                                - type: object
                                  properties:
                                    links:
                                      type: object
                                      properties:
                                        about:
                                          type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-source-properties'];
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

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

  describe('jsonapi-errors-error-object-source-properties', function () {

    it('the json path expression should find the correct paths from the given document', function (done) {

      const doc = {
        'openapi': '3.0.2',
        'paths': {
          '/stuff': {
            'get': {
              'responses': {
                '201': {},
                '401': {
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
                                    'source': {
                                      'properties': {}
                                    }
                                  }
                                },
                                {
                                  'type': 'object',
                                  'properties': {
                                    'source': {
                                      'properties': {}
                                    },
                                    'detail': {}
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
      const jsonPathExpression = "$.paths..responses[?(@property >= '400' && @property <= '599')].content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties[source].properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties.source.properties,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.source.properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return source property errors', function (done) {

      const badDocument = new Document(`
        openapi: 3.0.2
        paths:
          /stuff:
            get:
              responses:
                '401':
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
                                    source:
                                      type: object
                                      properties:
                                        id:
                                          type: string
                                        parameter:
                                          type: string
                                - type: object
                                  properties:
                                    source:
                                      type: object
                                      properties:
                                        parameter:
                                          type: string
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('error-object-source-properties', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/source/properties/id', 'Wrong path');
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
                '401':
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
                                    source:
                                      type: object
                                      properties:
                                        pointer:
                                          type: object
                                        parameter:
                                          type: string
                                - type: object
                                  properties:
                                    source:
                                      type: object
                                      properties:
                                        parameter:
                                          type: string
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-source-parameter-type'];
          delete spectral.rules['error-object-source-pointer-type'];

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

  describe('jsonapi-errors-error-object-source-parameter-type', function () {

    it('the json path expression should find the correct paths from the given document', function (done) {

      const doc = {
        'openapi': '3.0.2',
        'paths': {
          '/stuff': {
            'get': {
              'responses': {
                '401': {
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
                                    'source': {
                                      'properties': {
                                        'pointer': {},
                                        'parameter': {}
                                      }
                                    }
                                  }
                                },
                                {
                                  'type': 'object',
                                  'properties': {
                                    'source': {
                                      'properties': {
                                        'parameter': {}
                                      }
                                    },
                                    'detail': {}
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
      const jsonPathExpression = "$.paths..responses[?(@property >= '400' && @property <= '599')].content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties[source].properties[parameter]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties.source.properties.parameter,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.source.properties.parameter
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return parameter property errors', function (done) {

      const badDocument = new Document(`
        openapi: 3.0.2
        paths:
          /stuff:
            get:
              responses:
                '401':
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
                                    source:
                                      type: object
                                      properties:
                                        pointer:
                                          type: string
                                        parameter:
                                          type: object
                                - type: object
                                  properties:
                                    source:
                                      type: object
                                      properties:
                                        pointer:
                                          type: string
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-source-properties'];
          delete spectral.rules['error-object-source-pointer-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('error-object-source-parameter-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/source/properties/parameter/type', 'Wrong path');
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
                '401':
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
                                    source:
                                      type: object
                                      properties:
                                        pointer:
                                          type: object
                                        parameter:
                                          type: string
                                - type: object
                                  properties:
                                    source:
                                      type: object
                                      properties:
                                        parameter:
                                          type: string
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-source-properties'];
          delete spectral.rules['error-object-source-pointer-type'];

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

  describe('jsonapi-errors-error-object-source-pointer-type', function () {

    it('the json path expression should find the correct paths from the given document', function (done) {

      const doc = {
        'openapi': '3.0.2',
        'paths': {
          '/stuff': {
            'get': {
              'responses': {
                '200': {},
                '401': {
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
                                    'source': {
                                      'properties': {
                                        'pointer': {},
                                        'parameter': {}
                                      }
                                    }
                                  }
                                },
                                {
                                  'type': 'object',
                                  'properties': {
                                    'source': {
                                      'properties': {
                                        'pointer': {}
                                      }
                                    },
                                    'detail': {}
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
      const jsonPathExpression = "$.paths..responses[?(@property >= '400' && @property <= '599')].content[application/vnd.api+json].schema.properties[errors]..allOf.*.properties[source].properties[pointer]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[0].properties.source.properties.pointer,
        doc.paths['/stuff'].get.responses[401].content['application/vnd.api+json'].schema.properties.errors.items.allOf[1].properties.source.properties.pointer
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return parameter property errors', function (done) {

      const badDocument = new Document(`
        openapi: 3.0.2
        paths:
          /stuff:
            get:
              responses:
                '401':
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
                                    source:
                                      type: object
                                      properties:
                                        pointer:
                                          type: object
                                        parameter:
                                          type: string
                                - type: object
                                  properties:
                                    source:
                                      type: object
                                      properties:
                                        pointer:
                                          type: string
                '403':
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
                                    source:
                                      type: object
                                      properties:
                                        pointer:
                                          type: string
                                - type: object
                                  properties:
                                    source:
                                      type: object
                                      properties:
                                        pointer:
                                          type: object
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-source-properties'];
          delete spectral.rules['error-object-source-parameter-type'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('error-object-source-pointer-type', 'Incorrect error');
          expect(results[1].code).to.equal('error-object-source-pointer-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.equal('paths//stuff/get/responses/401/content/application/vnd.api+json/schema/properties/errors/items/allOf/0/properties/source/properties/pointer/type', 'Wrong path');
          expect(results[1].path.join('/')).to.equal('paths//stuff/get/responses/403/content/application/vnd.api+json/schema/properties/errors/items/allOf/1/properties/source/properties/pointer/type', 'Wrong path');
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
              '401':
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
                                  source:
                                    type: object
                                    properties:
                                      pointer:
                                        type: string
                                      parameter:
                                        type: string
                              - type: object
                                properties:
                                  source:
                                    type: object
                                    properties:
                                      pointer:
                                        type: array
              '403':
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
                                  source:
                                    type: object
                                    properties:
                                      pointer:
                                        type: array
        `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          delete spectral.rules['error-object-type'];
          delete spectral.rules['error-object-properties'];
          delete spectral.rules['error-object-members-type-object'];
          delete spectral.rules['error-object-members-type-string'];
          delete spectral.rules['error-object-links-properties'];
          delete spectral.rules['error-object-source-properties'];
          delete spectral.rules['error-object-source-parameter-type'];

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
