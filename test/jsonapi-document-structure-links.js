'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');
const {JSONPath} = require('jsonpath-plus');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-document-structure-links.yaml');

describe('jsonapi-document-structure-links ruleset:', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('jsonapi-document-structure-links-object', function () {

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
                          'links': {}
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
                        'links': {}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      const jsonPathExpression = "$..properties[?(@property === 'links')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.links,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.links
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "links-object" errors if links object doesm\'t match schema', function (done) {

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
                            links:
                              type: string


              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            links:
                              type: string

          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing.
        .then(() => {

          //delete spectral.rules[''];
          delete spectral.rules['links-object-schema-type'];
          delete spectral.rules['links-object-schema-properties'];
          delete spectral.rules['links-object-schema-properties-href'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('links-object', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/links/type', 'Wrong path');
          expect(results[1].path.join('/')).to.include('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/links/type', 'Wrong path');
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
                        links:
                          type: object

            `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(cleanDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(0, 'Error(s) found');
          done();

        });

    });

  });

  describe('jsonapi-document-structure-links-schema-type', function () {

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
                          'links': {
                            'type': 'object',
                            'properties': {
                              'self': {},
                              'related': {
                                'type': 'object',
                                'properties': {
                                  'href': {},
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
            },
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'links': {
                          'type': 'object',
                          'properties': {
                            'next': {}
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
      const jsonPathExpression = "$..properties[?(@property === 'links')].properties.'*'";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.links.properties.self,
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.links.properties.related,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.links.properties.next
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(3, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "links-object-schema-type" errors if links object doesm\'t match schema', function (done) {

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
                            links:
                              type: object
                              properties:
                                self:
                                  type: string
                                next:
                                  type: number
                                related:
                                  type: object
                                  properties:
                                    href:
                                      type: string
                                    meta:
                                      type: object


              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            links:
                              type: object
                              properties:
                                self:
                                  type: number
                                related:
                                  type: object
                                  properties:
                                    href:
                                      type: string
                                    meta:
                                      type: object

          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing.
        .then(() => {

          //delete spectral.rules[''];
          delete spectral.rules['links-object'];
          delete spectral.rules['links-object-schema-properties'];
          delete spectral.rules['links-object-schema-properties-href'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('links-object-schema-type', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/links/properties/next/type', 'Wrong path');
          expect(results[1].path.join('/')).to.include('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/links/properties/self/type', 'Wrong path');
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
                        links:
                          type: object
                          properties:
                            self:
                              type: string
                            next:
                              type: string
                            related:
                              type: object
                              properties:
                                href:
                                  type: string
                                meta:
                                  type: object

            `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(cleanDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(0, 'Error(s) found');
          done();

        });

    });

  });

  describe('jsonapi-document-structure-links-schema-properties', function () {

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
                          'links': {
                            'type': 'object',
                            'properties': {
                              'self': {},
                              'related': {
                                'type': 'object',
                                'properties': {
                                  'href': {},
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
            },
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'links': {
                          'type': 'object',
                          'properties': {
                            'next': {
                              'type': 'object',
                              'properties': {
                                'href': {},
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
          }
        }
      };
      const jsonPathExpression = "$..properties[?(@property === 'links')].properties.'*'.properties";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.links.properties.related.properties,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.links.properties.next.properties
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "links-object-schema-properties" errors if links object doesm\'t match schema', function (done) {

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
                            links:
                              type: object
                              properties:
                                self:
                                  type: string
                                next:
                                  type: string
                                related:
                                  type: object
                                  properties:
                                    foo:
                                      type: string
                                    meta:
                                      type: object


              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            links:
                              type: object
                              properties:
                                next:
                                  type: object
                                  properties:
                                    foo:
                                      type: string
                                    meta:
                                      type: object
                                another:
                                  type: object
                                  properties:
                                    href:
                                      type: string
                                    meta:
                                      type: object

          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing.
        .then(() => {

          //delete spectral.rules[''];

          delete spectral.rules['links-object'];
          delete spectral.rules['links-object-schema-type'];
          delete spectral.rules['links-object-schema-properties-href'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(2, 'Error count should be 2');
          expect(results[0].code).to.equal('links-object-schema-properties', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/links/properties/related/properties', 'Wrong path');
          expect(results[1].path.join('/')).to.include('paths//stuff/patch/requestBody/content/application/vnd.api+json/schema/properties/links/properties/next/properties', 'Wrong path');

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
                        links:
                          type: object
                          properties:
                            self:
                              type: string
                            next:
                              type: string
                            related:
                              type: object
                              properties:
                                href:
                                  type: string
                                meta:
                                  type: object


          patch:
            requestBody:
              content:
                application/vnd.api+json:
                    schema:
                      type: object
                      properties:
                        links:
                          type: object
                          properties:
                            next:
                              type: object
                              properties:
                                href:
                                  type: string
                                meta:
                                  type: object

            `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(cleanDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(0, 'Error(s) found');
          done();

        });

    });

  });

  describe('jsonapi-document-structure-links-schema-properties-href', function () {

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
                          'links': {
                            'type': 'object',
                            'properties': {
                              'self': {},
                              'related': {
                                'type': 'object',
                                'properties': {
                                  'href': {},
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
            },
            'patch': {
              'requestBody': {
                'content': {
                  'application/vnd.api+json': {
                    'schema': {
                      'type': 'object',
                      'properties': {
                        'jsonapi': {},
                        'links': {
                          'type': 'object',
                          'properties': {
                            'next': {
                              'type': 'object',
                              'properties': {
                                'href': {},
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
          }
        }
      };
      const jsonPathExpression = "$..properties[?(@property === 'links')].properties.'*'.properties[?(@property === 'href')]";
      const expectedPaths = [
        doc.paths['/stuff'].get.responses[200].content['application/vnd.api+json'].schema.properties.links.properties.related.properties.href,
        doc.paths['/stuff'].patch.requestBody.content['application/vnd.api+json'].schema.properties.links.properties.next.properties.href
      ];

      const results = JSONPath(jsonPathExpression, doc);

      expect(results.length).to.equal(2, 'Wrong number of results.');
      expect(results).to.deep.equal(expectedPaths, 'Wrong paths');
      done();

    });

    it('the rule should return "links-object-schema-properties" errors if links object doesm\'t match schema', function (done) {

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
                            links:
                              type: object
                              properties:
                                self:
                                  type: string
                                next:
                                  type: string
                                related:
                                  type: object
                                  properties:
                                    href:
                                      type: number
                                    meta:
                                      type: object


              patch:
                requestBody:
                  content:
                    application/vnd.api+json:
                        schema:
                          type: object
                          properties:
                            links:
                              type: object
                              properties:
                                next:
                                  type: object
                                  properties:
                                    foo:
                                      type: string
                                    meta:
                                      type: object
                                another:
                                  type: object
                                  properties:
                                    href:
                                      type: string
                                    meta:
                                      type: object

          `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        //remove rule(s) we aren't testing.
        .then(() => {

          //delete spectral.rules[''];

          delete spectral.rules['links-object'];
          delete spectral.rules['links-object-schema-type'];
          delete spectral.rules['links-object-schema-properties'];

        })
        .then(() => {

          return spectral.run(badDocument);

        })
        .then((results) => {

          expect(results.length).to.equal(1, 'Error count should be 1');
          expect(results[0].code).to.equal('links-object-schema-properties-href', 'Incorrect error');
          expect(results[0].path.join('/')).to.include('paths//stuff/get/responses/200/content/application/vnd.api+json/schema/properties/links/properties/related/properties/href', 'Wrong path');

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
                        links:
                          type: object
                          properties:
                            self:
                              type: string
                            next:
                              type: string
                            related:
                              type: object
                              properties:
                                href:
                                  type: string
                                meta:
                                  type: object


          patch:
            requestBody:
              content:
                application/vnd.api+json:
                    schema:
                      type: object
                      properties:
                        links:
                          type: object
                          properties:
                            next:
                              type: object
                              properties:
                                href:
                                  type: string
                                meta:
                                  type: object

            `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
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

