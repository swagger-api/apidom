/* eslint-disable no-param-reassign */
import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { fileURLToPath } from 'node:url';
import { isMemberElement, isStringElement, MemberElement } from '@swagger-api/apidom-core';
import {
  InfoElement as OpenAPI2InfoElement,
  isInfoElement as isOpenAPI2InfoElement,
} from '@swagger-api/apidom-ns-openapi-2';
import {
  InfoElement as OpenAPI3_0InfoElement,
  isInfoElement as isOpenAPI3_0InfoElement,
} from '@swagger-api/apidom-ns-openapi-3-0';
import {
  InfoElement as OpenAPI3_1InfoElement,
  isInfoElement as isOpenAPI3_1InfoElement,
} from '@swagger-api/apidom-ns-openapi-3-1';
import {
  InfoElement as AsyncAPI2InfoElement,
  isInfoElement as isAsyncAPI2InfoElement,
} from '@swagger-api/apidom-ns-asyncapi-2';

import { parse } from '../src/parser-factory.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specOpenAPI2YAML = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'parse', 'refractor-plugins', 'openapi-2.yaml'))
  .toString();

const specOpenAPI2JSON = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'parse', 'refractor-plugins', 'openapi-2.json'))
  .toString();

const specOpenAPI30YAML = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'parse', 'refractor-plugins', 'openapi-3-0.yaml'))
  .toString();

const specOpenAPI30JSON = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'parse', 'refractor-plugins', 'openapi-3-0.json'))
  .toString();

const specOpenAPI31YAML = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'parse', 'refractor-plugins', 'openapi-3-1.yaml'))
  .toString();

const specOpenAPI31JSON = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'parse', 'refractor-plugins', 'openapi-3-1.json'))
  .toString();

const specAsyncAPI2YAML = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'parse', 'refractor-plugins', 'asyncapi-2.yaml'))
  .toString();

const specAsyncAPI2JSON = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'parse', 'refractor-plugins', 'asyncapi-2.json'))
  .toString();

const refractorPluginFactory = (version: string) => () => ({
  visitor: {
    MemberElement(element: MemberElement) {
      if (isStringElement(element.key) && element.key.equals('additionalInfo')) {
        switch (version) {
          case 'openapi-2':
            element.value = OpenAPI2InfoElement.refract(element.value);
            break;
          case 'openapi-3-0':
            element.value = OpenAPI3_0InfoElement.refract(element.value);
            break;
          case 'openapi-3-1':
            element.value = OpenAPI3_1InfoElement.refract(element.value);
            break;
          case 'asyncapi-2':
            element.value = AsyncAPI2InfoElement.refract(element.value);
            break;
          default:
            break;
        }
      }
    },
  },
});

describe('apidom-ls-parse-refractor-plugins', function () {
  it('should apply refractor plugins to OpenAPI 2.0 in JSON format', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.json',
      'json',
      0,
      specOpenAPI2JSON,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'openapi-2': [refractorPluginFactory('openapi-2')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isTrue(isOpenAPI2InfoElement(element.value));
  });

  it('should apply refractor plugins to OpenAPI 2.0 in YAML format', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.yaml',
      'yaml',
      0,
      specOpenAPI2YAML,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'openapi-2': [refractorPluginFactory('openapi-2')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isTrue(isOpenAPI2InfoElement(element.value));
  });

  it('should apply refractor plugins to OpenAPI 3.0 in JSON format', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.json',
      'json',
      0,
      specOpenAPI30JSON,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'openapi-3-0': [refractorPluginFactory('openapi-3-0')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isTrue(isOpenAPI3_0InfoElement(element.value));
  });

  it('should apply refractor plugins to OpenAPI 3.0 in YAML format', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.yaml',
      'yaml',
      0,
      specOpenAPI30YAML,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'openapi-3-0': [refractorPluginFactory('openapi-3-0')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isTrue(isOpenAPI3_0InfoElement(element.value));
  });

  it('should apply refractor plugins to OpenAPI 3.1 in JSON format', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.json',
      'json',
      0,
      specOpenAPI31JSON,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'openapi-3-1': [refractorPluginFactory('openapi-3-1')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isTrue(isOpenAPI3_1InfoElement(element.value));
  });

  it('should apply refractor plugins to OpenAPI 3.1 in YAML format', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.yaml',
      'yaml',
      0,
      specOpenAPI31YAML,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'openapi-3-1': [refractorPluginFactory('openapi-3-1')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isTrue(isOpenAPI3_1InfoElement(element.value));
  });

  it('should apply refractor plugins to AsyncAPI 2.x in JSON format', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.json',
      'json',
      0,
      specAsyncAPI2JSON,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'asyncapi-2': [refractorPluginFactory('asyncapi-2')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isTrue(isAsyncAPI2InfoElement(element.value));
  });

  it('should apply refractor plugins to AsyncAPI 2.x in YAML format', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.yaml',
      'yaml',
      0,
      specAsyncAPI2YAML,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'asyncapi-2': [refractorPluginFactory('asyncapi-2')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isTrue(isAsyncAPI2InfoElement(element.value));
  });

  it('should not apply refractor plugins defined for other specifications', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/spec.yaml',
      'yaml',
      0,
      specOpenAPI30YAML,
    );

    const result = await parse(doc, undefined, true, true, true, undefined, {
      'openapi-2': [refractorPluginFactory('openapi-2')],
    });

    const { api } = result;

    const element = api?.content.find(
      (el) => isMemberElement(el) && isStringElement(el.key) && el.key.equals('additionalInfo'),
    ) as MemberElement;

    assert.isFalse(isOpenAPI2InfoElement(element.value));
  });
});
