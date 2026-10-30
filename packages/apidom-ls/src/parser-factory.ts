import * as openapi2AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-2';
import * as openapi2AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-2';
import * as openapi3_0AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import * as openapi3_0AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-0';
import * as openapi3_1AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import * as openapi3_1AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-1';
import * as openapi3_2AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-2';
import * as openapi3_2AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-2';
import * as asyncapi2AdapterJson from '@swagger-api/apidom-parser-adapter-asyncapi-json-2';
import * as asyncapi2AdapterYaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';
import * as asyncapi3AdapterJson from '@swagger-api/apidom-parser-adapter-asyncapi-json-3';
import * as asyncapi3AdapterYaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-3';
import * as a2a1AdapterJson from '@swagger-api/apidom-parser-adapter-a2a-json-1';
import * as a2a1AdapterYaml from '@swagger-api/apidom-parser-adapter-a2a-yaml-1';
import * as jsonSchema202012AdapterJson from '@swagger-api/apidom-parser-adapter-json-schema-json-2020-12';
import * as jsonSchema202012AdapterYaml from '@swagger-api/apidom-parser-adapter-json-schema-yaml-2020-12';
import * as adsAdapterJson from '@swagger-api/apidom-parser-adapter-api-design-systems-json';
import * as adsAdapterYaml from '@swagger-api/apidom-parser-adapter-api-design-systems-yaml';
import * as adapterJson from '@swagger-api/apidom-parser-adapter-json';
import * as adapterYaml from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementAsyncAPI3 } from '@swagger-api/apidom-ns-asyncapi-3';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementAsyncAPI2 } from '@swagger-api/apidom-ns-asyncapi-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOpenAPI2 } from '@swagger-api/apidom-ns-openapi-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOpenAPI3_0 } from '@swagger-api/apidom-ns-openapi-3-0';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOpenAPI3_1 } from '@swagger-api/apidom-ns-openapi-3-1';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOpenAPI3_2 } from '@swagger-api/apidom-ns-openapi-3-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementA2A1 } from '@swagger-api/apidom-ns-a2a-1';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementJSONSchema202012 } from '@swagger-api/apidom-ns-json-schema-2020-12';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ParseResultElement } from '@swagger-api/apidom-core';

import { setMetadataMap, findNamespace } from './utils/utils.ts';
import { ContentLanguage, MetadataMaps, RefractorPlugins } from './apidom-language-types.ts';

export interface ParserOptions {
  sourceMap?: boolean;
  specObj?: string;
  parser?: unknown;
}

