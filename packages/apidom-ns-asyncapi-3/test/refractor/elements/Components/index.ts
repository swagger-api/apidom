import { expect } from 'chai';
import { sexprs, includesClasses, ObjectElement } from '@swagger-api/apidom-core';

import { ComponentsElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ComponentsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const componentsElement = ComponentsElement.refract({
          schemas: {
            User: {},
            UserRef: {
              $ref: '#/path/to/UserSchema',
            },
            UserMulti: {
              schemaFormat: 'application/vnd.aai.asyncapi;version=3.0.0',
              schema: {},
            },
          },
          servers: {
            development: {},
            production: {
              $ref: '#/path/to/production/server',
            },
          },
          serverVariables: {
            port: {
              enum: ['8883', '8884'],
              default: '8883',
            },
            port1: {
              $ref: '#/components/serverVariables/port',
            },
          },
          channels: {
            channel: {},
            channelRef: {
              $ref: '#/path/to/channel',
            },
          },
          messages: {
            Message: {},
            MessageRef: {
              $ref: '#/path/to/Message',
            },
          },
          securitySchemes: {
            SecurityScheme: {},
            SecuritySchemeRef: {
              $ref: '#/path/to/SecurityScheme',
            },
          },
          parameters: {
            Parameter: {},
            ParameterRef: {
              $ref: '#/path/to/Parameter',
            },
          },
          correlationIds: {
            CorrelationID: {},
            CorrelationIDRef: {
              $ref: '#/path/to/CorrelationID',
            },
          },
          operationTraits: {
            OperationTrait: {},
            OperationTraitRef: {
              $ref: '#/path/to/OperationTrait',
            },
          },
          messageTraits: {
            MessageTrait: {},
            MessageTraitRef: {
              $ref: '#/path/to/MessageTrait',
            },
          },
          serverBindings: {
            ServerBindings: {},
            ServerBindingsRef: {
              $ref: '#/path/to/ServerBindings',
            },
          },
          channelBindings: {
            ChannelBindings: {},
            ChannelBindingsRef: {
              $ref: '#/path/to/ChannelBindings',
            },
          },
          operationBindings: {
            OperationBindings: {},
            OperationBindingsRef: {
              $ref: '#/path/to/OperationBindings',
            },
          },
          messageBindings: {
            MessageBindings: {},
            MessageBindingsRef: {
              $ref: '#/path/to/MessageBindings',
            },
          },
          operations: {
            SignUp: {},
            SignUpRef: {
              $ref: '#/path/to/SignUpOperation',
            },
          },
          replies: {
            UserReply: {},
            UserReplyRef: {
              $ref: '#/path/to/UserReply',
            },
          },
          replyAddresses: {
            UserReplyAddress: {},
            UserReplyAddressRef: {
              $ref: '#/path/to/UserReplyAddress',
            },
          },
          externalDocs: {
            ExternalDoc: {},
            ExternalDocRef: {
              $ref: '#/path/to/ExternalDoc',
            },
          },
          tags: {
            UserTag: {},
            UserTagRef: {
              $ref: '#/path/to/UserTag',
            },
          },
        });

        expect(sexprs(componentsElement)).toMatchSnapshot();
      });

      context('given specification extensions', function () {
        specify('should refract x- extension properties', function () {
          const componentsElement = ComponentsElement.refract({
            schemas: {},
            'x-internal-components': true,
          });

          expect(sexprs(componentsElement)).toMatchSnapshot();
        });

        specify('should mark x- extensions with specification-extension class', function () {
          const componentsElement = ComponentsElement.refract({
            schemas: {},
            'x-internal-components': true,
          }) as ObjectElement;

          const extensionMember = componentsElement.getMember('x-internal-components');
          expect(includesClasses(['specification-extension'], extensionMember)).to.be.true;
        });
      });
    });
  });
});
