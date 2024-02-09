import { assert } from 'chai';
import { ArrayElement } from '@swagger-api/apidom-core';

import {
  isSchemaElement,
  isLicenseElement,
  isInfoElement,
  isContactElement,
  isComponentsElement,
  isOpenapiElement,
  isOpenApi3_0Element,
  isServerElement,
  isServerVariableElement,
  isSecuritySchemeElement,
  isPathsElement,
  isPathItemElement,
  isOperationElement,
  OpenApi3_0Element,
  OpenapiElement,
  SchemaElement,
  ComponentsElement,
  InfoElement,
  LicenseElement,
  ContactElement,
  ServerElement,
  ServerVariableElement,
  SecuritySchemeElement,
  PathsElement,
  PathItemElement,
  OperationElement,
  ReferenceElement,
  isReferenceElement,
} from '../src';

describe('predicates', function () {
  context('isOpenApiApi3_0Element', function () {
    context('given OpenApi3_0Element instance value', function () {
      specify('should return true', function () {
        const element = new OpenApi3_0Element();

        assert.isTrue(isOpenApi3_0Element(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class OpenApi3_0SubElement extends OpenApi3_0Element {}

        assert.isTrue(isOpenApi3_0Element(new OpenApi3_0SubElement()));
      });
    });

    context('given non OpenApi3_0SubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isOpenApi3_0Element(1));
        assert.isFalse(isOpenApi3_0Element(null));
        assert.isFalse(isOpenApi3_0Element(undefined));
        assert.isFalse(isOpenApi3_0Element({}));
        assert.isFalse(isOpenApi3_0Element([]));
        assert.isFalse(isOpenApi3_0Element('string'));
      });
    });

    specify('should support duck-typing', function () {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const openApi3_0ElementDuck = {
        _storedElement: 'openApi3_0',
        classes: new ArrayElement(['api']),
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const openApi3_0ElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isOpenApi3_0Element(openApi3_0ElementDuck));
      assert.isFalse(isOpenApi3_0Element(openApi3_0ElementSwan));
    });
  });

  context('isSchemaElement', function () {
    context('given SchemaElement instance value', function () {
      specify('should return true', function () {
        const element = new SchemaElement();

        assert.isTrue(isSchemaElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class SchemaSubElement extends SchemaElement {}

        assert.isTrue(isSchemaElement(new SchemaSubElement()));
      });
    });

    context('given non SchemaElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSchemaElement(1));
        assert.isFalse(isSchemaElement(null));
        assert.isFalse(isSchemaElement(undefined));
        assert.isFalse(isSchemaElement({}));
        assert.isFalse(isSchemaElement([]));
        assert.isFalse(isSchemaElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const schemaElementDuck = {
        _storedElement: 'schema',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const schemaElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isSchemaElement(schemaElementDuck));
      assert.isFalse(isSchemaElement(schemaElementSwan));
    });
  });

  context('isOpenapiElement', function () {
    context('given OpenapiElement instance value', function () {
      specify('should return true', function () {
        const element = new OpenapiElement();

        assert.isTrue(isOpenapiElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class OpenapiSubElement extends OpenapiElement {}

        assert.isTrue(isOpenapiElement(new OpenapiSubElement()));
      });
    });

    context('given non OpenapiElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isOpenapiElement(1));
        assert.isFalse(isOpenapiElement(null));
        assert.isFalse(isOpenapiElement(undefined));
        assert.isFalse(isOpenapiElement({}));
        assert.isFalse(isOpenapiElement([]));
        assert.isFalse(isOpenapiElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const openapiElementDuck = {
        _storedElement: 'openapi',
        _content: '',
        primitive() {
          return 'string';
        },
        get element() {
          return this._storedElement;
        },
      };

      const openapiElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isOpenapiElement(openapiElementDuck));
      assert.isFalse(isOpenapiElement(openapiElementSwan));
    });
  });

  context('isComponentsElement', function () {
    context('given ComponentsElement instance value', function () {
      specify('should return true', function () {
        const element = new ComponentsElement();

        assert.isTrue(isComponentsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ComponentsSubElement extends ComponentsElement {}

        assert.isTrue(isComponentsElement(new ComponentsSubElement()));
      });
    });

    context('given non ComponentsElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isComponentsElement(1));
        assert.isFalse(isComponentsElement(null));
        assert.isFalse(isComponentsElement(undefined));
        assert.isFalse(isComponentsElement({}));
        assert.isFalse(isComponentsElement([]));
        assert.isFalse(isComponentsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const componentsElementDuck = {
        _storedElement: 'components',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const componentsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isComponentsElement(componentsElementDuck));
      assert.isFalse(isComponentsElement(componentsElementSwan));
    });
  });

  context('isInfoElement', function () {
    context('given InfoElement instance value', function () {
      specify('should return true', function () {
        const element = new InfoElement();

        assert.isTrue(isInfoElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class InfoSubElement extends InfoElement {}

        assert.isTrue(isInfoElement(new InfoSubElement()));
      });
    });

    context('given non InfoElement instance value', function () {
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
        class LicenseSubElement extends LicenseElement {}

        assert.isTrue(isLicenseElement(new LicenseSubElement()));
      });
    });

    context('given non LicenseElement instance value', function () {
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
        class ContactSubElement extends ContactElement {}

        assert.isTrue(isContactElement(new ContactSubElement()));
      });
    });

    context('given non ContactElement instance value', function () {
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
      const concatElementDuck = {
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
      };

      assert.isTrue(isContactElement(concatElementDuck));
      assert.isFalse(isContactElement(contactElementSwan));
    });
  });

  context('isServerElement', function () {
    context('given ServerElement instance value', function () {
      specify('should return true', function () {
        const element = new ServerElement();

        assert.isTrue(isServerElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ServerSubElement extends ServerElement {}

        assert.isTrue(isServerElement(new ServerSubElement()));
      });
    });

    context('given non ServerElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isServerElement(1));
        assert.isFalse(isServerElement(null));
        assert.isFalse(isServerElement(undefined));
        assert.isFalse(isServerElement({}));
        assert.isFalse(isServerElement([]));
        assert.isFalse(isServerElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const serverElementDuck = {
        _storedElement: 'server',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const serverElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isServerElement(serverElementDuck));
      assert.isFalse(isServerElement(serverElementSwan));
    });
  });

  context('isServerVariableElement', function () {
    context('given ServerVariable instance value', function () {
      specify('should return true', function () {
        const element = new ServerVariableElement();

        assert.isTrue(isServerVariableElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ServerVariableSubElement extends ServerVariableElement {}

        assert.isTrue(isServerVariableElement(new ServerVariableSubElement()));
      });
    });

    context('given non ServerVariableElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isServerVariableElement(1));
        assert.isFalse(isServerVariableElement(null));
        assert.isFalse(isServerVariableElement(undefined));
        assert.isFalse(isServerVariableElement({}));
        assert.isFalse(isServerVariableElement([]));
        assert.isFalse(isServerVariableElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const serverVariableElementDuck = {
        _storedElement: 'serverVariable',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const serverVariableElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isServerVariableElement(serverVariableElementDuck));
      assert.isFalse(isServerVariableElement(serverVariableElementSwan));
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
        class SecuritySchemeSubElement extends SecuritySchemeElement {}

        assert.isTrue(isSecuritySchemeElement(new SecuritySchemeSubElement()));
      });
    });

    context('given non SecuritySchemeElement instance value', function () {
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
      };

      assert.isTrue(isSecuritySchemeElement(securitySchemeElementDuck));
      assert.isFalse(isSecuritySchemeElement(securitySchemeElementSwan));
    });
  });

  context('isPathsElement', function () {
    context('given PathsElement instance value', function () {
      specify('should return true', function () {
        const element = new PathsElement();

        assert.isTrue(isPathsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class PathsSubElement extends PathsElement {}

        assert.isTrue(isPathsElement(new PathsSubElement()));
      });
    });

    context('given non PathsElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isPathsElement(1));
        assert.isFalse(isPathsElement(null));
        assert.isFalse(isPathsElement(undefined));
        assert.isFalse(isPathsElement({}));
        assert.isFalse(isPathsElement([]));
        assert.isFalse(isPathsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const pathsElementDuck = {
        _storedElement: 'paths',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const pathsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isPathsElement(pathsElementDuck));
      assert.isFalse(isPathsElement(pathsElementSwan));
    });
  });

  context('isPathItemElement', function () {
    context('given PathItemElement instance value', function () {
      specify('should return true', function () {
        const element = new PathItemElement();

        assert.isTrue(isPathItemElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class PathItemSubElement extends PathItemElement {}

        assert.isTrue(isPathItemElement(new PathItemSubElement()));
      });
    });

    context('given non PathItemElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isPathItemElement(1));
        assert.isFalse(isPathItemElement(null));
        assert.isFalse(isPathItemElement(undefined));
        assert.isFalse(isPathItemElement({}));
        assert.isFalse(isPathItemElement([]));
        assert.isFalse(isPathItemElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const pathItemElementDuck = {
        _storedElement: 'pathItem',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const pathItemElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isPathItemElement(pathItemElementDuck));
      assert.isFalse(isPathItemElement(pathItemElementSwan));
    });
  });

  context('isOperationElement', function () {
    context('given OperationElement instance value', function () {
      specify('should return true', function () {
        const element = new OperationElement();

        assert.isTrue(isOperationElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class OperationSubElement extends OperationElement {}

        assert.isTrue(isOperationElement(new OperationSubElement()));
      });
    });

    context('given non OperationElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isOperationElement(1));
        assert.isFalse(isOperationElement(null));
        assert.isFalse(isOperationElement(undefined));
        assert.isFalse(isOperationElement({}));
        assert.isFalse(isOperationElement([]));
        assert.isFalse(isOperationElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const operationElementDuck = {
        _storedElement: 'operation',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const operationElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isOperationElement(operationElementDuck));
      assert.isFalse(isOperationElement(operationElementSwan));
    });
  });

  context('isReferenceElement', function () {
    context('given ReferenceElement instance value', function () {
      specify('should return true', function () {
        const element = new ReferenceElement();

        assert.isTrue(isReferenceElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ReferenceSubElement extends ReferenceElement {}

        assert.isTrue(isReferenceElement(new ReferenceSubElement()));
      });
    });

    context('given non ReferenceElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isReferenceElement(1));
        assert.isFalse(isReferenceElement(null));
        assert.isFalse(isReferenceElement(undefined));
        assert.isFalse(isReferenceElement({}));
        assert.isFalse(isReferenceElement([]));
        assert.isFalse(isReferenceElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const referenceElementDuck = {
        _storedElement: 'reference',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const referenceElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isReferenceElement(referenceElementDuck));
      assert.isFalse(isReferenceElement(referenceElementSwan));
    });
  });
});
