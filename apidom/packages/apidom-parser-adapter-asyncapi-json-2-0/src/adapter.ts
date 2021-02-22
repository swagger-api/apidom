import { propOr, omit } from 'ramda';
import { isObjectElement, ParseResultElement, createNamespace } from 'apidom';
// @ts-ignore
import { parse as parseJson } from 'apidom-parser-adapter-json';
import asyncApiNamespace, { AsyncApi2_0Element } from 'apidom-ns-asyncapi-2-0';

export const mediaTypes = [
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
];

export const detect = (source: string): boolean =>
  !!source.match(/(["']?)asyncapi\1\s*:\s*(["']?)2\.\d+\.\d+\2/g);

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts = propOr({}, 'refractorOpts');
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseJson(source, parserOpts);

  // refract first element in parse result into OpenApi3_1 element
  if (isObjectElement(parseResultElement.get(0))) {
    const asyncApiElement = AsyncApi2_0Element.refract(parseResultElement.get(0), refractorOpts);
    parseResultElement.set(0, asyncApiElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(asyncApiNamespace);
