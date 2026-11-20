import {
  Element,
  ObjectElement,
  cloneDeep,
  createNamespace,
  isBooleanElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import openApi3_0Namespace from '@swagger-api/apidom-ns-openapi-3-0';
import { url } from '@swagger-api/apidom-reference';
import type {
  FragmentTransformer,
  FragmentTransformerInput,
} from '@swagger-api/apidom-reference/dereference/strategies/openapi-3-0';

import downgradeSchema, {
  IdentifierIndex,
  baseURIAt,
  buildIdentifierIndex,
  createWarnings,
  ignoresRefSiblings,
  needsDowngrade,
  rewriteIdentifierRefs,
  setStringValue,
} from './downgrade/index.ts';
import { elementAt, replaceAt } from './downgrade/document.ts';
import { fragmentTokens } from './downgrade/refs.ts';
import { forEachSchema } from './downgrade/walk.ts';
import findSchemaPositions from './schema-positions.ts';
import { markFragmentSource, markPathItemFieldOrigins } from './post-pass.ts';
import type { Warnings } from './downgrade/index.ts';

const namespace = createNamespace(openApi3_0Namespace);

/**
 * Whether a document is not an OpenAPI 3.0 document: a JSON Schema document (root `$schema`) or
 * an OpenAPI 3.1+ document. Its schemas are converted even when they look valid, so that rules
 * such as the `$ref` sibling split apply.
 */
const isForeignSchemaDocument = (document: Element): boolean => {
  if (!isObjectElement(document)) return false;
  const openapi = document.get('openapi');
  return (
    isStringElement(document.get('$schema')) ||
    document.hasKey('jsonSchemaDialect') ||
    (isStringElement(openapi) && !String(toValue(openapi)).startsWith('3.0'))
  );
};

/**
 * The dereference does not follow `$ref`s inside the converter's `x-conversion-*` stashes, so
 * once the schema is inlined into another document they are made absolute.
 */
const absolutizeRefsInStashes = (schema: Element, fileURI: string): void => {
  forEachSchema(schema, (current, inStash) => {
    if (!inStash || !isObjectElement(current)) return;
    const ref = current.get('$ref');
    if (isStringElement(ref)) setStringValue(ref, url.resolve(fileURI, toValue(ref)));
  });
};

interface DocumentInfo {
  readonly uri: string;
  readonly index: IdentifierIndex;
  readonly ignoresRefSiblings: boolean;
}

/**
 * The pointers of the schemas to index: the outermost schemas of an OpenAPI document, or the
 * whole document otherwise (a JSON Schema document, or a file of schemas).
 */
const indexedSchemaPointers = (document: ObjectElement): string[][] | undefined =>
  isStringElement(document.get('openapi')) ? findSchemaPositions(document) : undefined;

/**
 * Creates the `fragmentTransformer` for apidom-reference's OpenAPI 3.0 dereference: every
 * external fragment is checked, converted to OpenAPI 3.0 and returned for inlining.
 */
const createFragmentTransformer = (annotations: Warnings['annotations']): FragmentTransformer => {
  const documents = new WeakMap<Element, DocumentInfo>();

  const documentInfo = (document: ObjectElement, uri: string): DocumentInfo => {
    let info = documents.get(document);
    if (info === undefined) {
      info = {
        uri,
        index: buildIdentifierIndex(document, uri, indexedSchemaPointers(document)),
        ignoresRefSiblings: ignoresRefSiblings(toValue(document.get('$schema'))),
      };
      documents.set(document, info);
    }
    return info;
  };

  return ({ fragment, document, uri, referencedElementType }: FragmentTransformerInput) => {
    const documentURI = url.stripHash(uri);
    if (!isObjectElement(document)) {
      throw new Error(`External reference "${uri}" must point into a JSON or YAML object`);
    }
    if (
      !isObjectElement(fragment) &&
      !(referencedElementType === 'schema' && isBooleanElement(fragment))
    ) {
      throw new Error(`External reference "${uri}" must point to an object`);
    }

    const info = documentInfo(document, documentURI);
    const foreign = isForeignSchemaDocument(document);
    const warnings = createWarnings(uri);
    // the dereference has already evaluated this fragment as a JSON Pointer
    const fragmentPointer = fragmentTokens(url.getHash(uri).slice(1)) ?? [];
    /**
     * Converts a schema when needed. A schema that is not converted still gets its `$ref`s to
     * `$anchor`s and `$id`s rewritten (on a copy, the document is cached by the dereference).
     */
    const processSchema = (schema: Element, tokens: readonly string[]): Element => {
      const baseURI = baseURIAt(document, documentURI, tokens);
      if (foreign || needsDowngrade(schema)) {
        const downgraded = downgradeSchema(schema, warnings, {
          documentURI,
          baseURI,
          index: info.index,
          ignoresRefSiblings: info.ignoresRefSiblings,
        });
        absolutizeRefsInStashes(downgraded, documentURI);
        return downgraded;
      }
      const copy = cloneDeep(schema);
      return rewriteIdentifierRefs(copy, baseURI, documentURI, info.index, warnings)
        ? copy
        : schema;
    };

    let converted: Element;
    if (referencedElementType === 'schema') {
      converted = processSchema(fragment, fragmentPointer);
    } else if (
      referencedElementType !== 'pathItem' &&
      isObjectElement(fragment) &&
      isStringElement(fragment.get('$ref'))
    ) {
      // a Reference Object to another fragment: the dereference follows it
      converted = fragment;
    } else {
      const ElementClass = namespace.getElementClass(referencedElementType);
      converted = ElementClass.refract(fragment);
      findSchemaPositions(converted).forEach((tokens) => {
        const schema = elementAt(converted, tokens)!;
        const processed = processSchema(schema, [...fragmentPointer, ...tokens]);
        if (processed !== schema) replaceAt(converted, tokens, processed);
      });
      markPathItemFieldOrigins(converted, documentURI);
    }
    markFragmentSource(converted, documentURI);

    annotations.push(...warnings.annotations);

    return converted;
  };
};

export default createFragmentTransformer;
