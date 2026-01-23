import { expect } from 'chai';
import { sexprs, includesClasses, ObjectElement } from '@swagger-api/apidom-core';

import { InfoElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('InfoElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'AsyncAPI Sample App',
          version: '1.0.1',
          description: 'This is a sample server.',
          termsOfService: 'http://asyncapi.org/terms/',
          contact: {
            name: 'API Support',
            url: 'http://www.asyncapi.org/support',
            email: 'support@asyncapi.org',
          },
          license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
          },
        });

        expect(sexprs(infoElement)).toMatchSnapshot();
      });

      context('given tags field contains list of type TagElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const infoElement = InfoElement.refract({
            tags: [{}],
          });

          expect(sexprs(infoElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const infoElement = InfoElement.refract({
            tags: [
              {
                $ref: '#/path/to/tag',
              },
            ],
          });

          expect(sexprs(infoElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ExternalDocumentationElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const infoElement = InfoElement.refract({
            externalDocs: {},
          });

          expect(sexprs(infoElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const infoElement = InfoElement.refract({
            externalDocs: {
              $ref: '#/path/to/externalDocs',
            },
          });

          expect(sexprs(infoElement)).toMatchSnapshot();
        });
      });

      context('given specification extensions', function () {
        specify('should refract x- extension properties', function () {
          const infoElement = InfoElement.refract({
            title: 'Test API',
            version: '1.0.0',
            'x-api-id': 'unique-id',
            'x-metadata': {
              owner: 'team-a',
            },
          });

          expect(sexprs(infoElement)).toMatchSnapshot();
        });

        specify('should mark x- extensions with specification-extension class', function () {
          const infoElement = InfoElement.refract({
            title: 'Test API',
            version: '1.0.0',
            'x-api-id': 'unique-id',
          }) as ObjectElement;

          const extensionMember = infoElement.getMember('x-api-id');
          expect(includesClasses(['specification-extension'], extensionMember)).to.be.true;
        });

        specify('should handle multiple x- extensions', function () {
          const infoElement = InfoElement.refract({
            title: 'Test API',
            version: '1.0.0',
            'x-api-id': 'unique-id',
            'x-owner': 'team-a',
            'x-metadata': {
              created: '2023-01-01',
            },
          }) as ObjectElement;

          const apiIdMember = infoElement.getMember('x-api-id');
          const ownerMember = infoElement.getMember('x-owner');
          const metadataMember = infoElement.getMember('x-metadata');

          expect(includesClasses(['specification-extension'], apiIdMember)).to.be.true;
          expect(includesClasses(['specification-extension'], ownerMember)).to.be.true;
          expect(includesClasses(['specification-extension'], metadataMember)).to.be.true;
        });
      });
    });
  });
});
