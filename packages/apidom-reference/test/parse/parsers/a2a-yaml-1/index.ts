import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { isParseResultElement, hasElementSourceMap } from '@swagger-api/apidom-core';
import { isAgentCardElement } from '@swagger-api/apidom-ns-a2a-1';
import { mediaTypes } from '@swagger-api/apidom-parser-adapter-a2a-yaml-1';

import A2AYAML1Parser from '../../../../src/parse/parsers/a2a-yaml-1/index.ts';
import File from '../../../../src/File.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('parsers', function () {
  context('A2AYAML1Parser', function () {
    context('canParse', function () {
      context('given file with .yaml extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file1 = new File({
              uri: '/path/to/agent.yaml',
              mediaType: mediaTypes.latest('generic'),
            });
            const file2 = new File({
              uri: '/path/to/agent.yaml',
              mediaType: mediaTypes.latest('yaml'),
            });
            const parser = new A2AYAML1Parser();

            assert.isTrue(await parser.canParse(file1));
            assert.isTrue(await parser.canParse(file2));
          });
        });

        context('and with improper media type', function () {
          specify('should return false', async function () {
            const file = new File({
              uri: '/path/to/agent.yaml',
              mediaType: 'application/vnd.aai.asyncapi;version=2.6.0',
            });
            const parser = new A2AYAML1Parser();

            assert.isFalse(await parser.canParse(file));
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/agent.json',
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new A2AYAML1Parser({ fileExtensions: ['.yaml', '.yml'] });

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with no extension', function () {
        specify('should return false', async function () {
          const file = new File({
            uri: '/path/to/agent',
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new A2AYAML1Parser({ fileExtensions: ['.yaml', '.yml'] });

          assert.isFalse(await parser.canParse(file));
        });
      });

      context('given file with supported extension', function () {
        context('and file data is buffer and can be detected as A2A AgentCard', function () {
          specify('should return true', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-agent-card.yaml');
            const file = new File({
              uri: '/path/to/agent.yaml',
              data: fs.readFileSync(uri),
            });
            const parser = new A2AYAML1Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and file data is string and can be detected as A2A AgentCard', function () {
          specify('should return true', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-agent-card.yaml');
            const file = new File({
              uri: '/path/to/agent.yaml',
              data: fs.readFileSync(uri).toString(),
            });
            const parser = new A2AYAML1Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });
      });
    });

    context('parse', function () {
      context('given A2A AgentCard YAML data', function () {
        specify('should return parse result containing an AgentCardElement', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-agent-card.yaml');
          const data = fs.readFileSync(uri).toString();
          const file = new File({ uri, data, mediaType: mediaTypes.latest('yaml') });
          const parser = new A2AYAML1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(isAgentCardElement(parseResult.api));
        });
      });

      context('given A2A AgentCard YAML data as buffer', function () {
        specify('should return parse result', async function () {
          const uri = path.join(__dirname, 'fixtures', 'sample-agent-card.yaml');
          const data = fs.readFileSync(uri);
          const file = new File({ uri, data, mediaType: mediaTypes.latest('yaml') });
          const parser = new A2AYAML1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(isAgentCardElement(parseResult.api));
        });
      });

      context('given empty file', function () {
        specify('should return empty parse result', async function () {
          const file = new File({
            uri: '/path/to/file.yaml',
            data: '',
            mediaType: mediaTypes.latest('yaml'),
          });
          const parser = new A2AYAML1Parser();
          const parseResult = await parser.parse(file);

          assert.isTrue(isParseResultElement(parseResult));
          assert.isTrue(parseResult.isEmpty);
        });
      });

      context('sourceMap', function () {
        context('given sourceMap enabled', function () {
          specify('should decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-agent-card.yaml');
            const data = fs.readFileSync(uri).toString();
            const file = new File({ uri, data, mediaType: mediaTypes.latest('yaml') });
            const parser = new A2AYAML1Parser({ sourceMap: true });
            const parseResult = await parser.parse(file);

            assert.isTrue(hasElementSourceMap(parseResult.api));
          });
        });

        context('given sourceMap disabled', function () {
          specify('should not decorate ApiDOM with source maps', async function () {
            const uri = path.join(__dirname, 'fixtures', 'sample-agent-card.yaml');
            const data = fs.readFileSync(uri).toString();
            const file = new File({ uri, data, mediaType: mediaTypes.latest('yaml') });
            const parser = new A2AYAML1Parser();
            const parseResult = await parser.parse(file);

            assert.isUndefined(parseResult.api?.meta.get('sourceMap'));
          });
        });
      });
    });
  });
});
