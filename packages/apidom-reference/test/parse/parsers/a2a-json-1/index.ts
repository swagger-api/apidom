import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { mediaTypes, isAgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

import A2AJSON1Parser from '../../../../src/parse/parsers/a2a-json-1/index.ts';
import File from '../../../../src/File.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('parsers', function () {
  context('A2AJSON1Parser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file = new File({
              uri: '/path/to/agent.json',
              mediaType: mediaTypes.latest('json'),
            });
            const parser = new A2AJSON1Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and with unknown media type but detectable content', function () {
          specify('should return true', async function () {
            const url = path.join(__dirname, 'fixtures', 'sample-agent-card.json');
            const file = new File({ uri: url, data: fs.readFileSync(url) });
            const parser = new A2AJSON1Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });

      context('given file with unsupported extension', function () {
        specify('should return false', async function () {
          const file = new File({ uri: '/path/to/agent.yaml' });
          const parser = new A2AJSON1Parser({ fileExtensions: ['.json'] });

          assert.isFalse(await parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      specify('should return a parse result containing an AgentCardElement', async function () {
        const url = path.join(__dirname, 'fixtures', 'sample-agent-card.json');
        const file = new File({ uri: url, data: fs.readFileSync(url) });
        const parser = new A2AJSON1Parser();
        const result = await parser.parse(file);

        assert.isTrue(isAgentCardElement(result.api));
      });
    });
  });
});
