import { expect } from 'chai';
import { sexprs } from 'apidom';

import { PathsElement } from '../../../../src';

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
