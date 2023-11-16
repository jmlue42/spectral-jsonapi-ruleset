// Document Structure - Resource Identifier Object - https://jsonapi.org/format/1.0/#document-resource-identifier-objects

// All rules in this file MUST have corresponding tests

import { schema, enumeration } from '@stoplight/spectral-functions';
// import { DiagnosticSeverity } from '@stoplight/types';

export default {
  documentationUrl: 'https://jsonapi.org/format/1.0/#document-resource-identifier-objects',
  rules: {

    // explicitly defined
    'relationships-data-object-explicit': {
      description: '\'relationships..data\' properties MUST be an object or an array of objects with an id and type property',
      message: '{{path}} - {{description}}',
      severity: 'error',
      resolved: true,
      given: "$..*[?(@property === 'relationships')]..properties.data[?(@property === 'type' && (@ === 'object' || @ === 'array'))]^",
      then: [
        {
          function: schema,
          functionOptions: {
            schema: {
              'oneOf': [
                {
                  'type': 'object',
                  'properties': {
                    'type': {
                      'type': 'string'
                    },
                    'required': {
                      'type': 'array',
                      'items': [
                        {
                          'type': 'string'
                        },
                        {
                          'type': 'string'
                        }
                      ]
                    },
                    'properties': {
                      'type': 'object',
                      'properties': {
                        'id': {
                          'type': 'object',
                          'properties': {
                            'type': {
                              'type': 'string'
                            },
                            'pattern': {
                              'type': 'string'
                            },
                            'example': {
                              'type': 'string'
                            }
                          },
                          'required': [
                            'type'
                          ]
                        },
                        'type': {
                          'type': 'object',
                          'properties': {
                            'type': {
                              'type': 'string'
                            },
                            'enum': {
                              'type': 'array',
                              'items': [
                                {
                                  'type': 'string'
                                }
                              ]
                            }
                          },
                          'required': [
                            'type'
                          ]
                        }
                      },
                      'required': [
                        'id',
                        'type'
                      ]
                    }
                  },
                  'required': [
                    'type',
                    'required',
                    'properties'
                  ]
                },
                {
                  'type': 'object',
                  'properties': {
                    'type': {
                      'type': 'string'
                    },
                    'items': {
                      'type': 'object',
                      'properties': {
                        'type': {
                          'type': 'string'
                        },
                        'required': {
                          'type': 'array',
                          'items': [
                            {
                              'type': 'string'
                            },
                            {
                              'type': 'string'
                            }
                          ]
                        },
                        'properties': {
                          'type': 'object',
                          'properties': {
                            'id': {
                              'type': 'object',
                              'properties': {
                                'type': {
                                  'type': 'string'
                                }
                              },
                              'required': [
                                'type'
                              ]
                            },
                            'type': {
                              'type': 'object',
                              'properties': {
                                'type': {
                                  'type': 'string'
                                }
                              },
                              'required': [
                                'type'
                              ]
                            }
                          },
                          'required': [
                            'id',
                            'type'
                          ]
                        }
                      },
                      'required': [
                        'type',
                        'required',
                        'properties'
                      ]
                    }
                  },
                  'required': [
                    'type',
                    'items'
                  ]
                }
              ]
            }
          }
        }
      ]
    },

    // composed using allOf
    'relationships-data-object-composed': {
      description: '\'relationships..data\' properties MUST be an object or an array of objects with an id and type property',
      message: '{{path}} - {{description}}',
      severity: 'error',
      resolved: true,
      given: "$..*[?(@property === 'relationships')]..properties.data..allOf",
      then: [
        {
          function: schema,
          functionOptions: {
            schema: {
              'contains': {
                'oneOf': [
                  {
                    'type': 'object',
                    'properties': {
                      'type': {
                        'type': 'string'
                      },
                      'required': {
                        'type': 'array',
                        'items': [
                          {
                            'type': 'string'
                          },
                          {
                            'type': 'string'
                          }
                        ]
                      },
                      'properties': {
                        'type': 'object',
                        'properties': {
                          'id': {
                            'type': 'object',
                            'properties': {
                              'type': {
                                'type': 'string'
                              },
                              'pattern': {
                                'type': 'string'
                              },
                              'example': {
                                'type': 'string'
                              }
                            },
                            'required': [
                              'type'
                            ]
                          },
                          'type': {
                            'type': 'object',
                            'properties': {
                              'type': {
                                'type': 'string'
                              },
                              'enum': {
                                'type': 'array',
                                'items': [
                                  {
                                    'type': 'string'
                                  }
                                ]
                              }
                            },
                            'required': [
                              'type'
                            ]
                          }
                        },
                        'required': [
                          'id',
                          'type'
                        ]
                      }
                    },
                    'required': [
                      'type',
                      'required',
                      'properties'
                    ]
                  },
                  {
                    'type': 'object',
                    'properties': {
                      'type': {
                        'type': 'string'
                      },
                      'items': {
                        'type': 'object',
                        'properties': {
                          'type': {
                            'type': 'string'
                          },
                          'required': {
                            'type': 'array',
                            'items': [
                              {
                                'type': 'string'
                              },
                              {
                                'type': 'string'
                              }
                            ]
                          },
                          'properties': {
                            'type': 'object',
                            'properties': {
                              'id': {
                                'type': 'object',
                                'properties': {
                                  'type': {
                                    'type': 'string'
                                  }
                                },
                                'required': [
                                  'type'
                                ]
                              },
                              'type': {
                                'type': 'object',
                                'properties': {
                                  'type': {
                                    'type': 'string'
                                  }
                                },
                                'required': [
                                  'type'
                                ]
                              }
                            },
                            'required': [
                              'id',
                              'type'
                            ]
                          }
                        },
                        'required': [
                          'type',
                          'required',
                          'properties'
                        ]
                      }
                    },
                    'required': [
                      'type',
                      'items'
                    ]
                  }
                ]
              }
            }
          }
        }
      ]
    },
    'relationships-data-allowed-fields': {
      description: 'Resource Identifier Objects MAY only contain id, type, and meta fields',
      message: '{{path}} - {{description}}',
      severity: 'error',
      given: "$..*[?(@property === 'relationships')]..properties.data..properties",
      then: {
        field: '@key',
        function: enumeration,
        functionOptions: {
          values: ['id', 'type', 'meta']
        }
      }
    }
  }
};