export async function parse(
  textDocument: TextDocument | string,
  metadataMaps: MetadataMaps | undefined,
  registerPlugins = true,
  freeze = true,
  setMetadata = true,
  defaultContentLanguage?: ContentLanguage,
  refractorPlugins?: RefractorPlugins,
): Promise<ParseResultElement> {
  // TODO improve detection mechanism
  const text: string = typeof textDocument === 'string' ? textDocument : textDocument.getText();
  let result;
  const contentLanguage = await findNamespace(text, defaultContentLanguage);
  if (
    contentLanguage.namespace === 'asyncapi' &&
    contentLanguage.version?.startsWith('2.') &&
    contentLanguage.format === 'JSON'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [...(refractorPlugins?.['asyncapi-2'] || [])],
      },
    };

    result = await asyncapi2AdapterJson.parse(text, options);
  } else if (
    contentLanguage.namespace === 'asyncapi' &&
    contentLanguage.version?.startsWith('2.') &&
    contentLanguage.format === 'YAML'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [
          registerPlugins && refractorPluginReplaceEmptyElementAsyncAPI2(),
          ...(refractorPlugins?.['asyncapi-2'] || []),
        ].filter(Boolean),
      },
    };

    result = await asyncapi2AdapterYaml.parse(text, options);
  } else if (
    contentLanguage.namespace === 'asyncapi' &&
    contentLanguage.version?.startsWith('3.') &&
    contentLanguage.format === 'JSON'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [...(refractorPlugins?.['asyncapi-3'] || [])],
      },
    };

    result = await asyncapi3AdapterJson.parse(text, options);
  } else if (
    contentLanguage.namespace === 'asyncapi' &&
    contentLanguage.version?.startsWith('3.') &&
    contentLanguage.format === 'YAML'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [
          registerPlugins && refractorPluginReplaceEmptyElementAsyncAPI3(),
          ...(refractorPlugins?.['asyncapi-3'] || []),
        ].filter(Boolean),
      },
    };

    result = await asyncapi3AdapterYaml.parse(text, options);
  } else if (
    contentLanguage.namespace === 'openapi' &&
    contentLanguage.version === '2.0' &&
    contentLanguage.format === 'JSON'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [...(refractorPlugins?.['openapi-2'] || [])],
      },
    };

    result = await openapi2AdapterJson.parse(text, options);
  } else if (
    contentLanguage.namespace === 'openapi' &&
    contentLanguage.version === '2.0' &&
    contentLanguage.format === 'YAML'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [
          registerPlugins && refractorPluginReplaceEmptyElementOpenAPI2(),
          ...(refractorPlugins?.['openapi-2'] || []),
        ].filter(Boolean),
      },
    };

    result = await openapi2AdapterYaml.parse(text, options);
  } else if (
    contentLanguage.namespace === 'openapi' &&
    contentLanguage.version?.startsWith('3.0') &&
    contentLanguage.format === 'JSON'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [...(refractorPlugins?.['openapi-3-0'] || [])],
      },
    };

    result = await openapi3_0AdapterJson.parse(text, options);
  } else if (
    contentLanguage.namespace === 'openapi' &&
    contentLanguage.version?.startsWith('3.0') &&
    contentLanguage.format === 'YAML'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [
          registerPlugins && refractorPluginReplaceEmptyElementOpenAPI3_0(),
          ...(refractorPlugins?.['openapi-3-0'] || []),
        ].filter(Boolean),
      },
    };

    result = await openapi3_0AdapterYaml.parse(text, options);
  } else if (
    contentLanguage.namespace === 'openapi' &&
    contentLanguage.version?.startsWith('3.1') &&
    contentLanguage.format === 'JSON'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [...(refractorPlugins?.['openapi-3-1'] || [])],
      },
    };

    result = await openapi3_1AdapterJson.parse(text, options);
  } else if (
    contentLanguage.namespace === 'openapi' &&
    contentLanguage.version?.startsWith('3.1') &&
    contentLanguage.format === 'YAML'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [
          registerPlugins && refractorPluginReplaceEmptyElementOpenAPI3_1(),
          ...(refractorPlugins?.['openapi-3-1'] || []),
        ].filter(Boolean),
      },
    };

    result = await openapi3_1AdapterYaml.parse(text, options);
  } else if (
    contentLanguage.namespace === 'openapi' &&
    contentLanguage.version?.startsWith('3.2') &&
    contentLanguage.format === 'JSON'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [...(refractorPlugins?.['openapi-3-2'] || [])],
      },
    };

    result = await openapi3_2AdapterJson.parse(text, options);
  } else if (
    contentLanguage.namespace === 'openapi' &&
    contentLanguage.version?.startsWith('3.2') &&
    contentLanguage.format === 'YAML'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [
          registerPlugins && refractorPluginReplaceEmptyElementOpenAPI3_2(),
          ...(refractorPlugins?.['openapi-3-2'] || []),
        ].filter(Boolean),
      },
    };

    result = await openapi3_2AdapterYaml.parse(text, options);
  } else if (contentLanguage.namespace === 'a2a' && contentLanguage.format === 'JSON') {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [...(refractorPlugins?.['a2a-1'] || [])],
      },
    };

    result = await a2a1AdapterJson.parse(text, options);
  } else if (contentLanguage.namespace === 'a2a' && contentLanguage.format === 'YAML') {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [
          registerPlugins && refractorPluginReplaceEmptyElementA2A1(),
          ...(refractorPlugins?.['a2a-1'] || []),
        ].filter(Boolean),
      },
    };

    result = await a2a1AdapterYaml.parse(text, options);
  } else if (
    contentLanguage.namespace === 'json-schema' &&
    contentLanguage.version === '2020-12' &&
    contentLanguage.format === 'JSON'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [...(refractorPlugins?.['json-schema-2020-12'] || [])],
      },
    };

    result = await jsonSchema202012AdapterJson.parse(text, options);
  } else if (
    contentLanguage.namespace === 'json-schema' &&
    contentLanguage.version === '2020-12' &&
    contentLanguage.format === 'YAML'
  ) {
    const options: Record<string, unknown> = {
      sourceMap: true,
      refractorOpts: {
        plugins: [
          registerPlugins && refractorPluginReplaceEmptyElementJSONSchema202012(),
          ...(refractorPlugins?.['json-schema-2020-12'] || []),
        ].filter(Boolean),
      },
    };

    result = await jsonSchema202012AdapterYaml.parse(text, options);
  } else if (contentLanguage.namespace === 'ads' && contentLanguage.format === 'JSON') {
    result = await adsAdapterJson.parse(text, { sourceMap: true });
  } else if (contentLanguage.namespace === 'ads' && contentLanguage.format === 'YAML') {
    result = await adsAdapterYaml.parse(text, { sourceMap: true });
  } else if (contentLanguage.namespace === 'apidom' && contentLanguage.format === 'JSON') {
    result = await adapterJson.parse(text, { sourceMap: true });
  } else if (contentLanguage.namespace === 'apidom' && contentLanguage.format === 'YAML') {
    result = await adapterYaml.parse(text, { sourceMap: true });
  } else {
    // fallback
    result = await adapterJson.parse(text, { sourceMap: true });
  }
  if (contentLanguage.namespace === 'json-schema' && result.api === undefined && result.result) {
    /**
     * Every nested schema is a JSON Schema element too, so the adapters mark the root only with
     * the `result` class. The language services work on the `api` element of a parse result.
     */
    result.result.classes.push('api');
  }
  const { api } = result;
  if (api === undefined) return result;
  const docNs = contentLanguage.namespace;
  // TODO  (francesco@tumanischvili@smartbear.com) use the type related metadata at root level defining the tokenTypes and modifiers
  if (setMetadata) {
    setMetadataMap(api, docNs, metadataMaps); // TODO (francesco@tumanischvili@smartbear.com)  move to parser/adapter, extending the one standard
  }
  if (freeze) {
    api.freeze(); // !! freeze and add parent !!
  }

  return result;
}
