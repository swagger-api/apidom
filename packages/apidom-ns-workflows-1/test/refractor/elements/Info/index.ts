import { assert, expect } from 'chai';
import { ObjectElement, toValue, sexprs } from '@swagger-api/apidom-core';

import { InfoElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('InfoElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'A pet purchasing workflow',
          summary: 'This workflow showcases how to purchase a pet through a sequence of API calls',
          description:
            'This workflow walks you through the steps of `searching` for, `selecting`, and `purchasing` an available pet.\n',
          version: '1.0.1',
        });

        expect(sexprs(infoElement)).toMatchSnapshot();
      });

      context('given generic ApiDOM element', function () {
        let infoElement: InfoElement;

        beforeEach(function () {
          infoElement = InfoElement.refract(
            new ObjectElement({}, { classes: ['example'] }, { attr: true }),
          ) as InfoElement;
        });

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(infoElement)).toMatchSnapshot();
        });

        specify('should deepmerge meta', function () {
          assert.deepEqual(toValue(infoElement.meta), {
            classes: ['info', 'example'],
          });
        });

        specify('should deepmerge attributes', function () {
          assert.isTrue(infoElement.attributes.get('attr').equals(true));
        });
      });
    });
  });
});
