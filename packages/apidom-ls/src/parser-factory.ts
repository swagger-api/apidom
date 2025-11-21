import * as openapi2AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-2';
import * as openapi2AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-2';
import * as openapi3_0AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import * as openapi3_0AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-0';
import * as openapi3_1AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import * as openapi3_1AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-1';
import * as asyncapi2AdapterJson from '@swagger-api/apidom-parser-adapter-asyncapi-json-2';
import * as asyncapi2AdapterYaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';
import * as asyncapi3AdapterYaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-3';
import * as adsAdapterJson from '@swagger-api/apidom-parser-adapter-api-design-systems-json';
import * as adsAdapterYaml from '@swagger-api/apidom-parser-adapter-api-design-systems-yaml';
import * as adapterJson from '@swagger-api/apidom-parser-adapter-json';
import * as adapterYaml from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementAsyncAPI3 } from '@swagger-api/apidom-ns-asyncapi-3';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementAsyncAPI2 } from '@swagger-api/apidom-ns-asyncapi-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOpenAPI2 } from '@swagger-api/apidom-ns-openapi-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOpenAPI3_0 } from '@swagger-api/apidom-ns-openapi-3-0';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOpenAPI3_1 } from '@swagger-api/apidom-ns-openapi-3-1';
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
    (contentLanguage.version?.startsWith('2.') || !contentLanguage.version) &&
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
    (contentLanguage.version?.startsWith('2.') || !contentLanguage.version) &&
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
