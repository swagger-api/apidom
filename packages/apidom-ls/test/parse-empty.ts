import fs from 'node:fs';
import path from 'node:path';
import { TextDocument } from 'vscode-languageserver-textdocument';
// @ts-ignore
import { traverse, Element } from '@swagger-api/apidom-core';
import { fileURLToPath } from 'node:url';

import { parse } from '../src/parser-factory';
import { getSourceMap, SourceMap } from '../src/utils/utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'async-empty.yaml')).toString();

describe('apidom-ls-parse-empty', function () {
  it('test parse empty lines async', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create('foo://bar/spec.json', 'json', 0, spec);

    parse(doc, undefined).then((result) => {
      const { api } = result;
      if (!api) {
        return;
      }
      api.freeze(); // !! freeze and add parent !!

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function printSourceMap(node: Element): void {
        const sm: SourceMap = getSourceMap(node);
        // eslint-disable-next-line no-console
        console.log(node.element, `${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}`);
      }

      // traverse(printSourceMap, api);
      traverse(printSourceMap, api);

      // offset related
      /*
      const pos = Position.create(1, 6);
      const offset = doc.offsetAt(pos);
      // find the current node
      const node: Element = findAtOffset({ offset, includeRightBound: true }, api);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sm = getSourceMap(node as Element);
      printSourceMap(node);

       */
    });
  });
});
