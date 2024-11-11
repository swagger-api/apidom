import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { LinkDescriptionElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('LinkDescription', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const linkDescriptionElement = LinkDescriptionElement.refract({
          href: 'base64',
          hrefSchema: {},
          rel: 'image/png',
          title: 'title',
          targetSchema: {},
          mediaType: 'text/html',
          submissionEncType: 'application/x-www-form-urlencoded',
          submissionSchema: {},
        });

        expect(sexprs(linkDescriptionElement)).toMatchSnapshot();
      });
    });
  });
});
