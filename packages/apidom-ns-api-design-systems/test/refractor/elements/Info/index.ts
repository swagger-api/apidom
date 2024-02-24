import { assert, expect } from 'chai';
import { ObjectElement, sexprs } from '@swagger-api/apidom-core';

import { InfoElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('InfoElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'title of API Design System',
          description: 'description of the API Design System',
        });

        expect(sexprs(infoElement)).toMatchSnapshot();
      });

      context('given generic ApiDOM element', function () {
        let infoElement: InfoElement;

        beforeEach(function () {
          infoElement = InfoElement.refract(
            new ObjectElement(
              {
                title: 'title of API Design System',
                description: 'description of the API Design System',
              },
              { meta: true },
              { attr: true },
            ),
          ) as InfoElement;
        });

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(infoElement)).toMatchSnapshot();
        });

        specify('should deepmerge meta', function () {
          assert.isTrue(infoElement.meta.get('meta').equals(true));
        });

        specify('should deepmerge attributes', function () {
          assert.isTrue(infoElement.attributes.get('attr').equals(true));
        });
      });
    });
  });
});
