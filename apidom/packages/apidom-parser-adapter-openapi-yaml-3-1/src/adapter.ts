import { isObjectElement, ParseResultElement } from 'apidom';
// @ts-ignore
import { parse as parseYaml } from 'apidom-parser-adapter-yaml-1-2';
import { OpenApi3_1Element } from 'apidom-ns-openapi-3-1';

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
  const parseResultElement = await parseYaml(source, options);

  // refract first element in parse result into OpenApi3_1 element
  if (isObjectElement(parseResultElement.get(0))) {
    const openApiElement = OpenApi3_1Element.refract(parseResultElement.get(0));
    parseResultElement.set(0, openApiElement);
  }

  return parseResultElement;
};
