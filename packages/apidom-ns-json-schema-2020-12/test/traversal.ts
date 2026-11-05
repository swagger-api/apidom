import { assert } from 'chai';
import { visit, toValue, Element } from '@swagger-api/apidom-core';

import { JSONSchemaElement, LinkDescriptionElement, keyMap, getNodeType } from '../src/index.ts';

describe('traversal', function () {
  context('given keyMap and getNodeType', function () {
    specify('should visit every schema and link description', function () {
      const jsonSchemaElement = JSONSchemaElement.refract({
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: 'root',
        properties: {
          a: { $id: 'a', prefixItems: [{ $id: 'a-0' }] },
        },
        $defs: {
          b: { $id: 'b', items: { $id: 'b-items' } },
        },
        links: [{ href: '/c', rel: 'self', targetSchema: { $id: 'c' } }],
      });
      const schemaIds: string[] = [];
      const linkHrefs: string[] = [];
      const visitor = {
        JSONSchema202012Element(element: JSONSchemaElement) {
          schemaIds.push(toValue(element.$id));
        },
        LinkDescriptionElement(element: LinkDescriptionElement) {
          linkHrefs.push(toValue(element.href));
        },
      };

      // @ts-ignore
      visit(jsonSchemaElement, visitor, { keyMap, nodeTypeGetter: getNodeType });

      assert.sameMembers(schemaIds, ['root', 'a', 'a-0', 'b', 'b-items', 'c']);
      assert.deepEqual(linkHrefs, ['/c']);
    });
  });

  context('getNodeType', function () {
    specify('should return node type of JSON Schema 2020-12 element', function () {
      assert.strictEqual(getNodeType(new JSONSchemaElement()), 'JSONSchema202012Element');
    });

    specify('should return undefined for non-element', function () {
      assert.isUndefined(getNodeType({} as unknown as Element));
    });
  });
});
