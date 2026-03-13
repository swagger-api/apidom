import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OpenApi3_2Element } from '../../../src/index.ts';

describe('refractor', function () {
  context('integration', function () {
    context('OpenAPI 3.2.0 new features', function () {
      specify('should refract all new 3.2.0 features', function () {
        const openApiElement = OpenApi3_2Element.refract({
          openapi: '3.2.0',
          info: {
            title: 'Test API',
            version: '1.0.0',
          },
          paths: {
            '/users': {
              get: {
                summary: 'Get users',
                responses: {
                  '200': {
                    description: 'Success',
                  },
                },
              },
              // New QUERY operation
              query: {
                summary: 'Query users with complex filter',
                description: 'Use query method for complex queries',
                requestBody: {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          filter: { type: 'object' },
                        },
                      },
                    },
                  },
                },
                responses: {
                  '200': {
                    description: 'Success',
                  },
                },
              },
              // New additionalOperations
              additionalOperations: {
                PURGE: {
                  summary: 'Purge cache',
                  responses: {
                    '204': {
                      description: 'Cache purged',
                    },
                  },
                },
              },
              parameters: [
                // New querystring parameter location
                {
                  name: 'queryParams',
                  in: 'querystring',
                  schema: {
                    type: 'object',
                    properties: {
                      filter: { type: 'string' },
                      sort: { type: 'string' },
                    },
                  },
                },
              ],
            },
          },
          components: {
            schemas: {
              User: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                },
              },
            },
            // New mediaTypes field
            mediaTypes: {
              JsonMediaType: {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
              StreamingMediaType: {
                // itemSchema for streaming media types
                itemSchema: {
                  type: 'object',
                  properties: {
                    event: { type: 'string' },
                    data: { type: 'object' },
                  },
                },
              },
            },
          },
        });

        expect(sexprs(openApiElement)).toMatchSnapshot();
      });

      specify('should support query operation in PathItem', function () {
        const openApiElement = OpenApi3_2Element.refract({
          openapi: '3.2.0',
          info: {
            title: 'Query Test',
            version: '1.0.0',
          },
          paths: {
            '/search': {
              query: {
                summary: 'Complex search query',
                description: 'Perform complex search using QUERY method',
                requestBody: {
                  required: true,
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          query: { type: 'string' },
                          filters: {
                            type: 'array',
                            items: { type: 'object' },
                          },
                        },
                      },
                    },
                  },
                },
                responses: {
                  '200': {
                    description: 'Search results',
                    content: {
                      'application/json': {
                        schema: {
                          type: 'array',
                          items: { type: 'object' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

        expect(sexprs(openApiElement)).toMatchSnapshot();
      });

      specify('should support additionalOperations', function () {
        const openApiElement = OpenApi3_2Element.refract({
          openapi: '3.2.0',
          info: {
            title: 'Custom Operations Test',
            version: '1.0.0',
          },
          paths: {
            '/cache': {
              additionalOperations: {
                PURGE: {
                  summary: 'Purge cache',
                  description: 'Custom PURGE operation to clear cache',
                  responses: {
                    '204': {
                      description: 'Cache purged successfully',
                    },
                  },
                },
                LOCK: {
                  summary: 'Lock resource',
                  description: 'Custom LOCK operation',
                  responses: {
                    '200': {
                      description: 'Resource locked',
                    },
                  },
                },
              },
            },
          },
        });

        expect(sexprs(openApiElement)).toMatchSnapshot();
      });

      specify('should support querystring parameter location', function () {
        const openApiElement = OpenApi3_2Element.refract({
          openapi: '3.2.0',
          info: {
            title: 'Querystring Test',
            version: '1.0.0',
          },
          paths: {
            '/data': {
              get: {
                parameters: [
                  {
                    name: 'allParams',
                    in: 'querystring',
                    description: 'All query parameters as schema',
                    schema: {
                      type: 'object',
                      properties: {
                        filter: { type: 'string' },
                        sort: { type: 'string' },
                        limit: { type: 'integer' },
                        offset: { type: 'integer' },
                      },
                    },
                  },
                ],
                responses: {
                  '200': {
                    description: 'Data response',
                  },
                },
              },
            },
          },
        });

        expect(sexprs(openApiElement)).toMatchSnapshot();
      });

      specify('should support mediaTypes in Components', function () {
        const openApiElement = OpenApi3_2Element.refract({
          openapi: '3.2.0',
          info: {
            title: 'MediaTypes Test',
            version: '1.0.0',
          },
          components: {
            schemas: {
              Event: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  timestamp: { type: 'string', format: 'date-time' },
                  data: { type: 'object' },
                },
              },
            },
            mediaTypes: {
              JsonResponse: {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                  },
                },
                examples: {
                  success: {
                    value: {
                      status: 'success',
                      message: 'Operation completed',
                    },
                  },
                },
              },
              EventStream: {
                itemSchema: {
                  $ref: '#/components/schemas/Event',
                },
              },
              JsonLines: {
                itemSchema: {
                  type: 'object',
                  properties: {
                    line: { type: 'integer' },
                    content: { type: 'string' },
                  },
                },
              },
            },
          },
          paths: {},
        });

        expect(sexprs(openApiElement)).toMatchSnapshot();
      });

      specify('should support all features combined', function () {
        const openApiElement = OpenApi3_2Element.refract({
          openapi: '3.2.0',
          info: {
            title: 'Comprehensive API',
            version: '1.0.0',
            summary: 'API demonstrating all OpenAPI 3.2.0 features',
          },
          paths: {
            '/resources': {
              get: {
                summary: 'List resources',
                responses: {
                  '200': {
                    description: 'Success',
                    content: {
                      'application/json': {
                        $ref: '#/components/mediaTypes/JsonResponse',
                      },
                    },
                  },
                },
              },
              query: {
                summary: 'Query resources',
                requestBody: {
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                      },
                    },
                  },
                },
                responses: {
                  '200': {
                    description: 'Query results',
                  },
                },
              },
              additionalOperations: {
                SYNC: {
                  summary: 'Sync resources',
                  responses: {
                    '200': {
                      description: 'Synced',
                    },
                  },
                },
              },
              parameters: [
                {
                  name: 'queryFilter',
                  in: 'querystring',
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string',
                        enum: ['active', 'inactive'],
                      },
                    },
                  },
                },
              ],
            },
          },
          components: {
            mediaTypes: {
              JsonResponse: {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array' },
                  },
                },
              },
            },
          },
        });

        expect(sexprs(openApiElement)).toMatchSnapshot();
      });
    });
  });
});
