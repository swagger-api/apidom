import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

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
    });
  });
});
