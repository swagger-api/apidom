import { assert } from 'chai';
import ApiDOMParser from 'apidom-parser';
import * as openapi3_1Adapter from 'apidom-parser-adapter-openapi-json-3-1';

import { findAtOffset } from '../../src';

const parser = ApiDOMParser().use(openapi3_1Adapter);

describe('traversal', function () {
  context('findAtOffset', function () {
    context('given JSON object', function () {
      let parseResult: any;

      beforeEach(async function () {
        parseResult = await parser.parse('{"prop": "val"}', {
          sourceMap: true,
          mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
        });
      });

      specify('should find MemberElement and not dive in', function () {
        const found = findAtOffset(0, parseResult);

        assert.strictEqual(found, parseResult.get(0));
      });

      specify('should find key as most inner node', function () {
        const found = findAtOffset(5, parseResult);

        assert.strictEqual(found, parseResult.get(0).getMember('prop').key);
      });

      specify('should find value as most inner node', function () {
        const found = findAtOffset(12, parseResult);

        assert.strictEqual(found, parseResult.get(0).getMember('prop').value);
      });

      context('given out of range offset', function () {
        specify('should not find anything', function () {
          const found = findAtOffset(10000000, parseResult);

          assert.isUndefined(found);
        });
      });

      context('given negative offset', function () {
        specify('should not find anything', function () {
          const found = findAtOffset(-4, parseResult);

          assert.isUndefined(found);
        });
      });
    });
  });
});
