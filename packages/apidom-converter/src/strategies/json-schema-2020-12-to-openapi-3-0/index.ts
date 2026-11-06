import {
  AnnotationElement,
  Element,
  ParseResultElement,
  cloneDeep,
} from '@swagger-api/apidom-core';
import {
  isOpenApi3_0Element,
  mediaTypes as openAPI3_0MediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-0';
import { File, dereferenceApiDOM } from '@swagger-api/apidom-reference';

import ConvertStrategy from '../ConvertStrategy.ts';
import type { ConverterOptions } from '../../options/index.ts';
import { createWarnings, needsDowngrade } from './downgrade/index.ts';
import downgradeSchemasInDocument, { elementAt } from './downgrade/document.ts';
import findSchemaPositions from './schema-positions.ts';
import createFragmentTransformer from './external.ts';
import postPass from './post-pass.ts';

/**
 * Converts JSON Schema 2020-12 (and other JSON Schema dialects) used in an OpenAPI 3.0.x
 * document into OpenAPI 3.0 Schema Objects. External references are inlined and converted.
 * @public
 */
class JSONSchema202012ToOpenAPI30ConvertStrategy extends ConvertStrategy {
  constructor() {
    super({ name: 'json-schema-2020-12-to-openapi-3-0' });
  }

  // eslint-disable-next-line class-methods-use-this
  canConvert(file: File, options: ConverterOptions): boolean {
    const hasRecognizedTargetMediaType = openAPI3_0MediaTypes.includes(
      options.convert.targetMediaType,
    );
    let hasRecognizedSourceMediaType = false;

    if (openAPI3_0MediaTypes.includes(options.convert.sourceMediaType)) {
      hasRecognizedSourceMediaType = true;
    } else if (file.mediaType !== 'text/plain') {
      hasRecognizedSourceMediaType = openAPI3_0MediaTypes.includes(file.mediaType);
    } else if (isOpenApi3_0Element(file.parseResult?.result)) {
      hasRecognizedSourceMediaType = true;
    }

    return hasRecognizedSourceMediaType && hasRecognizedTargetMediaType;
  }

  // eslint-disable-next-line class-methods-use-this
  async convert(file: File, options: ConverterOptions): Promise<ParseResultElement> {
    const parseResult = cloneDeep(file.parseResult!) as ParseResultElement;
    const { api } = parseResult as { api: Element };
    const warnings = createWarnings();
    const annotations: AnnotationElement[] = [];

    const rootSchemas = findSchemaPositions(api).filter((tokens) =>
      needsDowngrade(elementAt(api, tokens)!),
    );
    downgradeSchemasInDocument(api, file.uri, rootSchemas, warnings);
    annotations.push(...warnings.annotations);

    const openApi30Options = options.dereference.strategyOpts['openapi-3-0'] ?? {};
    const dereferenced = await dereferenceApiDOM(api, {
      ...options,
      parse: {
        ...options.parse,
        mediaType: openAPI3_0MediaTypes.latest(),
        parsers: options.parse.parsers.filter((parser) => parser.name !== 'binary'),
      },
      resolve: {
        ...options.resolve,
        baseURI: file.uri,
        internal: false,
        resolverOpts: {
          ...options.resolve.resolverOpts,
          urlAllowList: options.convert.httpAllowList,
        },
      },
      dereference: {
        ...options.dereference,
        strategyOpts: {
          ...options.dereference.strategyOpts,
          'openapi-3-0': {
            ...openApi30Options,
            internalScope: 'entry',
            dereferenceExamples: false,
            dereferenceLinks: false,
            fragmentTransformer: createFragmentTransformer(annotations),
          },
        },
      },
    });

    const postPassWarnings = createWarnings();
    postPass(
      dereferenced,
      {
        entryURI: file.uri,
        targetMediaType: options.convert.targetMediaType,
        circular: options.dereference.circular,
      },
      postPassWarnings,
    );
    annotations.push(...postPassWarnings.annotations);

    parseResult.replaceResult(dereferenced);
    annotations.forEach((annotation) => parseResult.push(annotation));

    return parseResult;
  }
}

export default JSONSchema202012ToOpenAPI30ConvertStrategy;
