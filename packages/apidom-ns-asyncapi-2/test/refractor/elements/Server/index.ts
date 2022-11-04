import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ServerElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ServerElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serverElement = ServerElement.refract({
          url: '{username}.gigantic-server.com',
          description: 'The production API server',
          protocol: 'kafka',
          protocolVersion: '1.0.0',
          variables: {
            username: {},
          },
          security: [{}],
          tags: [{}],
        });

        expect(sexprs(serverElement)).toMatchSnapshot();
      });

      context('given bindings field of type ServerBindingsElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            bindings: {},
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });

      context('given bindings field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            bindings: {
              $ref: '#/path/to/bindings',
            },
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });

      context('given variables field values contain ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            variables: {
              username: {
                $ref: '#/path/to/server-variable',
              },
            },
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });
    });
  });
});
