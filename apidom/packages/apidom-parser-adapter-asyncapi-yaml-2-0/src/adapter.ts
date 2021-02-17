import { Element, NumberElement, ParseResultElement, createNamespace } from 'apidom';
// @ts-ignore
import { parse as parseYaml } from 'apidom-parser-adapter-yaml-1-2';
import asyncApiNamespace, {
  AsyncApi2_0Element,
  isAsyncApi2_0LikeElement,
} from 'apidom-ns-asyncapi-2-0';

export const mediaTypes = [
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+yaml;version=2.0.0',
];

export const detect = (source: string): boolean =>
  !!source.match(/(["']?)asyncapi\1\s*:\s*(["']?)2\.\d+\.\d+\2/g);

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const parseResultElement = await parseYaml(source, options);
  const results = parseResultElement.findElements(isAsyncApi2_0LikeElement, {
    recursive: false,
  });

  if (results.length > 0) {
    const asyncApiLikeElement = results[0];
    const asyncApiElement = AsyncApi2_0Element.refract(asyncApiLikeElement);
    let index = 0;

    parseResultElement.forEach((element: Element, indexElement: NumberElement) => {
      if (asyncApiElement === element) {
        index = indexElement.toValue();
      }
    });

    parseResultElement.set(index, asyncApiElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(asyncApiNamespace);
