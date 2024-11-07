import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { LinkDescriptionElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('LinkDescription', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const linkDescriptionElement = LinkDescriptionElement.refract({
          href: 'base64',
          rel: 'image/png',
          title: 'title',
          targetSchema: {},
          mediaType: 'text/html',
          method: 'GET',
          encType: 'application/x-www-form-urlencoded',
          schema: {},
        });

        expect(sexprs(linkDescriptionElement)).toMatchSnapshot();
      });
    });
  });
});
