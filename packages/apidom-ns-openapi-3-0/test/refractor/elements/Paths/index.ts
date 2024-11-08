import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { PathsElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('PathsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const pathsElement = PathsElement.refract({
          '/path1': {},
          '/path2': {},
        });

        expect(sexprs(pathsElement)).toMatchSnapshot();
      });
    });
  });
});
