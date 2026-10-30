import { assert } from 'chai';
import { BooleanElement } from '@swagger-api/apidom-core';

import {
  isJSONSchemaElement,
  isLinkDescriptionElement,
  isBooleanJsonSchemaElement,
  JSONSchemaElement,
  LinkDescriptionElement,
} from '../src/index.ts';

describe('predicates', function () {
  context('isJSONSchemaElement', function () {
    context('given JSONSchemaElement instance value', function () {
      specify('should return true', function () {
        const element = new JSONSchemaElement();

        assert.isTrue(isJSONSchemaElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class JSONSchemaSubElement extends JSONSchemaElement {}

        assert.isTrue(isJSONSchemaElement(new JSONSchemaSubElement()));
      });
    });

    context('given non JSONSchema instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isJSONSchemaElement(1));
        assert.isFalse(isJSONSchemaElement(null));
        assert.isFalse(isJSONSchemaElement(undefined));
        assert.isFalse(isJSONSchemaElement({}));
        assert.isFalse(isJSONSchemaElement([]));
        assert.isFalse(isJSONSchemaElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const jsonSchemaElementDuck = {
        _storedElement: 'JSONSchema202012',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const jsonSchemaElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isJSONSchemaElement(jsonSchemaElementDuck));
      assert.isFalse(isJSONSchemaElement(jsonSchemaElementSwan));
    });
  });

  context('isLinkDescriptionElement', function () {
    context('given LinkDescriptionElement instance value', function () {
      specify('should return true', function () {
        const element = new LinkDescriptionElement();

        assert.isTrue(isLinkDescriptionElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class LinkDescriptionSubElement extends LinkDescriptionElement {}

        assert.isTrue(isLinkDescriptionElement(new LinkDescriptionSubElement()));
      });
    });

    context('given non LinkDescriptionElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isLinkDescriptionElement(1));
        assert.isFalse(isLinkDescriptionElement(null));
        assert.isFalse(isLinkDescriptionElement(undefined));
        assert.isFalse(isLinkDescriptionElement({}));
        assert.isFalse(isLinkDescriptionElement([]));
        assert.isFalse(isLinkDescriptionElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const linkDescriptionElementDuck = {
        _storedElement: 'linkDescription',
        _content: '',
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const linkDescriptionElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isLinkDescriptionElement(linkDescriptionElementDuck));
      assert.isFalse(isLinkDescriptionElement(linkDescriptionElementSwan));
    });
  });

  context('isBooleanJsonSchemaElement', function () {
    context('given BooleanElement with boolean-json-schema class', function () {
      specify('should return true', function () {
        const element = new BooleanElement(true, { classes: ['boolean-json-schema'] });

        assert.isTrue(isBooleanJsonSchemaElement(element));
      });
    });

    context('given refracted Boolean JSON Schema', function () {
      specify('should return true', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          items: false,
          properties: { a: true },
        }) as JSONSchemaElement;

        assert.isTrue(isBooleanJsonSchemaElement(jsonSchemaElement.get('items')));
        assert.isTrue(isBooleanJsonSchemaElement(jsonSchemaElement.properties?.get('a')));
      });
    });

    context('given BooleanElement without boolean-json-schema class', function () {
      specify('should return false', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          uniqueItems: true,
        }) as JSONSchemaElement;

        assert.isFalse(isBooleanJsonSchemaElement(new BooleanElement(true)));
        assert.isFalse(isBooleanJsonSchemaElement(jsonSchemaElement.get('uniqueItems')));
      });
    });

    context('given non BooleanElement value', function () {
      specify('should return false', function () {
        assert.isFalse(isBooleanJsonSchemaElement(1));
        assert.isFalse(isBooleanJsonSchemaElement(null));
        assert.isFalse(isBooleanJsonSchemaElement(undefined));
        assert.isFalse(isBooleanJsonSchemaElement({}));
        assert.isFalse(isBooleanJsonSchemaElement([]));
        assert.isFalse(isBooleanJsonSchemaElement('string'));
        assert.isFalse(isBooleanJsonSchemaElement(true));
        assert.isFalse(isBooleanJsonSchemaElement(new JSONSchemaElement()));
      });
    });
  });
});
