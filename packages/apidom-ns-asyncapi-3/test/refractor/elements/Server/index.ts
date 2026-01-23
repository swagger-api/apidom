import { expect } from 'chai';
import { sexprs, includesClasses, ObjectElement } from '@swagger-api/apidom-core';

import { ServerElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ServerElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serverElement = ServerElement.refract({
          title: 'server-title',
          summary: 'server-summary',
          description: 'server-description',
          host: '{username}.gigantic-server.com',
          protocol: 'kafka',
          protocolVersion: '1.0.0',
          pathname: '/v2',
          variables: {
            username: {},
          },
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

      context('given security field values contain SecuritySchemeElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            security: [{}],
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });

      context('given security field values contain ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            security: [
              {
                $ref: '#/path/to/security-scheme',
              },
            ],
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type TagElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            tags: [{}],
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            tags: [
              {
                $ref: '#/path/to/tag',
              },
            ],
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ExternalDocumentationElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            externalDocs: {},
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const serverElement = ServerElement.refract({
            externalDocs: {
              $ref: '#/path/to/external-docs',
            },
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });
      });

      context('given specification extensions', function () {
        specify('should refract x- extension properties', function () {
          const serverElement = ServerElement.refract({
            host: 'api.example.com',
            protocol: 'mqtt',
            'x-region': 'us-east-1',
            'x-environment': 'production',
          });

          expect(sexprs(serverElement)).toMatchSnapshot();
        });

        specify('should mark x- extensions with specification-extension class', function () {
          const serverElement = ServerElement.refract({
            host: 'api.example.com',
            protocol: 'mqtt',
            'x-region': 'us-east-1',
          }) as ObjectElement;

          const extensionMember = serverElement.getMember('x-region');
          expect(includesClasses(['specification-extension'], extensionMember)).to.be.true;
        });
      });
    });
  });
});
