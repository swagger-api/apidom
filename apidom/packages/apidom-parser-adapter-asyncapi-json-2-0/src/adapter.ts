import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace, transclude } from 'apidom';
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
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  let parseResultElement = await parseJson(source, parserOpts);
  const firstResultElement = parseResultElement.result;

  if (isNotUndefined(firstResultElement)) {
    const asyncApiElement = AsyncApi2_0Element.refract(firstResultElement, refractorOpts);
    asyncApiElement.classes.push('result');
    parseResultElement = transclude(firstResultElement, asyncApiElement, parseResultElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(asyncApiNamespace);
