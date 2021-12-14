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

  describe('jsonapi-document-structure-resource-object', function () {

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
                              'type': {},
                              'attributes': {
                                'type': 'object',
                                'properties': {
                                  'description': {}
                                }
                              },
                              'relationships': {
                                'type': 'object',
                                'properties': {
                                  'enum': {}
                                }
                              }
                            }
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
                                  'links': {}
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
                        'data:': {
                          'type': 'array',
                          'items': {
                            'allOf': [
                              {
                                'type': 'object',
                                'properties': {
                                  'id': {},
                                  'type': {}
                                }
                              },
                              {
                                'type': 'object',
                                'properties': {
                                  'type': {},
                                  'attributes':{
                                    'type': 'object',
                                    'properties': {
                                      'name': {},
                                      'description': {}
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        },
                        'included:': {
                          'type': 'object',
                          'properties': {
                            'type': 'string',
                            'id': 'string',
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


    });

  });

});
