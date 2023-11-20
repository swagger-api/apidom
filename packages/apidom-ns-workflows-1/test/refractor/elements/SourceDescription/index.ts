import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SourceDescriptionElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SourceDescriptionElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const sourceDescriptionElement = SourceDescriptionElement.refract({
          name: 'petStoreDescription',
          url: 'https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml',
          type: 'openapi',
        });

        expect(sexprs(sourceDescriptionElement)).toMatchSnapshot();
      });
    });
  });
});
