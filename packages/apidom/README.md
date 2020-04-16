# ApiDOM

This is a reference implementation of ApiDOM. 

**Current status:** POC

## Implementation requirements

POC has various implementation requirements.

**Requirement: Using Refract**

ApiDOM will be encoded using Refract. Refract is a recursive data structure
for expressing complex structures, relationships, and metadata. Refract supports
JSON serialization. Two client libraries exist for [JavaScript](https://github.com/refractproject/minim)
and [Python](https://github.com/kylef/refract.py).

**OAS 3.0.z JSON AST**

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "description": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    "termsOfService": "Terms of service",
    "version": "0.1.9",
    "license": {
      "name": "Apache-2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0"
    },
    "contact": {
      "name": "Vladimir Gorej",
      "url": "https://www.linkedin.com/in/vladimirgorej/",
      "email": "vladimir.gorej@gmail.com"
    }
  }
}
```

Translated into ApiDOM (using Refract serialization):

```json
{
  "element": "openapi3",
  "content": [
    {
      "element": "member",
      "content": {
        "key": {
          "element": "string",
          "content": "openapi"
        },
        "value": {
          "element": "openapi",
          "content": "3.0.0"
        }
      }
    },
    {
      "element": "member",
      "content": {
        "key": {
          "element": "string",
          "content": "info"
        },
        "value": {
          "element": "info",
          "content": [
            {
              "element": "member",
              "content": {
                "key": {
                  "element": "string",
                  "content": "title"
                },
                "value": {
                  "element": "string",
                  "content": "Sample API"
                }
              }
            },
            {
              "element": "member",
              "content": {
                "key": {
                  "element": "string",
                  "content": "description"
                },
                "value": {
                  "element": "string",
                  "content": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML."
                }
              }
            },
            {
              "element": "member",
              "content": {
                "key": {
                  "element": "string",
                  "content": "termsOfService"
                },
                "value": {
                  "element": "string",
                  "content": "Terms of service"
                }
              }
            },
            {
              "element": "member",
              "content": {
                "key": {
                  "element": "string",
                  "content": "version"
                },
                "value": {
                  "element": "string",
                  "content": "0.1.9"
                }
              }
            },
            {
              "element": "member",
              "content": {
                "key": {
                  "element": "string",
                  "content": "license"
                },
                "value": {
                  "element": "license",
                  "content": [
                    {
                      "element": "member",
                      "content": {
                        "key": {
                          "element": "string",
                          "content": "name"
                        },
                        "value": {
                          "element": "string",
                          "content": "Apache-2.0"
                        }
                      }
                    },
                    {
                      "element": "member",
                      "content": {
                        "key": {
                          "element": "string",
                          "content": "url"
                        },
                        "value": {
                          "element": "string",
                          "content": "https://www.apache.org/licenses/LICENSE-2.0"
                        }
                      }
                    }
                  ]
                }
              }
            },
            {
              "element": "member",
              "content": {
                "key": {
                  "element": "string",
                  "content": "contact"
                },
                "value": {
                  "element": "contact",
                  "content": [
                    {
                      "element": "member",
                      "content": {
                        "key": {
                          "element": "string",
                          "content": "name"
                        },
                        "value": {
                          "element": "string",
                          "content": "Vladimir Gorej"
                        }
                      }
                    },
                    {
                      "element": "member",
                      "content": {
                        "key": {
                          "element": "string",
                          "content": "url"
                        },
                        "value": {
                          "element": "string",
                          "content": "https://www.linkedin.com/in/vladimirgorej/"
                        }
                      }
                    },
                    {
                      "element": "member",
                      "content": {
                        "key": {
                          "element": "string",
                          "content": "email"
                        },
                        "value": {
                          "element": "string",
                          "content": "vladimir.gorej@gmail.com"
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  ]
}
```

**Requirement: Using Minim in JavaScript implementation**

First implementation of ApiDOM library will be in JavaScript. For that we have
ready to use library called [minim](https://github.com/refractproject/minim).
Ideally minim API should not leak outside of out `facade` API, and if it does,
only specific `facade` methods should be documented, if they'll exist.

**Requirement: Being able to utilize existing ADD parsers**

For various ADD (Api Description Document) DSL(s), there are already
ready to be used quality parsers. Our goal here is to use them and be able 
to embed their AST into ApiDOM. 

**Requirement: ApiDOM should expose original AST to the consumer**

All the information about original ADD is encoded into ApiDOM, which is 
internally represented as a Refract structure. Consumer of ApiDOM must be able
to request original AST that the standard parser has produced before it have 
been encoded into ApiDOM. 

*Following conversion must be possible:*

```
JSON OAS3 -> ApiDOM (JSON OAS3 + meta) -> JSON OAS3 
```

This conversion must be lossless and it is up to *discussion* if the ApiDOM should 
handle references in JSON OAS3. 

**Requirement: ApiDOM fragment reference original AST fragment**

Selected ApiDOM fragments (certainly not all) should have reference to original AST fragment.

**Note:** we currently assume that the AST will always be JSON, so we can always transform
original JSON AST from ApiDOM.

**Requirement: Represent Refs as abstract datastructures**

**Requirement: Mechanism for Refs resolution in runtime**

### Supported specifications

#### OpenAPI 3.0.z

Supported Fields:
 - openapi
 - info