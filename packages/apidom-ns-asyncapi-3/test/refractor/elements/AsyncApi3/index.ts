import { expect } from 'chai';
import { sexprs, includesClasses, ObjectElement } from '@swagger-api/apidom-core';

import { AsyncApi3Element } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AsyncApi3Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const asyncApiElement = AsyncApi3Element.refract({
          asyncapi: '3.0.0',
          id: 'urn:com:smartylighting:streetlights:server',
          info: {},
          servers: {},
          defaultContentType: 'application/json',
          channels: {},
          operations: {},
          components: {},
        });

        expect(sexprs(asyncApiElement)).toMatchSnapshot();
      });

      context('given specification extensions', function () {
        specify('should refract x- extension properties', function () {
          const asyncApiElement = AsyncApi3Element.refract({
            asyncapi: '3.0.0',
            info: {
              title: 'Test API',
              version: '1.0.0',
            },
            'x-custom-extension': 'custom value',
            'x-another-extension': {
              nested: 'property',
            },
          });

          expect(sexprs(asyncApiElement)).toMatchSnapshot();
        });

        specify('should mark x- extensions with specification-extension class', function () {
          const asyncApiElement = AsyncApi3Element.refract({
            asyncapi: '3.0.0',
            info: {
              title: 'Test API',
              version: '1.0.0',
            },
            'x-custom-extension': 'custom value',
          }) as ObjectElement;

          const extensionMember = asyncApiElement.getMember('x-custom-extension');
          expect(includesClasses(['specification-extension'], extensionMember)).to.be.true;
        });
      });
    });
  });
});
