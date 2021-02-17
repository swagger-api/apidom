import { Element, NumberElement, ParseResultElement } from 'apidom';
// @ts-ignore
import { parse as parseYaml } from 'apidom-parser-adapter-yaml-1-2';
import { OpenApi3_1Element, isOpenApi3_1LikeElement } from 'apidom-ns-openapi-3-1';

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
  const results = parseResultElement.findElements(isOpenApi3_1LikeElement, {
    recursive: false,
  });

  if (results.length > 0) {
    const openApiLikeElement = results[0];
    const openApiElement = OpenApi3_1Element.refract(openApiLikeElement);
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
