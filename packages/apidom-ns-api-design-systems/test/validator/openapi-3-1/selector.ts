import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { parse } from '@swagger-api/apidom-parser-adapter-json';
import {
  OpenApi3_1Element,
  isResponseElement,
  isOperationElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

import {
  refractPluginOpenApi3_1StandardIdentifierSelectors,
  StandardIdentifierElement,
} from '../../../src';
import select from '../../../src/validator/openapi-3-1/selector';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const definition = fs.readFileSync(path.join(__dirname, 'fixtures', 'openapi-3-1.json')).toString();

describe('given OpenAPI 3.1 definition with Standard Identifier plugin applied', function () {
  let openapiElement: any;

  beforeEach(async function () {
    const apiDOM = await parse(definition);
    openapiElement = OpenApi3_1Element.refract(apiDOM.result, {
      plugins: [refractPluginOpenApi3_1StandardIdentifierSelectors()],
    });
  });

  context('given StandardIdentifier([http, transaction])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement(['http', 'transaction']);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 2);
      assert.isTrue(isOperationElement(selected[0]));
      assert.isTrue(isOperationElement(selected[1]));
    });
  });

  specify('should select only Operation elements', function () {
    const standardIdentifier = new StandardIdentifierElement(['http', 'transaction']);
    const selected = select(openapiElement, standardIdentifier);

    assert.lengthOf(selected, 2);
    assert.isTrue(isOperationElement(selected[0]));
    assert.isTrue(isOperationElement(selected[1]));
  });

  context('given StandardIdentifier([http, request, method, get])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement([
        'http',
        'request',
        'method',
        'get',
      ]);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 1);
      assert.isTrue(isOperationElement(selected[0]));
    });
  });

  context('given StandardIdentifier([http, request, header])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement(['http', 'request', 'header']);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 2);
      assert.isTrue(isOperationElement(selected[0]));
      assert.isTrue(isOperationElement(selected[1]));
    });
  });

  context('given StandardIdentifier([http, message, header])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement(['http', 'message', 'header']);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 2);
      assert.isTrue(isOperationElement(selected[0]));
      assert.isTrue(isOperationElement(selected[1]));
    });
  });

  context('given StandardIdentifier([http, request, header, X-Header])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement([
        'http',
        'request',
        'header',
        'X-Header',
      ]);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 1);
      assert.isTrue(isOperationElement(selected[0]));
    });
  });

  context('given StandardIdentifier([http, message, header, X-Header])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement([
        'http',
        'message',
        'header',
        'X-Header',
      ]);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 1);
      assert.isTrue(isOperationElement(selected[0]));
    });
  });

  context('given StandardIdentifier([http, request, header, X-Header2])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement([
        'http',
        'request',
        'header',
        'X-Header2',
      ]);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 2);
      assert.isTrue(isOperationElement(selected[0]));
      assert.isTrue(isOperationElement(selected[1]));
    });
  });

  context('given StandardIdentifier([http, message, header, X-Header2])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement([
        'http',
        'message',
        'header',
        'X-Header2',
      ]);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 2);
      assert.isTrue(isOperationElement(selected[0]));
      assert.isTrue(isOperationElement(selected[1]));
    });
  });

  context('given StandardIdentifier([http, request, body])', function () {
    specify('should select matching Operation elements', function () {
      const standardIdentifier = new StandardIdentifierElement(['http', 'request', 'body']);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 1);
      assert.isTrue(isOperationElement(selected[0]));
    });
  });

  context('given StandardIdentifier([http, message, body])', function () {
    specify('should select matching elements', function () {
      const standardIdentifier = new StandardIdentifierElement(['http', 'message', 'body']);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 2);
      assert.isTrue(isOperationElement(selected[0]));
      assert.isTrue(isResponseElement(selected[1]));
    });
  });

  context('given StandardIdentifier([http, response, header])', function () {
    specify('should select matching Response elements', function () {
      const standardIdentifier = new StandardIdentifierElement(['http', 'response', 'header']);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 1);
      assert.isTrue(isResponseElement(selected[0]));
    });
  });

  context('given StandardIdentifier([http, response, status_code, 201])', function () {
    specify('should select matching Response elements', function () {
      const standardIdentifier = new StandardIdentifierElement([
        'http',
        'response',
        'status_code',
        '201',
      ]);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 1);
      assert.isTrue(isResponseElement(selected[0]));
    });
  });

  context('given StandardIdentifier([http, response, status_code, success])', function () {
    specify('should select matching Response elements', function () {
      const standardIdentifier = new StandardIdentifierElement([
        'http',
        'response',
        'status_code',
        'success',
      ]);
      const selected = select(openapiElement, standardIdentifier);

      assert.lengthOf(selected, 1);
      assert.isTrue(isResponseElement(selected[0]));
    });
  });
});
