import { propOr, omit } from 'ramda';
import { Element, NumberElement, ParseResultElement, createNamespace } from 'apidom';
// @ts-ignore
import { parse as parseYaml } from 'apidom-parser-adapter-yaml-1-2';
import openApiNamespace, { OpenApi3_1Element, isObjectElement } from 'apidom-ns-openapi-3-1';

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
  const refractorOpts = propOr({}, 'refractorOpts');
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseYaml(source, parserOpts);
  const results = parseResultElement.findElements(isObjectElement, {
    recursive: false,
  });

  if (results.length > 0) {
    const openApiLikeElement = results[0];
    const openApiElement = OpenApi3_1Element.refract(openApiLikeElement, refractorOpts);
    let index = 0;

    parseResultElement.forEach((element: Element, indexElement: NumberElement) => {
      if (openApiElement === element) {
        index = indexElement.toValue();
      }
    });

    parseResultElement.set(index, openApiElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(openApiNamespace);
