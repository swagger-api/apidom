import { ObjectElement, toString, toValue } from 'apidom';

import { OpenApi3_1Element } from '../../src';

describe('refractor', function () {
  specify('should refract to openapi-3-1 namespace', function () {
    const genericObject = new ObjectElement({
      openapi: '3.1.0',
    });
    const openApiObject = OpenApi3_1Element.refract(genericObject);
    console.log(toString(openApiObject));
    console.dir(toValue(openApiObject));
  });
});
