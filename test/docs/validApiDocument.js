/* eslint-env mocha */
/* eslint-disable quotes */
const validApiDocument = {
  "openapi": "3.1.0",
  "info": {
    "title": "OpenAPI Management Template",
    "description": "This API manages information pertaining to users\nwhich is adhereing to JSON:API v1.0 standards. The goal of this template is\nto provide a universal temaplte for testing all of the JSON:API v1.0\nspecifications. This document adheres to the following sections:\n  - ContentNegotiation.ClientResponsibilities\n  - ContentNegotiation.ServerResponsibilities\n  - DocumentStructure\n  - DocumentStructure.TopLevel\n  - DocumentStructure.ResourceObjects\n  - DocumentStructure.ResourceObjects.Attributes\n  - DocumentStructure.Links\n  - DocumentStructure.MetaInformation\n  - DocumentStructure.MemberNames\n  - FetchingData.Sorting\n  - FetchingData.Pagination\n  - FetchingData.Filtering\n  - Errors.ProcessingErrors\n  - Errors.ErrorObjects",
    "version": "1.2.0"
  },
  "servers": [
    {
      "url": "https://api.template.com/v1"
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
                      "errors": [
                        {
                          "id": "error-102",
                          "status": "400",
                          "title": "Bad Request",
                          "detail": "The request is invalid."
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error - Indicates a server-side error.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                },
                "examples": {
                  "internalServerErrorExample": {
                    "summary": "Example of an internal server error response",
                    "value": {
                      "errors": [
                        {
                          "id": "error-500",
                          "status": "500",
                          "title": "Internal Server Error",
                          "detail": "The server encountered an unexpected condition that prevented it from fulfilling the request."
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
            "name": "page[number]",
            "in": "query",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 1
            },
            "description": "Page number for pagination"
          },
          {
            "name": "page[size]",
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
          "400": {
            "description": "Bad Request - Indicates that the server cannot process the request due to a client error.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                },
                "examples": {
                  "badRequest": {
                    "summary": "Example of a bad request error",
                    "value": {
                      "errors": [
                        {
                          "id": "error-701",
                          "status": "400",
                          "title": "Bad Request",
                          "detail": "The request could not be processed due to malformed syntax.",
                          "links": {
                            "about": "https://api.usermanagement.com/docs/errors/400"
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error - Indicates a server-side error.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                },
                "examples": {
                  "badRequest": {
                    "summary": "Example of a bad request error",
                    "value": {
                      "errors": [
                        {
                          "id": "error-902",
                          "status": "500",
                          "title": "Internal Server Error",
                          "detail": "The server encountered an unexpected condition.",
                          "links": {
                            "about": "https://api.usermanagement.com/docs/errors/400"
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
                        "id": "error-444",
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
                },
                "examples": {
                  "badRequest": {
                    "summary": "Example of a bad request error",
                    "value": {
                      "errors": [
                        {
                          "id": "error-032",
                          "status": "500",
                          "title": "Internal Server Error",
                          "detail": "The server encountered an unexpected condition.",
                          "links": {
                            "about": "https://api.usermanagement.com/docs/errors/500"
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
          "400": {
            "description": "Bad Request",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                },
                "examples": {
                  "badRequestExample": {
                    "summary": "Example of a Bad Request response",
                    "value": {
                      "errors": [
                        {
                          "status": 400,
                          "title": "Bad Request",
                          "detail": "The request payload is invalid. Please check the request data."
                        }
                      ]
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
                },
                "examples": {
                  "badRequest": {
                    "summary": "Example of a bad request error",
                    "value": {
                      "errors": [
                        {
                          "id": "error-032",
                          "status": "500",
                          "title": "Internal Server Error",
                          "detail": "The server encountered an unexpected condition.",
                          "links": {
                            "about": "https://api.usermanagement.com/docs/errors/500"
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
            "description": "The user was successfully deleted."
          },
          "404": {
            "description": "The specified user was not found.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                },
                "examples": {
                  "notFoundError": {
                    "summary": "Example of a 404 Not Found error",
                    "value": {
                      "errors": [
                        {
                          "id": "error-123",
                          "status": "404",
                          "title": "Not Found",
                          "detail": "The user with the specified ID was not found.",
                          "links": {
                            "about": "https://api.usermanagement.com/docs/errors/404"
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error - Indicates a server-side error.",
            "content": {
              "application/vnd.api+json": {
                "schema": {
                  "$ref": "#/components/schemas/JsonApiError"
                },
                "examples": {
                  "internalServerErrorExample": {
                    "summary": "Example of an internal server error response",
                    "value": {
                      "errors": [
                        {
                          "id": "error-500",
                          "status": "500",
                          "title": "Internal Server Error",
                          "detail": "The server encountered an unexpected condition that prevented it from fulfilling the request."
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
            "type": "string",
            "description": "Unique identifier for the user"
          },
          "type": {
            "type": "string",
            "description": "Type of the resource (users)"
          },
          "attributes": {
            "$ref": "#/components/schemas/UserAttributes"
          },
          "relationships": {
            "type": "object",
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
            "$ref": "#/components/schemas/PaginationLinks"
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
                "$ref": "#/components/schemas/UserAttributes"
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
                "type": "string"
              },
              "type": {
                "type": "string"
              },
              "attributes": {
                "$ref": "#/components/schemas/UserAttributes"
              }
            }
          }
        }
      },
      "UserAttributes": {
        "type": "object",
        "required": [
          "name",
          "email"
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
            "$ref": "#/components/schemas/UserAttributes"
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
      "PaginationLinks": {
        "type": "object",
        "properties": {
          "first": {
            "type": "string",
            "format": "uri",
            "nullable": true,
            "description": "The link to the first page of data. Null if not available."
          },
          "last": {
            "type": "string",
            "format": "uri",
            "nullable": true,
            "description": "The link to the last page of data. Null if not available."
          },
          "prev": {
            "type": "string",
            "format": "uri",
            "nullable": true,
            "description": "The link to the previous page of data. Null if not available."
          },
          "next": {
            "type": "string",
            "format": "uri",
            "nullable": true,
            "description": "The link to the next page of data. Null if not available."
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
            "enum": [
              "400",
              "401",
              "403",
              "404",
              "405",
              "406",
              "409",
              "422",
              "500",
              "502",
              "503"
            ],
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

export default validApiDocument;
