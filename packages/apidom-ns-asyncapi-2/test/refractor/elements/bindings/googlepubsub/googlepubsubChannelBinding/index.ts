import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { GooglePubSubChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('GooglePubSubChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const googlepubsubChannelBindingElement = GooglePubSubChannelBindingElement.refract({
          bindingVersion: '0.1.0',
          labels: {},
          messageRetentionDuration: '86400s',
          messageStoragePolicy: {
            allowedPersistenceRegions: ['us-central1'],
          },
          schemaSettings: {
            encoding: 'binary',
            name: 'projects/your-project/schemas/message-proto',
          },
          topic: 'projects/your-project/topics/topic-avro-schema',
        });

        expect(sexprs(googlepubsubChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
