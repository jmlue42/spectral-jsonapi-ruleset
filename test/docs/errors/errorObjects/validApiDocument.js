const validApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'User Information API',
    version: '1.0.0',
    description: 'API for retrieving user information'
  },
  paths: {
    '/users/{userId}': {
      get: {
        summary: 'Get User Information',
        description: 'Retrieves information for a specific user by their ID.',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'Unique identifier of the user',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Successful response with user information',
            content: {
              'application/vnd.api+json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        type: { type: 'string',
                          enum: ['user'] },
                        attributes: {
                          type: 'object',
                          properties: {
                            name: { type: 'string' },
                            email: { type: 'string' }
                            // Other user attributes...
                          }
                        }
                      }
                    }
                  }
                },
                examples: {
                  user: {
                    summary: 'User Example',
                    value: {
                      data: {
                        id: '12345',
                        type: 'user',
                        attributes: {
                          name: 'John Doe',
                          email: 'john.doe@example.com'
                          // Other user attributes...
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad Request',
            content: {
              'application/vnd.api+json': {
                schema: {
                  $ref: '#/components/schemas/JsonApiError'
                }
              }
            }
          },
          '404': {
            description: 'User Not Found',
            content: {
              'application/vnd.api+json': {
                schema: {
                  $ref: '#/components/schemas/JsonApiError'
                }
              }
            }
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/vnd.api+json': {
                schema: {
                  $ref: '#/components/schemas/JsonApiError'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      JsonApiError: {
        type: 'object',
        properties: {

          /**
           * Added `[]` to the `errors` OpenAPI structure to test the issue with not passing 
           * ruleset `errors-error-objects-array-structure`. 
           * 
           * In a RESTful API, that is following JSON:API specification; the JSON structure
           * in a HTTP response can be respresented as followed:
           * 
           * HTTP/1.1 400 Bad Request
           * Content-Type: application/vnd.api+json
           * 
           * {
           *  "errors": [
           *    {
           *      "id": "err_12345",
           *      "status": "400",
           *      "code": "InvalidRequest",
           *      "title": "Invalid Data Provided",
           *      "detail": "The provided data is invalid. 'email' field must be a valid email address.",
           *      "source": {
           *        "pointer": "/data/attributes/email"
           *      },
           *      "meta": {
           *        "timestamp": "2023-11-14T12:32:56Z"
           *      },
           *    }
           *  ]
           * }
           * 
           * 
           * The ruleset `errors-error-objects-array-structure` is designed to validate the structure of the OpenAPI
           * document, specifically focusing on the 'errors' field within the response schema. The rule ensures that 
           * 'errors' is defined as an array of error objectsc, as per the JSON:API specification.
           * 
           * However, it's important to note the difference between OpenAPI document validation and actualy runtime
           * behavior of the API:
           * 
           * 1. OpenAPI Document Validation:
           *      - The Spectral rule checks the OpenAPI specification document.
           *      - In the OpenAPI document, 'errors' must be defined in a way that aligns with the JSON:API specification
           *        OpenAPI standards, typically as a schema under 'responses'.
           *      - Example in OpenAPI doc:
           *          errors: {
           *            type: 'array',
           *            items: { ... } // Schema definition of error objects
           *          }
           *      - This structure is necessary for documentation and tooling purposes but does not represent the actualy
           *        JSON payload directly.
           * 
           * 2. Runtime API Behavior:
           *      - At runtime, when the API is called, the response JSON will have 'errors' as an actual array of error
           *        objects.
           *      - Example in runtime response:
           *          "errors": [
           *            { ... } // Actual error object instances
           *          ]
           *      - This is the actual structure that clietns of the API will receive and process.
           * 
           * The distinction is key because while OpenAPI document fails validation for an array-like structure under 'errors'
           * the runtime behavior correctly represents 'errors' as an array, adhering to the JSON:API specification. Thus, the
           * Spectral rule ensures the OpenAPI document accurately describes the expected runtime structure, even though the 
           * document's structure differs from the runtime JSON format.
           */
          errors: [{
            // validating here - original: array
            type: 'array',
            items: {
              $ref: '#/components/schemas/ErrorObject'
            }
          }]
        }
      },
      ErrorObject: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          links: {
            type: 'object',
            properties: {
              about: { type: 'string',
                format: 'uri' }
            }
          },
          status: { type: 'string' },
          code: { type: 'string' },
          title: { type: 'string' },
          detail: { type: 'string' },
          source: {
            type: 'object',
            properties: {
              pointer: { type: 'string' },
              parameter: { type: 'string' },
              header: { type: 'string' }
            }
          },
          meta: { type: 'object',
            additionalProperties: true }
        },
        required: ['detail']
      }
    }
  }
};

export default validApiDocument;
