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
} from '../src';

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
        element: undefined,
        content: undefined,
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
        element: 'string',
        content: undefined,
        primitive() {
          return 'string';
        },
        get length() {
          return 0;
        },
      };

      const stringElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
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
        element: 'number',
        content: undefined,
        primitive() {
          return 'number';
        },
      };

      const numberElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'null',
        content: undefined,
        primitive() {
          return 'null';
        },
      };

      const nullElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'boolean',
        content: undefined,
        primitive() {
          return 'boolean';
        },
      };

      const booleanElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'array',
        content: [],
        primitive() {
          return 'array';
        },
        push() {},
        unshift() {},
        map() {},
        reduce() {},
      };

      const arrayElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'object',
        content: [],
        primitive() {
          return 'object';
        },
        keys() {},
        values() {},
        items() {},
      };

      const objectElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isObjectElement(objectElementDuck));
      assert.isFalse(isObjectElement(objectElementSwan));
    });
  });

  context('isMemberElement', function () {
    context('given MemberELement instance value', function () {
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
        element: 'member',
        content: {},
        primitive() {
          return undefined;
        },
        get key() {
          return 'key';
        },
        get value() {
          return 'value';
        },
      };

      const memberElementSwan = {
        element: 'member',
        content: {},
        primitive() {
          return undefined;
        },
      };

      assert.isTrue(isMemberElement(memberElementDuck));
      assert.isFalse(isMemberElement(memberElementSwan));
    });
  });
});
