import { expect } from 'chai';
import { sexprs } from 'apidom';

import { AsyncApi2_0Element } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('AsyncApi2_0Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const asyncApiElement = AsyncApi2_0Element.refract({
          asyncapi: '2.0.0',
          id: 'urn:com:smartylighting:streetlights:server',
          info: {},
          servers: {},
          defaultContentType: 'application/json',
          channels: {},
          components: {},
          tags: [],
          externalDocs: {},
        });

        expect(sexprs(asyncApiElement)).toMatchSnapshot();
      });
    });
  });
});
