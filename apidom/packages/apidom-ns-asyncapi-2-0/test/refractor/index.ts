import { ObjectElement, toString, toValue } from 'apidom';

import { AsyncApi2_0Element } from '../../src';

describe('refractor', function () {
  specify('should refract to openapi-3-1 namespace', function () {
    const genericObject = new ObjectElement({
      asyncapi: '2.0.0',
      channels: {
        'user/signedup': {
          description: 'channel item description',
          subscribe: {
            summary: 'operation summary',
            description: 'operation description',
          },
        },
      },
    });
    const openApiObject = AsyncApi2_0Element.refract(genericObject);
    console.log(toString(openApiObject));
    console.dir(toValue(openApiObject));
  });
});
