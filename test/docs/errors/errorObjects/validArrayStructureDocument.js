/**
 * A valid OpenAPI document adhering to JSON:API specifications.
 * This document includes a properly structured 'errors' array as per the JSON:API error objects guidelines.
 * It is intended to be used in tests validating the 'errors-error-objects-array-structure' rule in Spectral.
 *
 * The document contains:
 * - OpenAPI version specification.
 * - Info object with basic API information.
 * - A placeholder path.
 * - An errors array in a 400 error response object that follows the JSON:API structure.
 */
// const validArrayStructureDocument = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Sample API',
//     version: '1.0.0'
//   },
//   paths: {
//     '/sample-path': {
//       get: {
//         responses: {
//           '400': {
//             description: 'Bad Request',
//             content: {
//               'application/vnd.api+json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     errors: {
//                       type: 'array',
//                       items: { 
//                         type: 'object',
//                         properties: {
//                           // Here is where we define properties based on JSON:API error object structure
//                           // Example: id, status, code, title, detail
//                           id: { type: 'string' },
//                           status: { type: 'string' }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// };

// const validArrayStructureDocument = {
//   'openapi': '3.0.0',
//   'info': {
//     'title': 'Sample API',
//     'version': '1.0.0'
//   },
//   'paths': {
//     '/example': {
//       'get': {
//         'responses': {
//           '400': {
//             'description': 'Bad Request',
//             'content': {
//               'application/vnd.api+json': {
//                 'schema': {
//                   '$ref': '#/components/schemas/JsonApiError'
//                 }
//               }
//             }
//           },
//           '500': {
//             'description': 'Internal Server Error',
//             'content': {
//               'application/vnd.api+json': {
//                 'schema': {
//                   '$ref': '#/components/schemas/JsonApiError'
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   },
//   'components': {
//     'schemas': {
//       'JsonApiError': {
//         'type': 'object',
//         'properties': {
//           'errors': {
//             'type': 'array', // Changed from array to object
//             'items': {
//               '$ref': '#/components/schemas/ErrorObject'
//             }
//           }
//         }
//       },
//       'ErrorObject': {
//         'type': 'object',
//         'properties': {
//           'id': {
//             'type': 'string'
//           },
//           'links': {
//             'type': 'object',
//             'properties': {
//               'about': {
//                 'type': 'string',
//                 'format': 'uri'
//               }
//             }
//           },
//           'status': {
//             'type': 'string'
//           },
//           'code': {
//             'type': 'string'
//           },
//           'title': {
//             'type': 'string'
//           },
//           'detail': {
//             'type': 'string'
//           },
//           'source': {
//             'type': 'object',
//             'properties': {
//               'pointer': {
//                 'type': 'string'
//               },
//               'parameter': {
//                 'type': 'string'
//               },
//               'header': {
//                 'type': 'string'
//               }
//             }
//           },
//           'meta': {
//             'type': 'object',
//             'additionalProperties': true
//           }
//         },
//         'required': ['detail']
//       }
//     }
//   }
// };

const validArrayStructureDocument = {
  'openapi': '3.0.0',
  'info': {
    'title': 'Error Objects Testing API',
    'version': '1.0.0',
    'description': 'API for testing JSON:API compliant error objects'
  },
  'paths': {
    '/correct-errors': {
      'get': {
        'responses': {
          '400': {
            'description': 'Example of correctly structured JSON:API error objects',
            'content': {
              'application/vnd.api+json': {
                'example': {
                  'errors': [
                    {
                      'id': 'error1',
                      'status': '400',
                      'code': '40001',
                      'title': 'Bad Request',
                      'detail': 'The request format is invalid.'
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
    // ,
    // '/incorrect-errors': {
    //   'get': {
    //     'responses': {
    //       '400': {
    //         'description': 'Example of incorrectly structured JSON:API error objects',
    //         'content': {
    //           'application/vnd.api+json': {
    //             'example': {
    //               'errors': {
    //                 'id': 'error2',
    //                 'status': '400',
    //                 'code': '40002',
    //                 'title': 'Bad Request',
    //                 'detail': 'The request format is not valid.'
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
};

export default validArrayStructureDocument;
