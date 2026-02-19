import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PathItemElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('PathItemElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pathItemElement = PathItemElement.refract({
          $ref: '#/components/pathsItems/PathItem1',
          summary: 'path item summary',
          description: 'path item description',
          get: {},
          put: {},
          post: {},
          delete: {},
          options: {},
          head: {},
          patch: {},
          trace: {},
          query: {},
          servers: [{}],
          parameters: [{}, { $ref: '#/components/parameters/Parameter1' }],
        });

        expect(sexprs(pathItemElement)).toMatchSnapshot();
      });

      specify('should refract query operation', function () {
        const pathItemElement = PathItemElement.refract({
          query: {
            summary: 'Query operation',
            description: 'A query operation for complex queries',
            responses: {
              '200': {
                description: 'Successful response',
              },
            },
          },
        });

        expect(sexprs(pathItemElement)).toMatchSnapshot();
      });

      specify('should refract additionalOperations', function () {
        const pathItemElement = PathItemElement.refract({
          additionalOperations: {
            PURGE: {
              summary: 'Purge operation',
              description: 'Custom PURGE operation',
              responses: {
                '204': {
                  description: 'Successfully purged',
                },
              },
            },
            LOCK: {
              summary: 'Lock operation',
              description: 'Custom LOCK operation',
              responses: {
                '200': {
                  description: 'Resource locked',
                },
              },
            },
          },
        });

        expect(sexprs(pathItemElement)).toMatchSnapshot();
      });
    });
  });
});
