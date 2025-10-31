import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

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
    });
  });
});
