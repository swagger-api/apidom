import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';

import { parse } from '../src/parser-factory';
import { findNamespace } from '../src/utils/utils';
import { ContentLanguage } from '../src/apidom-language-types';

const oasJson = fs.readFileSync(path.join(__dirname, 'fixtures', 'detect', 'oas.json')).toString();
const oasYaml = fs.readFileSync(path.join(__dirname, 'fixtures', 'detect', 'oas.yaml')).toString();
const asyncJson = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'detect', 'async.json'))
  .toString();
const asyncYaml = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'detect', 'async.yaml'))
  .toString();
// const adsJson = fs.readFileSync(path.join(__dirname, 'fixtures', 'detect', 'ads.json')).toString();
// const adsYaml = fs.readFileSync(path.join(__dirname, 'fixtures', 'detect', 'ads.yaml')).toString();
const apidomJson = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'detect', 'apidom.json'))
  .toString();
const apidomYaml = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'detect', 'apidom.yaml'))
  .toString();

const asyncYamlInvalid = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async-info.yaml'))
  .toString();

describe('apidom-ls-detect', function () {
  it('test detect', async function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const contentLanguage: ContentLanguage = {
      namespace: 'asyncapi',
      mediaType: 'application/vnd.aai.asyncapi+yaml',
    };

    // valid spec
    let doc: TextDocument = TextDocument.create('foo://bar/oasJson.json', 'oasJson', 0, oasJson);

    let result = await parse(doc, undefined);
    assert.deepEqual(result.api?.element, 'openApi3_1');
    result = await parse(doc, undefined, true, true, true, contentLanguage);
    assert.deepEqual(result.api?.element, 'openApi3_1');

    let ns = await findNamespace(doc);
    assert.deepEqual(ns.namespace, 'openapi');
    assert.deepEqual(ns.format, 'JSON');
    ns = await findNamespace(doc, contentLanguage);
    assert.deepEqual(ns.namespace, 'openapi');
    assert.deepEqual(ns.format, 'JSON');

    doc = TextDocument.create('foo://bar/oasYaml.yaml', 'oasYaml', 0, oasYaml);

    result = await parse(doc, undefined);
    assert.deepEqual(result.api?.element, 'openApi3_1');
    result = await parse(doc, undefined, true, true, true, contentLanguage);
    assert.deepEqual(result.api?.element, 'openApi3_1');

    ns = await findNamespace(doc);
    assert.deepEqual(ns.namespace, 'openapi');
    assert.deepEqual(ns.format, 'YAML');
    ns = await findNamespace(doc, contentLanguage);
    assert.deepEqual(ns.namespace, 'openapi');
    assert.deepEqual(ns.format, 'YAML');

    doc = TextDocument.create('foo://bar/asyncYaml.yaml', 'asyncYaml', 0, asyncYaml);

    result = await parse(doc, undefined);
    assert.deepEqual(result.api?.element, 'asyncApi2');
    result = await parse(doc, undefined, true, true, true, contentLanguage);
    assert.deepEqual(result.api?.element, 'asyncApi2');

    ns = await findNamespace(doc);
    assert.deepEqual(ns.namespace, 'asyncapi');
    assert.deepEqual(ns.format, 'YAML');
    ns = await findNamespace(doc, contentLanguage);
    assert.deepEqual(ns.namespace, 'asyncapi');
    assert.deepEqual(ns.format, 'YAML');

    doc = TextDocument.create('foo://bar/asyncJson.json', 'asyncJson', 0, asyncJson);

    result = await parse(doc, undefined);
    assert.deepEqual(result.api?.element, 'asyncApi2');
    result = await parse(doc, undefined, true, true, true, contentLanguage);
    assert.deepEqual(result.api?.element, 'asyncApi2');

    ns = await findNamespace(doc);
    assert.deepEqual(ns.namespace, 'asyncapi');
    assert.deepEqual(ns.format, 'JSON');
    ns = await findNamespace(doc, contentLanguage);
    assert.deepEqual(ns.namespace, 'asyncapi');
    assert.deepEqual(ns.format, 'JSON');

    doc = TextDocument.create('foo://bar/apidomJson.json', 'apidomJson', 0, apidomJson);

    result = await parse(doc, undefined);
    result = await parse(doc, undefined, true, true, true, contentLanguage);
    assert.deepEqual(result.api?.element, 'asyncApi2');

    ns = await findNamespace(doc);
    assert.deepEqual(ns.namespace, 'apidom');
    assert.deepEqual(ns.format, 'JSON');
    ns = await findNamespace(doc, contentLanguage);
    assert.deepEqual(ns.namespace, 'asyncapi');
    assert.deepEqual(ns.format, 'JSON');

    doc = TextDocument.create('foo://bar/apidomYaml.yaml', 'apidomYaml', 0, apidomYaml);

    result = await parse(doc, undefined);
    result = await parse(doc, undefined, true, true, true, contentLanguage);
    assert.deepEqual(result.api?.element, 'asyncApi2');

    ns = await findNamespace(doc);
    assert.deepEqual(ns.namespace, 'apidom');
    assert.deepEqual(ns.format, 'YAML');
    ns = await findNamespace(doc, contentLanguage);
    assert.deepEqual(ns.namespace, 'asyncapi');
    assert.deepEqual(ns.format, 'YAML');
  });

  it('test detect invalid YAML', async function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const contentLanguage: ContentLanguage = {
      namespace: 'asyncapi',
      mediaType: 'application/vnd.aai.asyncapi+yaml',
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/asyncYamlInvalid.yaml',
      'asyncYamlInvalid',
      0,
      asyncYamlInvalid,
    );

    let ns = await findNamespace(doc);
    assert.deepEqual(ns.namespace, 'apidom');
    assert.deepEqual(ns.format, 'YAML');
    ns = await findNamespace(doc, contentLanguage);
    assert.deepEqual(ns.namespace, 'asyncapi');
    assert.deepEqual(ns.format, 'YAML');
  });
});
