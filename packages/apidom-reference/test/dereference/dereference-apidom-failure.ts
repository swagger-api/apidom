import path from 'node:path';
import {
  toValue,
  traverse,
  Element,
  ObjectElement,
  isObjectElement,
} from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';

import { dereferenceApiDOM, parse, Reference, ReferenceSet } from '../../src';

const isObject = (element: Element): element is ObjectElement => {
  return isObjectElement(element);
};

describe.only('dereferenceApiDOM', function () {
  const fixturePath = path.join(__dirname, 'strategies', 'openapi-3-0', 'ticket-3735', 'fixtures');
  const rootFilePath = path.join(fixturePath, 'root.json');
  // const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

  context('given the spec', function () {
    specify('should dereference an ApiDOM fragment with no errors', async function () {
      const baseURI = 'https://smartbear.com/';

      const refElements: Element[] = [];
      const result = await parse(rootFilePath, {
        parse: { mediaType: mediaTypes.latest('json') },
      });
      const { api } = result;
      const collectRefs = (element: Element) => {
        if (
          toValue(element.getMetaProperty('referenced-element', '')).length > 0 &&
          isObject(element) &&
          element.hasKey('$ref')
        ) {
          refElements.push(element);
        }
      };
      traverse(collectRefs, api!);

      const apiReference = Reference({ uri: baseURI, value: result });
      let fragmentId = 0;
      const refSet = ReferenceSet({ refs: [apiReference] });

      for (const refEl of refElements) {
        // @ts-ignore
        refSet.rootRef = null;
        fragmentId += 1;
        const referenceElementReference = Reference({
          uri: `${baseURI}#reference${fragmentId}`,
          value: refEl,
        });
        refSet.add(referenceElementReference);
        try {
          // eslint-disable-next-line no-await-in-loop
          await dereferenceApiDOM(refEl, {
            resolve: {
              baseURI: `${baseURI}#reference${fragmentId}`,
              external: !toValue((refEl as ObjectElement).get('$ref')).startsWith('#'),
            },
            parse: {
              mediaType: mediaTypes.latest('json'),
            },
            dereference: { refSet },
          });
        } catch (ex) {
          console.log(ex);
        }
      }
    });
  });
});
