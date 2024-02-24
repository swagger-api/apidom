import { assert, expect } from 'chai';
import { ObjectElement, toValue, sexprs } from '@swagger-api/apidom-core';

import { InfoElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('InfoElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'Sample Pet Store App',
          description: 'This is a sample server for a pet store.',
          termsOfService: 'https://example.com/terms/',
          contact: {},
          license: {},
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
