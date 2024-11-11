import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MediaElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Media', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mediaElement = MediaElement.refract({
          binaryEncoding: 'base64',
          type: 'image/png',
        });

        expect(sexprs(mediaElement)).toMatchSnapshot();
      });
    });
  });
});
