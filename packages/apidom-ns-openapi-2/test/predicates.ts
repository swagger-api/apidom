import { assert } from 'chai';

import {
  SecurityDefinitionsElement,
  SecuritySchemeElement,
  ScopesElement,
  SecurityRequirementElement,
  isSecurityDefinitionsElement,
  isSecuritySchemeElement,
  isScopesElement,
  isSecurityRequirementElement,
} from '../src';

describe('predicates', function () {
  context('isSecurityDefinitionsElement', function () {
    context('given SecurityDefinitionsElement instance value', function () {
      specify('should return true', function () {
        const element = new SecurityDefinitionsElement();

        assert.isTrue(isSecurityDefinitionsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class SecurityDefinitionsSubElement extends SecurityDefinitionsElement {}

        assert.isTrue(isSecurityDefinitionsElement(new SecurityDefinitionsSubElement()));
      });
    });

    context('given non SecurityDefinitionsSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSecurityDefinitionsElement(1));
        assert.isFalse(isSecurityDefinitionsElement(null));
        assert.isFalse(isSecurityDefinitionsElement(undefined));
        assert.isFalse(isSecurityDefinitionsElement({}));
        assert.isFalse(isSecurityDefinitionsElement([]));
        assert.isFalse(isSecurityDefinitionsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const securityDefinitionsElementDuck = {
        _storedElement: 'securityDefinitions',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const securityDefinitionsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isSecurityDefinitionsElement(securityDefinitionsElementDuck));
      assert.isFalse(isSecurityDefinitionsElement(securityDefinitionsElementSwan));
    });
  });

  context('isSecuritySchemeElement', function () {
    context('given SecuritySchemeElement instance value', function () {
      specify('should return true', function () {
        const element = new SecuritySchemeElement();

        assert.isTrue(isSecuritySchemeElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class SecuritySchemeSubElement extends SecuritySchemeElement {}

        assert.isTrue(isSecuritySchemeElement(new SecuritySchemeSubElement()));
      });
    });

    context('given non SecuritySchemeSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSecuritySchemeElement(1));
        assert.isFalse(isSecuritySchemeElement(null));
        assert.isFalse(isSecuritySchemeElement(undefined));
        assert.isFalse(isSecuritySchemeElement({}));
        assert.isFalse(isSecuritySchemeElement([]));
        assert.isFalse(isSecuritySchemeElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const securitySchemeElementDuck = {
        _storedElement: 'securityScheme',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const securitySchemeElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isSecuritySchemeElement(securitySchemeElementDuck));
      assert.isFalse(isSecuritySchemeElement(securitySchemeElementSwan));
    });
  });

  context('isScopesElement', function () {
    context('given ScopesElement instance value', function () {
      specify('should return true', function () {
        const element = new ScopesElement();

        assert.isTrue(isScopesElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class ScopesSubElement extends ScopesElement {}

        assert.isTrue(isScopesElement(new ScopesSubElement()));
      });
    });

    context('given non ScopesSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isScopesElement(1));
        assert.isFalse(isScopesElement(null));
        assert.isFalse(isScopesElement(undefined));
        assert.isFalse(isScopesElement({}));
        assert.isFalse(isScopesElement([]));
        assert.isFalse(isScopesElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const scopesElementDuck = {
        _storedElement: 'scopes',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const scopesElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isScopesElement(scopesElementDuck));
      assert.isFalse(isScopesElement(scopesElementSwan));
    });
  });

  context('isSecurityRequirementElement', function () {
    context('given SecurityRequirementElement instance value', function () {
      specify('should return true', function () {
        const element = new SecurityRequirementElement();

        assert.isTrue(isSecurityRequirementElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class SecurityRequirementSubElement extends SecurityRequirementElement {}

        assert.isTrue(isSecurityRequirementElement(new SecurityRequirementSubElement()));
      });
    });

    context('given non SecurityRequirementSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSecurityRequirementElement(1));
        assert.isFalse(isSecurityRequirementElement(null));
        assert.isFalse(isSecurityRequirementElement(undefined));
        assert.isFalse(isSecurityRequirementElement({}));
        assert.isFalse(isSecurityRequirementElement([]));
        assert.isFalse(isSecurityRequirementElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const securityRequirementElementDuck = {
        _storedElement: 'securityRequirement',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const securityRequirementElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isSecurityRequirementElement(securityRequirementElementDuck));
      assert.isFalse(isSecurityRequirementElement(securityRequirementElementSwan));
    });
  });
});
