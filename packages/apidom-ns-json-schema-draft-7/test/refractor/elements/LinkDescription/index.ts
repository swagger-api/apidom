import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { LinkDescriptionElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('LinkDescription', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const linkDescriptionElement = LinkDescriptionElement.refract({
          $comment: 'this is comment',
          anchor: 'nodes/{thisNodeId}',
          anchorPointer: '#/relative/json/pointer',
          templatePointers: {
            pointer1: '#/relative/json/pointer/1',
            pointer2: '#/relative/json/pointer/2',
          },
          templateRequired: ['id'],
          href: 'things/{id}',
          hrefSchema: {},
          headerSchema: {},
          rel: 'image/png',
          title: 'title',
          targetSchema: {},
          targetMediaType: 'text/html',
          targetHints: {
            field1: [],
            field2: [],
          },
          description: 'LDO description',
          submissionMediaType: 'multipart/alternative; boundary=ab2',
          submissionSchema: {},
        });

        expect(sexprs(linkDescriptionElement)).toMatchSnapshot();
      });
    });
  });
});
