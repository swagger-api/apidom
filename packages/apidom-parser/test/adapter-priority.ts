import { assert } from 'chai';
import { createSandbox } from 'sinon';
import * as asyncApiJsonAdapter from '@swagger-api/apidom-parser-adapter-asyncapi-json-2';
import * as asyncApiYamlAdapter from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';
import { isAsyncApi2Element } from '@swagger-api/apidom-ns-asyncapi-2';

import ApiDOMParser from '../src/parser';

const parser = ApiDOMParser();
parser.use(asyncApiJsonAdapter);
parser.use(asyncApiYamlAdapter);

describe('given AsyncAPI 2.4 definition', function () {
  const sandbox = createSandbox();

  beforeEach(function () {
    sandbox.spy(asyncApiJsonAdapter, 'parse');
    sandbox.spy(asyncApiYamlAdapter, 'parse');
  });

  afterEach(function () {
    sandbox.restore();
  });

  context('given JSON format', function () {
    sandbox.spy();

    specify('should parse semantically', async function () {
      const { result } = await parser.parse('{"asyncapi":"2.5.0"}');

      assert.isTrue(isAsyncApi2Element(result));
    });

    specify('should use asyncApiJsonAdapter', async function () {
      await parser.parse('{"asyncapi":"2.5.0"}');

      // @ts-ignore
      assert.isTrue(asyncApiJsonAdapter.parse.calledOnce);
      // @ts-ignore
      assert.isTrue(asyncApiYamlAdapter.parse.notCalled);
    });
  });

  context('given YAML 1.2 format', function () {
    specify('should parse semantically', async function () {
      const { result } = await parser.parse('asyncapi: "2.5.0"');

      assert.isTrue(isAsyncApi2Element(result));
    });

    specify('should use asyncApiYamlAdapter', async function () {
      await parser.parse('asyncapi: "2.5.0"');

      // @ts-ignore
      assert.isTrue(asyncApiYamlAdapter.parse.calledOnce);
      // @ts-ignore
      assert.isTrue(asyncApiJsonAdapter.parse.notCalled);
    });
  });
});
