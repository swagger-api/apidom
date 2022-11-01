import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { GooglePubSubMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('GooglePubSubChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const googlepubsubMessageBindingElement = GooglePubSubMessageBindingElement.refract({
          bindingVersion: '0.1.0',
          attributes: {},
          orderingKey: '',
          schema: {
            name: 'projects/your-project/schemas/message-avro',
            type: 'avro',
          },
        });

        expect(sexprs(googlepubsubMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
