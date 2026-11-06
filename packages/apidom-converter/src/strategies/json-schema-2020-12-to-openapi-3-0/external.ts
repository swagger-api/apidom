import {
  Element,
  createNamespace,
  isBooleanElement,
  isObjectElement,
  isStringElement,
  toValue,
} from '@swagger-api/apidom-core';
import openApi3_0Namespace from '@swagger-api/apidom-ns-openapi-3-0';
import { url } from '@swagger-api/apidom-reference';

import downgradeSchema, {
  IdentifierIndex,
  baseURIAt,
  buildIdentifierIndex,
  createWarnings,
  needsDowngrade,
} from './downgrade/index.ts';
import { elementAt, forEachElement, replaceAt } from './downgrade/document.ts';
import { fragmentTokens } from './downgrade/refs.ts';
import findSchemaPositions from './schema-positions.ts';
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

const absolutizeRefsInStashes = (element: Element, fileURI: string): void => {
  forEachElement(element, (current, tokens) => {
    if (!isObjectElement(current)) return;
    if (!tokens.some((token) => token.startsWith('x-conversion-'))) return;
    const ref = current.get('$ref');
    if (isStringElement(ref)) current.set('$ref', url.resolve(fileURI, toValue(ref)));
  });
};

/**
 * Input of apidom-reference's OpenAPI 3.0 dereference `fragmentTransformer` option.
 */
interface FragmentTransformerInput {
  readonly fragment: Element;
  readonly document: Element;
  readonly uri: string;
  readonly referencedElementType: string;
}

type FragmentTransformer = (input: FragmentTransformerInput) => Element;

interface DocumentInfo {
  readonly uri: string;
  readonly index: IdentifierIndex;
}

/**
 * Creates the `fragmentTransformer` for apidom-reference's OpenAPI 3.0 dereference: every
 * external fragment is checked, converted to OpenAPI 3.0 and returned for inlining.
 */
const createFragmentTransformer = (annotations: Warnings['annotations']): FragmentTransformer => {
  const documents = new WeakMap<Element, DocumentInfo>();

  const documentInfo = (document: Element, uri: string): DocumentInfo => {
    let info = documents.get(document);
    if (info === undefined) {
      info = { uri, index: buildIdentifierIndex(document, uri) };
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
    const fragmentPointer = fragmentTokens(url.getHash(uri).slice(1));
    const convertSchema = (schema: Element, tokens: readonly string[]) =>
      downgradeSchema(schema, warnings, {
        documentURI,
        baseURI: baseURIAt(document, documentURI, tokens),
        index: info.index,
      });

    let converted: Element;
    if (referencedElementType === 'schema') {
      converted =
        foreign || needsDowngrade(fragment) ? convertSchema(fragment, fragmentPointer) : fragment;
    } else {
      const ElementClass = namespace.getElementClass(referencedElementType);
      converted = ElementClass.refract(fragment);
      findSchemaPositions(converted).forEach((tokens) => {
        const schema = elementAt(converted, tokens)!;
        if (foreign || needsDowngrade(schema)) {
          replaceAt(converted, tokens, convertSchema(schema, [...fragmentPointer, ...tokens]));
        }
      });
    }

    absolutizeRefsInStashes(converted, documentURI);
    annotations.push(...warnings.annotations);

    return converted;
  };
};

export default createFragmentTransformer;
