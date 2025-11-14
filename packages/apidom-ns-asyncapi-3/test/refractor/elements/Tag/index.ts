import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { TagElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('TagElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const tagElement = TagElement.refract({
          name: 'tag-name',
          description: 'tag-description',
        });

        expect(sexprs(tagElement)).toMatchSnapshot();
      });

      context('given externalDocs field of type ExternalDocumentationElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const tagElement = TagElement.refract({
            externalDocs: {},
          });

          expect(sexprs(tagElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const tagElement = TagElement.refract({
            externalDocs: {
              $ref: '#/path/to/external-docs',
            },
          });

          expect(sexprs(tagElement)).toMatchSnapshot();
        });
      });
    });
  });
});
