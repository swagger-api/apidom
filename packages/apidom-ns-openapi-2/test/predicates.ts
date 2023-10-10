import { assert } from 'chai';

import {
  InfoElement,
  LicenseElement,
  ContactElement,
  ExternalDocumentationElement,
  ItemsElement,
  ExampleElement,
  HeaderElement,
  TagElement,
  XmlElement,
  SecurityDefinitionsElement,
  SecuritySchemeElement,
  ScopesElement,
  SecurityRequirementElement,
  isInfoElement,
  isLicenseElement,
  isContactElement,
  isExternalDocumentationElement,
  isItemsElement,
  isExampleElement,
  isHeaderElement,
  isTagElement,
  isXmlElement,
  isSecurityDefinitionsElement,
  isSecuritySchemeElement,
  isScopesElement,
  isSecurityRequirementElement,
} from '../src';

describe('predicates', function () {
  context('isInfoElement', function () {
    context('given InfoElement instance value', function () {
      specify('should return true', function () {
        const element = new InfoElement();

        assert.isTrue(isInfoElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class InfoSubElement extends InfoElement {}

        assert.isTrue(isInfoElement(new InfoSubElement()));
      });
    });

    context('given non InfoSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isInfoElement(1));
        assert.isFalse(isInfoElement(null));
        assert.isFalse(isInfoElement(undefined));
        assert.isFalse(isInfoElement({}));
        assert.isFalse(isInfoElement([]));
        assert.isFalse(isInfoElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const infoElementDuck = {
        _storedElement: 'info',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const infoElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isInfoElement(infoElementDuck));
      assert.isFalse(isInfoElement(infoElementSwan));
    });
  });

  context('isLicenseElement', function () {
    context('given LicenseElement instance value', function () {
      specify('should return true', function () {
        const element = new LicenseElement();

        assert.isTrue(isLicenseElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class LicenseSubElement extends LicenseElement {}

        assert.isTrue(isLicenseElement(new LicenseSubElement()));
      });
    });

    context('given non LicenseSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isLicenseElement(1));
        assert.isFalse(isLicenseElement(null));
        assert.isFalse(isLicenseElement(undefined));
        assert.isFalse(isLicenseElement({}));
        assert.isFalse(isLicenseElement([]));
        assert.isFalse(isLicenseElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const licenseElementDuck = {
        _storedElement: 'license',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const licenseElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isLicenseElement(licenseElementDuck));
      assert.isFalse(isLicenseElement(licenseElementSwan));
    });
  });

  context('isContactElement', function () {
    context('given ContactElement instance value', function () {
      specify('should return true', function () {
        const element = new ContactElement();

        assert.isTrue(isContactElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class ContactSubElement extends ContactElement {}

        assert.isTrue(isContactElement(new ContactSubElement()));
      });
    });

    context('given non ContactSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isContactElement(1));
        assert.isFalse(isContactElement(null));
        assert.isFalse(isContactElement(undefined));
        assert.isFalse(isContactElement({}));
        assert.isFalse(isContactElement([]));
        assert.isFalse(isContactElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const contactElementDuck = {
        _storedElement: 'contact',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const contactElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isContactElement(contactElementDuck));
      assert.isFalse(isContactElement(contactElementSwan));
    });
  });

  context('isExternalDocumentationElement', function () {
    context('given ExternalDocumentationElement instance value', function () {
      specify('should return true', function () {
        const element = new ExternalDocumentationElement();

        assert.isTrue(isExternalDocumentationElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class ExternalDocumentationSubElement extends ExternalDocumentationElement {}

        assert.isTrue(isExternalDocumentationElement(new ExternalDocumentationSubElement()));
      });
    });

    context('given non ExternalDocumentationSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isExternalDocumentationElement(1));
        assert.isFalse(isExternalDocumentationElement(null));
        assert.isFalse(isExternalDocumentationElement(undefined));
        assert.isFalse(isExternalDocumentationElement({}));
        assert.isFalse(isExternalDocumentationElement([]));
        assert.isFalse(isExternalDocumentationElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const externalDocumentationElementDuck = {
        _storedElement: 'externalDocumentation',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const externalDocumentationElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isExternalDocumentationElement(externalDocumentationElementDuck));
      assert.isFalse(isExternalDocumentationElement(externalDocumentationElementSwan));
    });
  });

  context('isItemsElement', function () {
    context('given ItemsElement instance value', function () {
      specify('should return true', function () {
        const element = new ItemsElement();

        assert.isTrue(isItemsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class ItemsSubElement extends ItemsElement {}

        assert.isTrue(isItemsElement(new ItemsSubElement()));
      });
    });

    context('given non ItemsSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isItemsElement(1));
        assert.isFalse(isItemsElement(null));
        assert.isFalse(isItemsElement(undefined));
        assert.isFalse(isItemsElement({}));
        assert.isFalse(isItemsElement([]));
        assert.isFalse(isItemsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const itemsElementDuck = {
        _storedElement: 'items',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const itemsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isItemsElement(itemsElementDuck));
      assert.isFalse(isItemsElement(itemsElementSwan));
    });
  });

  context('isExampleElement', function () {
    context('given ExampleElement instance value', function () {
      specify('should return true', function () {
        const element = new ExampleElement();

        assert.isTrue(isExampleElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class ExampleSubElement extends ExampleElement {}

        assert.isTrue(isExampleElement(new ExampleSubElement()));
      });
    });

    context('given non ExampleSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isExampleElement(1));
        assert.isFalse(isExampleElement(null));
        assert.isFalse(isExampleElement(undefined));
        assert.isFalse(isExampleElement({}));
        assert.isFalse(isExampleElement([]));
        assert.isFalse(isExampleElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const exampleElementDuck = {
        _storedElement: 'example',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const exampleElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isExampleElement(exampleElementDuck));
      assert.isFalse(isExampleElement(exampleElementSwan));
    });
  });

  context('isHeaderElement', function () {
    context('given HeaderElement instance value', function () {
      specify('should return true', function () {
        const element = new HeaderElement();

        assert.isTrue(isHeaderElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class HeaderSubElement extends HeaderElement {}

        assert.isTrue(isHeaderElement(new HeaderSubElement()));
      });
    });

    context('given non HeaderSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isHeaderElement(1));
        assert.isFalse(isHeaderElement(null));
        assert.isFalse(isHeaderElement(undefined));
        assert.isFalse(isHeaderElement({}));
        assert.isFalse(isHeaderElement([]));
        assert.isFalse(isHeaderElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const headerElementDuck = {
        _storedElement: 'header',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const headerElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isHeaderElement(headerElementDuck));
      assert.isFalse(isHeaderElement(headerElementSwan));
    });
  });

  context('isTagElement', function () {
    context('given TagElement instance value', function () {
      specify('should return true', function () {
        const element = new TagElement();

        assert.isTrue(isTagElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class TagSubElement extends TagElement {}

        assert.isTrue(isTagElement(new TagSubElement()));
      });
    });

    context('given non TagSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isTagElement(1));
        assert.isFalse(isTagElement(null));
        assert.isFalse(isTagElement(undefined));
        assert.isFalse(isTagElement({}));
        assert.isFalse(isTagElement([]));
        assert.isFalse(isTagElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const tagElementDuck = {
        _storedElement: 'tag',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const tagElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isTagElement(tagElementDuck));
      assert.isFalse(isTagElement(tagElementSwan));
    });
  });

  context('isXmlElement', function () {
    context('given XmlElement instance value', function () {
      specify('should return true', function () {
        const element = new XmlElement();

        assert.isTrue(isXmlElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class XmlSubElement extends XmlElement {}

        assert.isTrue(isXmlElement(new XmlSubElement()));
      });
    });

    context('given non XmlSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isXmlElement(1));
        assert.isFalse(isXmlElement(null));
        assert.isFalse(isXmlElement(undefined));
        assert.isFalse(isXmlElement({}));
        assert.isFalse(isXmlElement([]));
        assert.isFalse(isXmlElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const xmlElementDuck = {
        _storedElement: 'xml',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const xmlElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isXmlElement(xmlElementDuck));
      assert.isFalse(isXmlElement(xmlElementSwan));
    });
  });

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
