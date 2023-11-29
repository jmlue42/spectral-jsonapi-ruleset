/* eslint-env mocha */
/* eslint-disable quotes */
const invalidApiDocumentObjectStructure = {
  "openapi": "3.1.0",
  "info": {
    "title": "User Information API",
    "version": "1.0.0",
    "description": "API for retrieving user information"
  },
  "paths": {
    "/users/{userId}": {
      "get": {
        "tags": [
          "users"
        ],
        "summary": "Get User by ID",
        "description": "Retrieves information for a specific user by their ID.",
        "operationId": "getUserById",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "Unique identifier of the user",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response with user information",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "type": {
                          "type": "string",
                          "enum": [
                            "user"
                          ]
                        },
                        "attributes": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string"
                            },
                            "email": {
                              "type": "string"
                            }
                            // Other user attributes...
                          }
                        }
                      }
                    }
                  }
                },
                "examples": {
                  "user": {
                    "summary": "User Example",
                    "value": {
                      "data": {
                        "id": "12345",
                        "type": "user",
                        "attributes": {
                          "name": "John Doe",
                          "email": "john.doe@example.com"
                          // Other user attributes...
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                }
              }
            }
          },
          "404": {
            "description": "User Not Found",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "JsonApiError": {
        "type": "object",
        "properties": {
          "errors": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ErrorObject"
            }
          }
        }
      },
      "ErrorObject": {
        // Original: "object"
        "type": "object",
        "properties": {
          "idd": {
            // Original: "string"
            "type": "string"
          },
          "linkss": {
            // Original: "object"
            "type": "object",
            "properties": {
              "about": {
                "type": "string",
                "format": "uri"
              }
            }
          },
          "statuss": {
            // Original: "string"
            "type": "string"
          },
          "codee": {
            // Original: "string"
            "type": "string"
          },
          "titlee": {
            // Original: "string"
            "type": "string"
          },
          "detaill": {
            // Original: "string"
            "type": "string"
          },
          "sourcee": {
            // Original: "object"
            "type": "object",
            "properties": {
              "pointer": {
                "type": "string"
              },
              "parameter": {
                "type": "string"
              },
              "header": {
                "type": "string"
              }
            }
          },
          "metaa": {
            // Original: "object"
            "type": "object",
            "additionalProperties": true
          }
        },
        "required": [
          "detail"
        ]
      }
    }
  }
};

export default invalidApiDocumentObjectStructure;
