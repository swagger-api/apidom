import { assert } from 'chai';
import { isStringElement } from '@swagger-api/apidom-core';

import { parse } from '../../../../src/adapter-node';

describe('syntactic-analysis', function () {
  context('CstVisitor', function () {
    specify('should analyze alias as string', async function () {
      const result = await parse('*alias');

      assert.isTrue(isStringElement(result.result));
    });

    specify('should parse empty single quote scalar as one space string', async function () {
      const result = await parse("' '");
      assert.strictEqual(result.toValue()[0], ' ');
    });

    specify('should parse empty double quote scalar as one space string', async function () {
      const result = await parse('" "');
      assert.strictEqual(result.toValue()[0], ' ');
    });
  });
});
