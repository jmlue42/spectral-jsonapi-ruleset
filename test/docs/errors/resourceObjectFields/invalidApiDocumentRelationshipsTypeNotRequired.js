/* eslint-env mocha */
/* eslint-disable quotes */
const invalidApiDocumentSingleIdType = {
  "openapi": "3.1.0",
  "info": {
    "title": "User Management API",
    "description": "This API manages user information, conforming to JSON:API v1.0 standards.",
    "version": "1.1.0"
  },
  "servers": [
    {
      "url": "https://api.usermanagement.com/v1"
    }
  ],
  "x-jsonapi-object": {
    "type": "object",
    "properties": {
      "version": {
        "type": "string"
      },
      "meta": {
        "type": "object",
        "additionalProperties": false
      }
    },
    "additionalProperties": false
  },
  "paths": {
    "/users": {
      "get": {
        "tags": [
          "users"
        ],
        "summary": "List all users",
        "description": "Retrieve a list of users with pagination and optional filters for sorting and searching.",
        "security": [],
        "responses": {
          "200": {
            "description": "A list of users",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/UserListResponse"
                },
                "examples": {
                  "userListExample": {
                    "summary": "Example response for user list",
                    "value": {
                      "data": [
                        {
                          "type": "users",
                          "id": "1",
                          "attributes": {
                            "name": "John Doe",
                            "email": "john@example.com"
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1
            },
            "description": "Page number for pagination"
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 20
            },
            "description": "Number of items per page"
          },
          {
            "name": "filter",
            "in": "query",
            "schema": {
              "type": "string"
            },
            "description": "Filter string to narrow down the search"
          },
          {
            "name": "sort",
            "in": "query",
            "schema": {
              "type": "string"
            },
            "description": "Sorting criteria. E.g., `name,-email` for ascending by name and descending by email."
          },
          {
            "name": "fields",
            "in": "query",
            "schema": {
              "type": "string"
            },
            "description": "Comma-separated list of fields to include in the response."
          }
        ]
      },
      "post": {
        "tags": [
          "users"
        ],
        "summary": "Create a new user",
        "requestBody": {
          "description": "Payload to create a new user, containing user details.",
          "required": true,
          "content": {
            "application/vnd.api+json": {
              "schema": {
                "$ref": "#/components/schemas/UserRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "New user created",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "401": {
            "description": "Authentication credentials were missing or incorrect.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                }
              }
            }
          },
          "403": {
            "description": "The request was valid but the server is refusing action due to insufficient permissions.",
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
    },
    "/users/{userId}": {
      "get": {
        "tags": [
          "users"
        ],
        "summary": "Get User by ID",
        "security": [],
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
            "description": "Details of a user",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
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
                },
                "examples": {
                  "badRequest": {
                    "summary": "Example of a bad request error",
                    "value": {
                      "errors": {
                        "id": "error-456",
                        "status": "400",
                        "title": "Bad Request",
                        "detail": "The request could not be understood due to malformed syntax.",
                        "links": {
                          "about": "https://api.usermanagement.com/docs/errors/400"
                        }
                      }
                    }
                  }
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
                },
                "examples": {
                  "notFound": {
                    "summary": "Example of a not found error",
                    "value": {
                      "errors": {
                        "id": "error-123",
                        "status": "404",
                        "title": "Not Found",
                        "detail": "The requested resource was not found.",
                        "links": {
                          "about": "https://api.usermanagement.com/docs/errors/404"
                        }
                      }
                    }
                  }
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
      },
      "put": {
        "tags": [
          "users"
        ],
        "summary": "Update a user",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Payload to update an existing user.",
          "required": true,
          "content": {
            "application/vnd.api+json": {
              "schema": {
                "$ref": "#/components/schemas/UserUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User updated",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "401": {
            "description": "Authentication credentials were missing or incorrect.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                }
              }
            }
          },
          "403": {
            "description": "The request was valid but the server is refusing action due to insufficient permissions.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "users"
        ],
        "summary": "Delete a user",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "User deleted"
          },
          "401": {
            "description": "Authentication credentials were missing or incorrect.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                }
              }
            }
          },
          "403": {
            "description": "The request was valid but the server is refusing action due to insufficient permissions.",
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
      "User": {
        "type": "object",
        "required": [
          "id",
          "type"
        ],
        "properties": {
          "id": {
            // Original: "string"
            "type": "object",
            "description": "Unique identifier for the user"
          },
          "type": {
            "type": "string",
            "description": "Type of the resource (users)"
          },
          "attributes": {
            "$ref": "#/components/schemas/AttributesObject"
          },
          "relationships": {
            "type":
            {
            "type": "object",
            },
            "properties": {
              "posts": {
                "$ref": "#/components/schemas/RelationshipLinks"
              }
            }
          }
        }
      },
      "UserResponse": {
        "type": "object",
        "description": "Response schema for a single user or a newly created user.",
        "properties": {
          "data": {
            "$ref": "#/components/schemas/User"
          },
          "included": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/RelatedResource"
            }
          },
          "meta": {
            "$ref": "#/components/schemas/Meta"
          }
        }
      },
      "UserListResponse": {
        "type": "object",
        "description": "Response schema for a list of users with pagination details.",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/User"
            }
          },
          "links": {
            "type": "object",
            "properties": {
              "self": {
                "type": "string",
                "format": "uri"
              },
              "first": {
                "type": "string",
                "format": "uri"
              },
              "last": {
                "type": "string",
                "format": "uri"
              },
              "prev": {
                "type": "string",
                "format": "uri"
              },
              "next": {
                "type": "string",
                "format": "uri"
              }
            }
          }
        }
      },
      "UserRequest": {
        "type": "object",
        "description": "Request schema for creating a new user.",
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "type",
              "attributes"
            ],
            "properties": {
              "type": {
                "type": "string"
              },
              "attributes": {
                "$ref": "#/components/schemas/AttributesObject"
              }
            }
          }
        }
      },
      "UserUpdateRequest": {
        "type": "object",
        "description": "Request schema for updating an existing user's details.",
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "id",
              "type",
              "attributes"
            ],
            "properties": {
              "id": {
                // Original: "string"
                "type": "object"
              },
              "type": {
                "type": "string"
              },
              "attributes": {
                "$ref": "#/components/schemas/AttributesObject"
              }
            }
          }
        }
      },
      "AttributesObject": {
        "type": "object",
        "required": [
          "name",
          "email",
          "type"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the user"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "Email address of the user, must follow standard email format."
          },
          "role": {
            "type": "string",
            "description": "Role of the user in the system"
          }
        }
      },
      "RelationshipLinks": {
        "type": "object",
        "properties": {
          "self": {
            "type": "string",
            "format": "uri"
          },
          "related": {
            "type": "string",
            "format": "uri"
          }
        }
      },
      "RelatedResource": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "attributes": {
            "$ref": "#/components/schemas/AttributesObject"
          }
        }
      },
      "Meta": {
        "type": "object",
        "properties": {
          "totalCount": {
            "type": "integer",
            "description": "Total number of resources available."
          },
          "lastUpdated": {
            "type": "string",
            "format": "date-time",
            "description": "The timestamp of the last update."
          }
        }
      },
      "JsonApiError": {
        "type": "object",
        "required": [
          "errors"
        ],
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
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "links": {
            "type": "object",
            "properties": {
              "about": {
                "type": "string",
                "format": "uri"
              }
            }
          },
          
          /**
           * Commonly used HTTP status codes:
           * 
           * `400` Bad Request: The request was unacceptable, often due o missing a required parameter
           * `401` Unauthorized: No valid authentication credentials provided.
           * `403` Forbidden: The client does not have access rights to the content.
           * `404` Not Found: The requested resource does not exist.
           * `406` Not Acceptable: The requested format is not available.
           * `409` Conflict: The request could not be completed due to a conflict.
           * `422` Unprocessable Entity: The request was well-formed but was unable to be followed due to semantic errors.
           * `500` Internal Server Error: A generic error message for unexpected server errors.
           * `502` Bad Gateway: The server received an invalid response from the upstream server.
           * `503` Service Unavailable: The server is currently unavailable (overloaded or down).
           */
          "status": {
            "type": "string",
            "enum": ["400", "401", "403", "404", "405", "406", "409", "422", "500", "502", "503"],
            "description": "HTTP status code applicable to this error, given as a string value."
          },
          "code": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "detail": {
            "type": "string"
          },
          "source": {
            "type": "object",
            "properties": {
              "pointer": {
                "type": "string"
              },
              "parameter": {
                "type": "string"
              }
            }
          },
          "meta": {
            "type": "object",
            "additionalProperties": true
          }
        }
      }
    },
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "JWT Bearer token authentication"
      },
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-KEY",
        "description": "API Key based authentication"
      }
    }
  },
  "security": [
    {
      "BearerAuth": []
    },
    {
      "ApiKeyAuth": []
    }
  ]
};

export default invalidApiDocumentSingleIdType;