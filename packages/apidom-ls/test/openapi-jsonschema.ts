import { expect } from 'chai';
import fs from 'node:fs';
import path from 'node:path';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic } from 'vscode-languageserver-types';
import { Element, toValue, traverse } from '@swagger-api/apidom-core';

import { parse } from '../src/parser-factory';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const spec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'jsonschema/response-content-schema.json'))
  .toString();

describe('apidom-jsonschema-prototype-test', function () {
  it('test parse', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/file.json', 'json', 0, spec);

    const text: string = doc.getText();
    const diagnostics: Diagnostic[] = [];

    const result = await parse(text, undefined);

    const { api } = result;
    if (!api) {
      return diagnostics;
    }
    api.freeze(); // !! freeze and add parent !!

    const foundElements: string[] = [];
    function printAndCheckContent(node: Element): void {
      // eslint-disable-next-line no-console
      console.log(node.element, toValue(node));
      foundElements.push(node.element);
    }

    traverse(printAndCheckContent, api);

    expect(foundElements).to.include.members(['response', 'mediaType', 'schema']);

    if (result.annotations) {
      for (const annotation of result.annotations) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(annotation));
      }
    }

    return result;
  });
});
