import { assert } from 'chai';
import {
  Element,
  StringElement,
  ArrayElement,
  ObjectElement,
  NumberElement,
  NullElement,
  BooleanElement,
  MemberElement,
  LinkElement,
  RefElement,
} from 'minim';

import {
  isElement,
  isStringElement,
  isNumberElement,
  isNullElement,
  isBooleanElement,
  isArrayElement,
  isObjectElement,
  isMemberElement,
  isLinkElement,
  isRefElement,
  isSourceMapElement,
  hasElementSourceMap,
  SourceMapElement,
} from '../../src';

describe('predicates', function () {
  context('isElement', function () {
    context('given Element instance value', function () {
      specify('should return true', function () {
        const element = new Element();

        assert.isTrue(isElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        assert.isTrue(isElement(new StringElement()));
        assert.isTrue(isElement(new ArrayElement()));
        assert.isTrue(isElement(new ObjectElement()));
      });
    });

    context('given non Element instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isElement(1));
        assert.isFalse(isElement(null));
        assert.isFalse(isElement(undefined));
        assert.isFalse(isElement({}));
        assert.isFalse(isElement([]));
        assert.isFalse(isElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const elementDuck = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return undefined;
        },
      };
      const elementSwan = {};

      assert.isTrue(isElement(elementDuck));
      assert.isFalse(isElement(elementSwan));
    });
  });

  context('isStringElement', function () {
    context('given StringElement instance value', function () {
      specify('should return true', function () {
        const element = new StringElement();

        assert.isTrue(isStringElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class StringSubElement extends StringElement {}

        assert.isTrue(isStringElement(new StringSubElement()));
      });
    });

    context('given non StringElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isStringElement(1));
        assert.isFalse(isStringElement(null));
        assert.isFalse(isStringElement(undefined));
        assert.isFalse(isStringElement({}));
        assert.isFalse(isStringElement([]));
        assert.isFalse(isStringElement('string'));

        assert.isFalse(isStringElement(new ArrayElement()));
        assert.isFalse(isStringElement(new ObjectElement()));
      });
    });

    specify('should support duck-typing', function () {
      const stringElementDuck = {
        _storedElement: 'string',
        _content: undefined,
        primitive() {
          return 'string';
        },
        get element() {
          return this._storedElement;
        },
      };

      const stringElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isStringElement(stringElementDuck));
      assert.isFalse(isStringElement(stringElementSwan));
    });
  });

  context('isNumberElement', function () {
    context('given NumberElement instance value', function () {
      specify('should return true', function () {
        const element = new NumberElement();

        assert.isTrue(isNumberElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class NumberSubElement extends NumberElement {}

        assert.isTrue(isNumberElement(new NumberSubElement()));
      });
    });

    context('given non NumberElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isNumberElement(1));
        assert.isFalse(isNumberElement(null));
        assert.isFalse(isNumberElement(undefined));
        assert.isFalse(isNumberElement({}));
        assert.isFalse(isNumberElement([]));
        assert.isFalse(isNumberElement('string'));

        assert.isFalse(isNumberElement(new ArrayElement()));
        assert.isFalse(isNumberElement(new ObjectElement()));
      });
    });

    specify('should support duck-typing', function () {
      const numberElementDuck = {
        _storedElement: 'number',
        _content: undefined,
        primitive() {
          return 'number';
        },
        get element() {
          return this._storedElement;
        },
      };

      const numberElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isNumberElement(numberElementDuck));
      assert.isFalse(isNumberElement(numberElementSwan));
    });
  });

  context('isNullElement', function () {
    context('given NullElement instance value', function () {
      specify('should return true', function () {
        const element = new NullElement();

        assert.isTrue(isNullElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class NullSubElement extends NullElement {}

        assert.isTrue(isNullElement(new NullSubElement()));
      });
    });

    context('given non NullElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isNullElement(1));
        assert.isFalse(isNullElement(null));
        assert.isFalse(isNullElement(undefined));
        assert.isFalse(isNullElement({}));
        assert.isFalse(isNullElement([]));
        assert.isFalse(isNullElement('string'));

        assert.isFalse(isNullElement(new ArrayElement()));
        assert.isFalse(isNullElement(new ObjectElement()));
      });
    });

    specify('should support duck-typing', function () {
      const nullElementDuck = {
        _storedElement: 'null',
        _content: undefined,
        primitive() {
          return 'null';
        },
        get element() {
          return this._storedElement;
        },
      };

      const nullElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isNullElement(nullElementDuck));
      assert.isFalse(isNullElement(nullElementSwan));
    });
  });

  context('isBooleanElement', function () {
    context('given BooleanElement instance value', function () {
      specify('should return true', function () {
        const element = new BooleanElement();

        assert.isTrue(isBooleanElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class BooleanSubElement extends BooleanElement {}

        assert.isTrue(isBooleanElement(new BooleanSubElement()));
      });
    });

    context('given non BooleanElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isBooleanElement(1));
        assert.isFalse(isBooleanElement(null));
        assert.isFalse(isBooleanElement(undefined));
        assert.isFalse(isBooleanElement({}));
        assert.isFalse(isBooleanElement([]));
        assert.isFalse(isBooleanElement('string'));

        assert.isFalse(isBooleanElement(new ArrayElement()));
        assert.isFalse(isBooleanElement(new ObjectElement()));
      });
    });

    specify('should support duck-typing', function () {
      const booleanElementDuck = {
        _storedElement: 'boolean',
        _content: undefined,
        primitive() {
          return 'boolean';
        },
        get element() {
          return this._storedElement;
        },
      };

      const booleanElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isBooleanElement(booleanElementDuck));
      assert.isFalse(isBooleanElement(booleanElementSwan));
    });
  });

  context('isArrayElement', function () {
    context('given ArrayElement instance value', function () {
      specify('should return true', function () {
        const element = new ArrayElement();

        assert.isTrue(isArrayElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        assert.isTrue(isArrayElement(new ObjectElement()));
      });
    });

    context('given non ArrayElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isArrayElement(1));
        assert.isFalse(isArrayElement(null));
        assert.isFalse(isArrayElement(undefined));
        assert.isFalse(isArrayElement({}));
        assert.isFalse(isArrayElement([]));
        assert.isFalse(isArrayElement('string'));

        assert.isFalse(isArrayElement(new StringElement()));
        assert.isFalse(isArrayElement(new BooleanElement()));
      });
    });

    specify('should support duck-typing', function () {
      const arrayElementDuck = {
        _storedElement: 'array',
        _content: [],
        primitive() {
          return 'array';
        },
        push() {},
        unshift() {},
        map() {},
        reduce() {},
        get element() {
          return this._storedElement;
        },
      };

      const arrayElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isArrayElement(arrayElementDuck));
      assert.isFalse(isArrayElement(arrayElementSwan));
    });
  });

  context('isObjectElement', function () {
    context('given ObjectElement instance value', function () {
      specify('should return true', function () {
        const element = new ObjectElement();

        assert.isTrue(isObjectElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ObjectSubElement extends ObjectElement {}

        assert.isTrue(isObjectElement(new ObjectSubElement()));
      });
    });

    context('given non ObjectElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isObjectElement(1));
        assert.isFalse(isObjectElement(null));
        assert.isFalse(isObjectElement(undefined));
        assert.isFalse(isObjectElement({}));
        assert.isFalse(isObjectElement([]));
        assert.isFalse(isObjectElement('string'));

        assert.isFalse(isObjectElement(new StringElement()));
        assert.isFalse(isObjectElement(new BooleanElement()));
      });
    });

    specify('should support duck-typing', function () {
      const objectElementDuck = {
        _storedElement: 'object',
        _content: [],
        primitive() {
          return 'object';
        },
        keys() {},
        values() {},
        items() {},
        get element() {
          return this._storedElement;
        },
      };

      const objectElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isObjectElement(objectElementDuck));
      assert.isFalse(isObjectElement(objectElementSwan));
    });
  });

  context('isMemberElement', function () {
    context('given MemberElement instance value', function () {
      specify('should return true', function () {
        const element = new MemberElement();

        assert.isTrue(isMemberElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class MemberSubElement extends MemberElement {}

        assert.isTrue(isMemberElement(new MemberSubElement()));
      });
    });

    context('given non MemberElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isMemberElement(1));
        assert.isFalse(isMemberElement(null));
        assert.isFalse(isMemberElement(undefined));
        assert.isFalse(isMemberElement({}));
        assert.isFalse(isMemberElement([]));
        assert.isFalse(isMemberElement('string'));

        assert.isFalse(isMemberElement(new StringElement()));
        assert.isFalse(isMemberElement(new BooleanElement()));
      });
    });

    specify('should support duck-typing', function () {
      const memberElementDuck = {
        _storedElement: 'member',
        _content: {},
        primitive() {
          return undefined;
        },
        get element() {
          return this._storedElement;
        },
      };

      const memberElementSwan = {
        _storedElement: 'member',
        _content: {},
        primitive() {
          return undefined;
        },
      };

      assert.isTrue(isMemberElement(memberElementDuck));
      assert.isFalse(isMemberElement(memberElementSwan));
    });
  });

  context('isLinkElement', function () {
    context('given LinkElement instance value', function () {
      specify('should return true', function () {
        const element = new LinkElement();

        assert.isTrue(isLinkElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class LinkSubElement extends LinkElement {}

        assert.isTrue(isLinkElement(new LinkSubElement()));
      });
    });

    context('given non LinkElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isLinkElement(1));
        assert.isFalse(isLinkElement(null));
        assert.isFalse(isLinkElement(undefined));
        assert.isFalse(isLinkElement({}));
        assert.isFalse(isLinkElement([]));
        assert.isFalse(isLinkElement('string'));

        assert.isFalse(isLinkElement(new StringElement()));
        assert.isFalse(isLinkElement(new BooleanElement()));
      });
    });

    specify('should support duck-typing', function () {
      const linkElementDuck = {
        _storedElement: 'link',
        _content: [],
        primitive() {
          return undefined;
        },
        get element() {
          return this._storedElement;
        },
      };

      const linkElementSwan = {
        _storedElement: 'link',
        _content: [],
        primitive() {
          return undefined;
        },
      };

      assert.isTrue(isLinkElement(linkElementDuck));
      assert.isFalse(isLinkElement(linkElementSwan));
    });
  });

  context('isRefElement', function () {
    context('given RefElement instance value', function () {
      specify('should return true', function () {
        const element = new RefElement();

        assert.isTrue(isRefElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class RefSubElement extends RefElement {}

        assert.isTrue(isRefElement(new RefSubElement()));
      });
    });

    context('given non RefElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isRefElement(1));
        assert.isFalse(isRefElement(null));
        assert.isFalse(isRefElement(undefined));
        assert.isFalse(isRefElement({}));
        assert.isFalse(isRefElement([]));
        assert.isFalse(isRefElement('string'));

        assert.isFalse(isRefElement(new StringElement()));
        assert.isFalse(isRefElement(new BooleanElement()));
      });
    });

    specify('should support duck-typing', function () {
      const refElementDuck = {
        _storedElement: 'ref',
        _content: [],
        primitive() {
          return undefined;
        },
        get element() {
          return this._storedElement;
        },
      };

      const refElementSwan = {
        _storedElement: 'ref',
        _content: [],
        primitive() {
          return undefined;
        },
      };

      assert.isTrue(isRefElement(refElementDuck));
      assert.isFalse(isRefElement(refElementSwan));
    });
  });

  context('isSourceMapElement', function () {
    context('given SourceMapElement instance value', function () {
      specify('should return true', function () {
        const element = new SourceMapElement();

        assert.isTrue(isSourceMapElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class SourceMapSubElement extends SourceMapElement {}

        assert.isTrue(isSourceMapElement(new SourceMapSubElement()));
      });
    });

    context('given non SourceMapSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSourceMapElement(1));
        assert.isFalse(isSourceMapElement(null));
        assert.isFalse(isSourceMapElement(undefined));
        assert.isFalse(isSourceMapElement({}));
        assert.isFalse(isSourceMapElement([]));
        assert.isFalse(isSourceMapElement('string'));

        assert.isFalse(isSourceMapElement(new StringElement()));
        assert.isFalse(isSourceMapElement(new BooleanElement()));
      });
    });

    specify('should support duck-typing', function () {
      const sourceMapElementDuck = {
        _storedElement: 'sourceMap',
        _content: [],
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const sourceMapElementSwan = {
        _storedElement: 'sourceMap',
        _content: [],
        primitive() {
          return undefined;
        },
      };

      assert.isTrue(isSourceMapElement(sourceMapElementDuck));
      assert.isFalse(isSourceMapElement(sourceMapElementSwan));
    });
  });

  context('hasSourceMapElement', function () {
    context('given element has sourcemap', function () {
      specify('should return true', function () {
        const element = new ObjectElement({ prop: 'val' });
        const sourceMap = new SourceMapElement();
        element.setMetaProperty('sourceMap', sourceMap);

        assert.isTrue(hasElementSourceMap(element));
      });

      context('and sourcemap is not SourceMapElement', function () {
        specify('should return false', function () {
          const element = new ObjectElement({ prop: 'val' });
          element.setMetaProperty('sourceMap', null);

          assert.isFalse(hasElementSourceMap(element));
        });
      });
    });

    context("given element hasn't sourcemap", function () {
      const element = new ObjectElement({ prop: 'val' });

      specify('should return false', function () {
        assert.isFalse(hasElementSourceMap(element));
      });
    });
  });
});
