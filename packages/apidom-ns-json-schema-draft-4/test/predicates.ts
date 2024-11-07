import { assert } from 'chai';

import {
  isJSONSchemaElement,
  isJSONReferenceElement,
  isLinkDescriptionElement,
  isMediaElement,
  JSONSchemaElement,
  JSONReferenceElement,
  LinkDescriptionElement,
  MediaElement,
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
        _storedElement: 'JSONSchemaDraft4',
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

  context('isJSONReferenceElement', function () {
    context('given JSONReferenceElement instance value', function () {
      specify('should return true', function () {
        const element = new JSONReferenceElement();

        assert.isTrue(isJSONReferenceElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class JSONReferenceSubElement extends JSONReferenceElement {}

        assert.isTrue(isJSONReferenceElement(new JSONReferenceSubElement()));
      });
    });

    context('given non JSONReferenceElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isJSONReferenceElement(1));
        assert.isFalse(isJSONReferenceElement(null));
        assert.isFalse(isJSONReferenceElement(undefined));
        assert.isFalse(isJSONReferenceElement({}));
        assert.isFalse(isJSONReferenceElement([]));
        assert.isFalse(isJSONReferenceElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const jsonReferenceElementDuck = {
        _storedElement: 'JSONReference',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const jsonReferenceElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isJSONReferenceElement(jsonReferenceElementDuck));
      assert.isFalse(isJSONReferenceElement(jsonReferenceElementSwan));
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

  context('isMediaElement', function () {
    context('given MediaElement instance value', function () {
      specify('should return true', function () {
        const element = new MediaElement();

        assert.isTrue(isMediaElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class MediaSubElement extends MediaElement {}

        assert.isTrue(isMediaElement(new MediaSubElement()));
      });
    });

    context('given non ComponentsElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isMediaElement(1));
        assert.isFalse(isMediaElement(null));
        assert.isFalse(isMediaElement(undefined));
        assert.isFalse(isMediaElement({}));
        assert.isFalse(isMediaElement([]));
        assert.isFalse(isMediaElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const mediaElementDuck = {
        _storedElement: 'media',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const mediaElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isMediaElement(mediaElementDuck));
      assert.isFalse(isMediaElement(mediaElementSwan));
    });
  });
});
