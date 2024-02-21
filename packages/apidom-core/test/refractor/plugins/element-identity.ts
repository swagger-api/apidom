import { assert } from 'chai';

import {
  ObjectElement,
  StringElement,
  refractorPluginElementIdentity,
  dispatchRefractorPlugins,
} from '../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('element-identity', function () {
      specify('should add unique ID to all elements in ApiDOM tree', function () {
        const objectElement = ObjectElement.refract(
          { a: 'b' },
          { plugins: [refractorPluginElementIdentity()] },
        ) as any;
        const defaultLength = 6;

        assert.lengthOf(objectElement.id, defaultLength);
        assert.lengthOf(objectElement.getMember('a').key.id, defaultLength);
        assert.lengthOf(objectElement.getMember('a').value.id, defaultLength);
      });

      specify(
        'should add unique ID of specific length to all elements in ApiDOM tree',
        function () {
          const length = 3;
          const objectElement = ObjectElement.refract(
            { a: 'b' },
            { plugins: [refractorPluginElementIdentity({ length })] },
          ) as any;

          assert.lengthOf(objectElement.id, length);
          assert.lengthOf(objectElement.getMember('a').key.id, length);
          assert.lengthOf(objectElement.getMember('a').value.id, length);
        },
      );

      specify('should not add unique ID when already present', function () {
        const objectElement = new ObjectElement({ id: '123' });
        objectElement.id = new StringElement('unique-id');
        const newObjectElement = dispatchRefractorPlugins(objectElement, [
          refractorPluginElementIdentity(),
        ]);

        assert.isTrue(newObjectElement.id.equals('unique-id'));
      });
    });
  });
});
