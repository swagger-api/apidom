import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace, transclude } from 'apidom';
// @ts-ignore
import { parse as parseYaml } from 'apidom-parser-adapter-yaml-1-2';
import openApiNamespace, { OpenApi3_1Element } from 'apidom-ns-openapi-3-1';

export const mediaTypes = [
  'application/vnd.oai.openapi;version=3.1.0',
  'application/vnd.oai.openapi+yaml;version=3.1.0',
];

export const detect = (source: string): boolean =>
  !!source.match(/(["']?)openapi\1\s*:\s*(["']?)3\.\d+\.\d+\2/g);

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  let parseResultElement = await parseYaml(source, parserOpts);
  const firstResultElement = parseResultElement.result;

  if (isNotUndefined(firstResultElement)) {
    const openApiElement = OpenApi3_1Element.refract(firstResultElement, refractorOpts);
    openApiElement.classes.push('result');
    parseResultElement = <
      ParseResultElement // @ts-ignore
    >transclude(firstResultElement, openApiElement, parseResultElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(openApiNamespace);
