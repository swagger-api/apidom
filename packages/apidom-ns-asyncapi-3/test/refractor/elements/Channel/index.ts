import { expect } from 'chai';
import { sexprs, includesClasses, ObjectElement } from '@swagger-api/apidom-core';

import { ChannelElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ChannelElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const channelElement = ChannelElement.refract({
          address: 'channel.address',
          title: 'channel-item-title',
          summary: 'channel-item-summary',
          description: 'channel-item-description',
          servers: [{ $ref: '#/path/to/server1' }, { $ref: '#/path/to/server2' }],
        });

        expect(sexprs(channelElement)).toMatchSnapshot();
      });

      context('given bindings field of type ChannelBindingsElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            bindings: {},
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given bindings field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            bindings: {
              $ref: '#/path/to/bindings',
            },
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given messages field contains field of type MessageElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            messages: {
              userSignedUp: {},
            },
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given messages field contains field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            messages: {
              userSignedUp: {
                $ref: '#/path/to/message',
              },
            },
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given parameters field contains field of type ParameterElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            parameters: {
              userId: {},
            },
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given parameters field contains field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            parameters: {
              userId: {
                $ref: '#/path/to/parameter',
              },
            },
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type TagElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            tags: [{}],
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            tags: [
              {
                $ref: '#/path/to/tag',
              },
            ],
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ExternalDocumentationElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            externalDocs: {},
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const channelElement = ChannelElement.refract({
            externalDocs: {
              $ref: '#/path/to/externalDocs',
            },
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });
      });

      context('given specification extensions', function () {
        specify('should refract x- extension properties', function () {
          const channelElement = ChannelElement.refract({
            address: '/user/signedup',
            'x-internal-name': 'user-signup-channel',
          });

          expect(sexprs(channelElement)).toMatchSnapshot();
        });

        specify('should mark x- extensions with specification-extension class', function () {
          const channelElement = ChannelElement.refract({
            address: '/user/signedup',
            'x-internal-name': 'user-signup-channel',
          }) as ObjectElement;

          const extensionMember = channelElement.getMember('x-internal-name');
          expect(includesClasses(['specification-extension'], extensionMember)).to.be.true;
        });
      });
    });
  });
});
