import { assert } from 'chai';
import { InfoElement } from '@swagger-api/apidom-ns-openapi-3-1';

import { ObjectElement, semanticElementIdentityRefractorPlugin } from '../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('semantic-element-identity', function () {
      specify('should not add unique ID to semantic elements in ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'title',
          summary: 'summary',
          contact: { name: 'John Doe' },
        });
        const objectElement: any = ObjectElement.refract(
          { a: 'b', info: infoElement },
          { plugins: [semanticElementIdentityRefractorPlugin()] },
        );

        assert.lengthOf(objectElement.id, 0);
        assert.lengthOf(objectElement.getMember('a').key.id, 0);
        assert.lengthOf(objectElement.getMember('a').value.id, 0);
        assert.lengthOf(objectElement.getMember('info').key.id, 0);
      });

      specify('should add unique ID to semantic elements in ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'title',
          summary: 'summary',
          contact: { name: 'John Doe' },
        });
        const objectElement: any = ObjectElement.refract(
          { a: 'b', info: infoElement },
          { plugins: [semanticElementIdentityRefractorPlugin()] },
        );
        const defaultLength = 6;

        assert.lengthOf(objectElement.getMember('info').value.id, defaultLength);
        assert.lengthOf(objectElement.getMember('info').value.get('contact').id, defaultLength);
      });

      specify(
        'should add unique ID of specific length to semantic elements in ApiDOM tree',
        function () {
          const length = 3;
          const infoElement = InfoElement.refract({
            title: 'title',
            summary: 'summary',
            contact: { name: 'John Doe' },
          });
          const objectElement: any = ObjectElement.refract(
            { a: 'b', info: infoElement },
            { plugins: [semanticElementIdentityRefractorPlugin({ length })] },
          );

          assert.lengthOf(objectElement.getMember('info').value.id, length);
          assert.lengthOf(objectElement.getMember('info').value.get('contact').id, length);
        },
      );
    });
  });
});
