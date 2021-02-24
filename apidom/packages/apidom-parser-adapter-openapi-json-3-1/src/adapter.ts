import { propOr, omit } from 'ramda';
import { ParseResultElement, createNamespace } from 'apidom';
// @ts-ignore
import { parse as parseJson } from 'apidom-parser-adapter-json';
import openApiNamespace, { OpenApi3_1Element, isObjectElement } from 'apidom-ns-openapi-3-1';

export const mediaTypes = [
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+json;version=3.1.0',
];

export const detect = (source: string): boolean =>
  !!source.match(/(["']?)openapi\1\s*:\s*(["']?)3\.\d+\.\d+\2/g);

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseJson(source, parserOpts);

  // refract first element in parse result into OpenApi3_1 element
  if (isObjectElement(parseResultElement.get(0))) {
    const openApiElement = OpenApi3_1Element.refract(parseResultElement.get(0), refractorOpts);
    parseResultElement.set(0, openApiElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(openApiNamespace);
