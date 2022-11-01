import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AnypointmqMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('AnypointmqMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const anypointmqMessageBindingElement = AnypointmqMessageBindingElement.refract({
          headers: {},
          bindingVersion: '0.1.0',
        });

        expect(sexprs(anypointmqMessageBindingElement)).toMatchSnapshot();
      });

      context('given headers field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const anypointmqMessageBindingElement = AnypointmqMessageBindingElement.refract({
            headers: {
              $ref: '#/pointer',
            },
            bindingVersion: '0.1.0',
          });

          expect(sexprs(anypointmqMessageBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
