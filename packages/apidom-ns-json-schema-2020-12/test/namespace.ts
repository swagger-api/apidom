import { assert } from 'chai';
import { createNamespace, dehydrate, from, toValue } from '@swagger-api/apidom-core';

import jsonSchemaNamespace, {
  JSONSchemaElement,
  LinkDescriptionElement,
  isJSONSchemaElement,
  isLinkDescriptionElement,
} from '../src/index.ts';

describe('namespace', function () {
  const namespace = createNamespace(jsonSchemaNamespace);

  specify('should expose the elements by their PascalCase names', function () {
    const elements = namespace.elements as Record<string, unknown>;

    assert.strictEqual(elements.JSONSchema202012, JSONSchemaElement);
    assert.strictEqual(elements.LinkDescription, LinkDescriptionElement);
  });

  specify('should rehydrate dehydrated elements', function () {
    const jsonSchemaElement = JSONSchemaElement.refract({
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      properties: { a: { type: 'string' } },
      links: [{ href: '/a', rel: 'self' }],
    }) as JSONSchemaElement;
    const rehydrated = from(dehydrate(jsonSchemaElement, namespace), namespace);

    assert.isTrue(isJSONSchemaElement(rehydrated));
    assert.isTrue(isJSONSchemaElement((rehydrated as JSONSchemaElement).properties?.get('a')));
    assert.isTrue(isLinkDescriptionElement((rehydrated as JSONSchemaElement).links?.get(0)));
    assert.deepEqual(toValue(rehydrated), toValue(jsonSchemaElement));
  });
});
