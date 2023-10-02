import fs from 'node:fs';
import path from 'node:path';
import { TextDocument } from 'vscode-languageserver-textdocument';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Diagnostic, Position } from 'vscode-languageserver-types';
// @ts-ignore
import {
  Element,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAtOffset,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isMemberElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isObjectElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isStringElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  traverse,
  toValue,
} from '@swagger-api/apidom-core';

import { parse } from '../src/parser-factory';
import { getSourceMap, SourceMap } from '../src/utils/utils';

// const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.yaml'))
  .toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specCompletionJson = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.json'))
  .toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.yaml'))
  .toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specErrorJson = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.json'))
  .toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specSimple = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-simple.yaml'))
  .toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specErrorSimple = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error-simple.yaml'))
  .toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specErrorSimpleJson = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error-simple.json'))
  .toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specSyntaxYaml = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api.yaml'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specSyntaxYamlNoQuotes = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-noquotes-sort.yaml'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specSyntaxYamlNoQuotesAsync = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-async-noquotes.yaml'))
  .toString();

describe('apidom-parse-test', function () {
  it('test parse yaml', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/file.yaml',
      'yaml',
      0,
      specSyntaxYamlNoQuotesAsync,
    );

    const diagnostics: Diagnostic[] = [];

    // eslint-disable-next-line consistent-return
    parse(doc, undefined).then((result) => {
      const { api } = result;
      if (!api) {
        return diagnostics;
      }
      api.freeze(); // !! freeze and add parent !!

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function printSourceMap(node: Element): void {
        const sm: SourceMap = getSourceMap(node);
        // eslint-disable-next-line no-console
        console.log(node.element, `${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function printContent(node: Element): void {
        const sm: SourceMap = getSourceMap(node);
        // eslint-disable-next-line no-console
        console.log(
          node.element,
          toValue(node.getMetaProperty('classes', [])),
          `[${sm.offset} / ${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}]`,
          toValue(node),
        );
      }

      // traverse(printSourceMap, api);
      traverse(printContent, api);

      if (result.annotations) {
        for (const annotation of result.annotations) {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(annotation));
        }
      }

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
