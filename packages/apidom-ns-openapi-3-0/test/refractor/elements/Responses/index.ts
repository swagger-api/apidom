import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ResponsesElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ResponsesElement', function () {
      context('given all fields of type ResponseElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const responsesElement = ResponsesElement.refract({
            default: {},
            '200': {},
          });

          expect(sexprs(responsesElement)).toMatchSnapshot();
        });
      });

      context('given all fields of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const responsesElement = ResponsesElement.refract({
            default: { $ref: '#/components/responses/Response1' },
            '200': { $ref: '#/components/responses/Response1' },
          });

          expect(sexprs(responsesElement)).toMatchSnapshot();
        });
      });
    });

    context('given unrecognized fields', function () {
      specify('should refract values to generic ApiDOM tree', function () {
        const responsesElement = ResponsesElement.refract({
          '600': {},
          XXX: {},
        });

        expect(sexprs(responsesElement)).toMatchSnapshot();
      });
    });
  });
});
