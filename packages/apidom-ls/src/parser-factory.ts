// @ts-ignore
import ApiDOMParser from '@swagger-api/apidom-parser';
// @ts-ignore
import * as openapi3_1Adapter from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
// @ts-ignore
import * as asyncapi2Adapter from '@swagger-api/apidom-parser-adapter-asyncapi-json-2';
// @ts-ignore
import * as openapi3_1Adapter_Yaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-1';
// @ts-ignore
import * as asyncapi2Adapter_Yaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';
// @ts-ignore
import * as adsAdapter from '@swagger-api/apidom-ns-api-design-systems/adapters/json';
// @ts-ignore
import * as adsAdapter_Yaml from '@swagger-api/apidom-ns-api-design-systems/adapters/yaml';
// @ts-ignore
import { refractorPluginReplaceEmptyElement } from '@swagger-api/apidom-ns-asyncapi-2';
import {
  OpenApi3_1Element,
  refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOas,
} from '@swagger-api/apidom-ns-openapi-3-1';
/* import {
  refractPluginOpenApi3_1StandardIdentifierSelectors,
  refractPluginOpenApi3_1StandardIdentifierAccessors,
} from '@swagger-api/apidom-ns-api-design-systems'; */
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { parse as parseYAML } from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import { parse as parseJSON } from '@swagger-api/apidom-parser-adapter-json';
import {
  MainElement,
  refractPluginOpenApi3_1StandardIdentifierAccessors,
  refractPluginOpenApi3_1StandardIdentifierSelectors,
  validateOpenAPI3_1,
} from '@swagger-api/apidom-ns-api-design-systems';
import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';

import { MetadataMaps } from './apidom-language-types';
import {
  isAsyncDoc,
  isAdsDoc,
  isJsonDoc,
  isSpecVersionSet,
  setMetadataMap,
  getSourceMap,
} from './utils/utils';

export interface ParserOptions {
  sourceMap?: boolean;
  specObj?: string;
  parser?: unknown;
}

export function getParser(document: TextDocument | string): ApiDOMParser {
  const async = isAsyncDoc(document);
  const ads = isAdsDoc(document);
  const json = isJsonDoc(document);

  if (ads && json) {
    return ApiDOMParser().use(adsAdapter);
  }
  if (ads && !json) {
    return ApiDOMParser().use(adsAdapter_Yaml);
  }
  if (async && json) {
    return ApiDOMParser().use(asyncapi2Adapter);
  }
  if (async && !json) {
    return ApiDOMParser().use(asyncapi2Adapter_Yaml);
  }
  if (!async && json) {
    return ApiDOMParser().use(openapi3_1Adapter);
  }
  if (!async && !json) {
    return ApiDOMParser().use(openapi3_1Adapter_Yaml);
  }
  return ApiDOMParser().use(asyncapi2Adapter);
}

