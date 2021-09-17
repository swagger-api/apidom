import { assert } from 'chai';

import * as adapter from '../src/adapter-node';

describe('adapter-node', function () {
  context('given direct syntactic analysis', function () {
    context('given zero byte empty file', function () {
      specify('should return empty parse result', async function () {
        const parseResult = await adapter.parse('', {
          sourceMap: true,
          syntacticAnalysis: 'direct',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });

    context('given non-zero byte empty file', function () {
      specify('should return empty parser result', async function () {
        const parseResult = await adapter.parse('  ', {
          sourceMap: true,
          syntacticAnalysis: 'direct',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });

    context('given invalid json file', function () {
      specify('should return empty parser result', async function () {
        const parseResult = await adapter.parse(' a ', {
          sourceMap: true,
          syntacticAnalysis: 'direct',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });
  });

  context('given indirect syntactic analysis', function () {
    context('given zero byte empty file', function () {
      specify('should return empty parse result', async function () {
        const parseResult = await adapter.parse('', {
          sourceMap: true,
          syntacticAnalysis: 'indirect',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });

    context('given non-zero byte empty file', function () {
      specify('should return empty parser result', async function () {
        const parseResult = await adapter.parse('  ', {
          sourceMap: true,
          syntacticAnalysis: 'indirect',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });

    context('given invalid json file', function () {
      specify('should return empty parser result', async function () {
        const parseResult = await adapter.parse(' a ', {
          sourceMap: true,
          syntacticAnalysis: 'indirect',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });
  });
});
