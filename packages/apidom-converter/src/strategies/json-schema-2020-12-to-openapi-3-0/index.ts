import {
  AnnotationElement,
  Element,
  ParseResultElement,
  cloneDeep,
  cloneShallow,
} from '@swagger-api/apidom-core';
import {
  isOpenApi3_0Element,
  mediaTypes as openAPI3_0MediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-0';
import { File, Reference, ReferenceSet, dereferenceApiDOM } from '@swagger-api/apidom-reference';

import ConvertStrategy from '../ConvertStrategy.ts';
import type { ConverterOptions } from '../../options/index.ts';
import { createWarnings } from './downgrade/index.ts';
import downgradeSchemasInDocument from './downgrade/document.ts';
import findSchemaPositions from './schema-positions.ts';
import createFragmentTransformer from './external.ts';
import postPass, { markPathItemFieldOrigins } from './post-pass.ts';

/**
 * A copy of a caller's `dereference.refSet` whose entry is the converted document. The
 * dereference would otherwise use a cached parse result of the entry, without the conversion.
 */
const withConvertedEntry = (refSet: ReferenceSet, entryURI: string, api: Element) => {
  const entry = cloneShallow(api);
  entry.classes.push('result');
  const copy = new ReferenceSet();
  copy.add(new Reference({ uri: entryURI, value: new ParseResultElement([entry]) }));
  refSet.refs
    .filter((ref) => ref.uri !== entryURI)
    .forEach(({ uri, depth, value }) => copy.add(new Reference({ uri, depth, value })));
  return copy;
};

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

    downgradeSchemasInDocument(api, file.uri, findSchemaPositions(api), warnings);
    markPathItemFieldOrigins(api, file.uri);
    annotations.push(...warnings.annotations);

    const openApi30Options = options.dereference.strategyOpts['openapi-3-0'] ?? {};
    const refSet = options.dereference.refSet
      ? withConvertedEntry(options.dereference.refSet, file.uri, api)
      : null;
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
        refSet,
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

    refSet?.clean();

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
