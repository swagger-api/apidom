import { ObjectElement, toString, toValue } from 'apidom';

import { OpenApi3_1Element } from '../../src';

describe('refractor', function () {
  specify('should refract to openapi-3-1 namespace', function () {
    const genericObject = new ObjectElement({
      paths: {
        '/users': {
          summary: 'path item summary',
          description: 'path item description',
          get: {
            tags: ['tag1', 'tag2'],
            summary: 'Returns a list of users.',
            description: 'Optional extended description in CommonMark or HTML.',
            externalDocs: {
              description: 'Find more info here',
              url: 'https://example.com',
            },
            operationId: 'getUserList',
            parameters: [
              {
                $ref: '#/components/parameters/userId',
              },
            ],
            requestBody: {
              content: {},
            },
            responses: {
              xxx: { key: 'val' },
              '200': {
                description: 'A JSON array of user names',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
              '201': {
                description: 'A response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
            callbacks: {
              myCallback: {
                '{$request.query.queryUrl}': {
                  post: {
                    requestBody: {
                      description: 'Callback payload',
                      content: {
                        'application/json': {
                          schema: {
                            $ref: '#/components/schemas/User',
                          },
                        },
                      },
                    },
                    responses: {
                      '200': {
                        description: 'callback successfully processed',
                      },
                    },
                  },
                },
              },
            },
            deprecated: true,
            security: [
              {},
              {
                petstore_auth: ['write:pets', 'read:pets'],
              },
            ],
            servers: [
              {
                url: 'http://api.example.com/v3',
                description: 'Redundant server description, e.g. redundant server',
              },
            ],
          },
          servers: [
            {
              url: 'http://api.example.com/v2',
              description: 'Redundant server description, e.g. redundant server',
            },
          ],
          parameters: [
            {
              name: 'userId',
              in: 'query',
              description: 'ID of the user',
              required: true,
            },
          ],
        },
      },
    });
    const openApiObject = OpenApi3_1Element.refract(genericObject);
    console.log(toString(openApiObject));
    console.dir(toValue(openApiObject));
  });
});
