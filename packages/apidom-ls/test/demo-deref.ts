import path from 'node:path';
import { TextDocument } from 'vscode-languageserver-textdocument';
import fs from 'node:fs';
import { dereferenceApiDOM, Reference, ReferenceSet } from '@swagger-api/apidom-reference';
import { ObjectElement } from 'minim';

import { parse } from '../src/parser-factory';

const specValidAsync = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref', 'valid-async.yaml'))
  .toString();

describe.only('reference issue demo', function () {
  specify('should demonstrate the issue with the reference', async function () {
    this.timeout(10000);
    const doc: TextDocument = TextDocument.create(
      'foo://bar/valid.json',
      'yaml',
      0,
      specValidAsync,
    );

    const parseResult = await parse(doc, undefined);

    const baseURI = 'https://smartbear.com/';

    const apiReference = Reference({ uri: baseURI, value: parseResult });

    const referenceElement1 = parseResult!
      // @ts-ignore
      .result!.get('channels')
      .get('test')
      .get('publish')
      .get('message');
    /*      const referenceElement2 = parseResult!
        // @ts-ignore
        .result!.get('components')
        .get('messages')
        .get('lightMeasured')
        .get('payload');
      const referenceElement3 = parseResult!
        // @ts-ignore
        .result!.get('components')
        .get('schemas')
        .get('lightMeasuredPayload')
        .get('properties')
        .get('sentAt'); */
    let fragmentId = 0;
    const refSet = ReferenceSet({ refs: [apiReference] });
    // @ts-ignore
    refSet.rootRef = null;
    fragmentId += 1;
    const referenceElementReference = Reference({
      uri: `${baseURI}#reference${fragmentId}`,
      value: referenceElement1,
    });
    refSet.add(referenceElementReference);
    try {
      await dereferenceApiDOM(referenceElement1, {
        resolve: {
          baseURI: `${baseURI}#reference${fragmentId}`,
          external: !(referenceElement1 as ObjectElement).get('$ref').toValue().startsWith('#'),
        },
        parse: {
          mediaType: 'application/vnd.aai.asyncapi+yaml;version=2.6.0',
        },
        dereference: { refSet },
      });
    } catch (e) {
      console.log(e);
    }
  });
});