export async function validateAds(document: TextDocument): Promise<Diagnostic[]> {
  try {
    const adsLint =
      'version: "2021-05-07"\n' +
      'info:\n' +
      '  title: SmartBear API Design\n' +
      '  description: |\n' +
      '    A machine and human readable version of the SmartBear API Style Guide aimed at promoting living API Style Governance across various tools and teams, leading to improved API quality.\n' +
      '    See the [SmartBear Standards and Guidelines](https://github.com/SmartBear/api-standards-and-guidelines) repo for a traditional view of the static guidelines.\n' +
      'scenarios:\n' +
      '  - description: GET Methods - Allowed status codes\n' +
      '    when: [http, request, method, get]\n' +
      '    then:\n' +
      '      - subject: [http, response, status_code]\n' +
      '        level: may\n' +
      '        values:\n' +
      '          - "200"\n' +
      '          - "304"\n' +
      '          - "400"\n' +
      '          - "401"\n' +
      '          - "403"\n' +
      '          - "404"\n' +
      '          - "405"\n' +
      '          - "422"\n' +
      '          - "429"\n' +
      '          - "500"\n' +
      '          - "501"\n' +
      '          - "503"\n' +
      '  - description: SB-API-010 - Only apply standard HTTP methods\n' +
      '    when: [http, transaction]\n' +
      '    then:\n' +
      '      - subject: [http, request, method]\n' +
      '        level: may\n' +
      '        values:\n' +
      '          - get\n' +
      '          - post\n' +
      '          - put\n' +
      '          - patch\n' +
      '          - delete\n' +
      '  - description: Allowed Content Type\n' +
      '    when: [http, transaction]\n' +
      '    then:\n' +
      '      - subject: [http, request, header, Content-Type]\n' +
      '        level: may\n' +
      '        values:\n' +
      '          - application/json\n' +
      '          - application/hal+json\n' +
      '  - description: GET Methods - Allowed headers\n' +
      '    when: [http, request, method, get]\n' +
      '    then:\n' +
      '      - subject: [http, request, header]\n' +
      '        level: may\n' +
      '        values:\n' +
      '          - Accept\n' +
      '          - Accept-Charset\n' +
      '          - Authorization\n' +
      '          - Content-Language\n' +
      '          - Content-Type\n' +
      '          - Link\n' +
      '          - Prefer\n';
    const apiDesignSystemsParseResult = await parseYAML(adsLint);
    const openAPIParseResult = await parseJSON(document.getText(), { sourceMap: true });
    const mainElement = MainElement.refract(apiDesignSystemsParseResult.result);
    const openapiElement = OpenApi3_1Element.refract(openAPIParseResult.result, {
      plugins: [
        refractPluginOpenApi3_1StandardIdentifierSelectors(),
        refractPluginOpenApi3_1StandardIdentifierAccessors(),
      ],
    });
    const annotations = validateOpenAPI3_1(
      mainElement as MainElement,
      openapiElement as OpenApi3_1Element,
    );
    const diagnostics: Diagnostic[] = [];
    for (const annotation of annotations) {
      const nodeSourceMap = getSourceMap(annotation);
      const location = { offset: nodeSourceMap.offset, length: nodeSourceMap.length };
      const range = Range.create(
        document.positionAt(location.offset),
        document.positionAt(location.offset + 4),
      );
      const diagnostic = Diagnostic.create(
        range,
        annotation.toValue(),
        DiagnosticSeverity.Error,
        0,
        'syntax',
      );
      diagnostics.push(diagnostic);
    }
    return diagnostics;
  } catch (e) {
    return [] as Diagnostic[];
  }
}
export async function parse(
  textDocument: TextDocument | string,
  metadataMaps: MetadataMaps | undefined,
): Promise<ParseResultElement> {
  // TODO improve detection mechanism
  const text: string = typeof textDocument === 'string' ? textDocument : textDocument.getText();
  const async = isAsyncDoc(textDocument);
  const ads = isAdsDoc(textDocument);
  const versionSet = isSpecVersionSet(textDocument);
  const json = isJsonDoc(textDocument);
  let result;

  const options: Record<string, unknown> = {
    sourceMap: true,
  };

  if (ads && json) {
    result = await adsAdapter.parse(text, options);
  } else if (ads && !json) {
    result = await adsAdapter_Yaml.parse(text, options);
  } else if (async && json) {
    result = await asyncapi2Adapter.parse(text, options);
  } else if (async && !json) {
    options.refractorOpts = { plugins: [refractorPluginReplaceEmptyElement()] };
    result = await asyncapi2Adapter_Yaml.parse(text, options);
  } else if (!versionSet) {
    options.refractorOpts = { plugins: [refractorPluginReplaceEmptyElement()] };
    result = await asyncapi2Adapter_Yaml.parse(text, options);
  } else if (!async && json) {
    result = await openapi3_1Adapter.parse(text, options);
  } else if (!async && !json) {
    options.refractorOpts = { plugins: [refractorPluginReplaceEmptyElementOas()] };
    result = await openapi3_1Adapter_Yaml.parse(text, options);
  } else {
    // fallback
    result = await asyncapi2Adapter_Yaml.parse(text, {
      sourceMap: true,
      refractorOpts: { plugins: [refractorPluginReplaceEmptyElement()] },
    });
  }
  const { api } = result;
  if (api === undefined) return result;
  const docNs: string = isAdsDoc(text)
    ? 'ads'
    : isAsyncDoc(text) || !versionSet
    ? 'asyncapi'
    : 'openapi';
  // TODO  (francesco@tumanischvili@smartbear.com) use the type related metadata at root level defining the tokenTypes and modifiers
  setMetadataMap(api, docNs, metadataMaps); // TODO (francesco@tumanischvili@smartbear.com)  move to parser/adapter, extending the one standard
  api.freeze(); // !! freeze and add parent !!

  return result;
}
