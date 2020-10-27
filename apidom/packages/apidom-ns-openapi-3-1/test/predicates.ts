import { assert } from 'chai';
import { ArrayElement } from 'minim';

import {
  isSchemaElement,
  isLicenseElement,
  isInfoElement,
  isContactElement,
  isComponentsElement,
  isOpenapiElement,
  isOpenApiApi3_1Element,
  isServerElement,
  isServerVariableElement,
  isPathsElement,
  isPathItemElement,
  isOperationElement,
  OpenApi3_1Element,
  OpenapiElement,
  SchemaElement,
  ComponentsElement,
  InfoElement,
  LicenseElement,
  ContactElement,
  ServerElement,
  ServerVariableElement,
  PathsElement,
  PathItemElement,
  OperationElement,
} from '../src';

describe('predicates', function () {
  context('isOpenApiApi3_1Element', function () {
    context('given OpenApi3_1Element instance value', function () {
      specify('should return true', function () {
        const element = new OpenApi3_1Element();

        assert.isTrue(isOpenApiApi3_1Element(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class OpenApi3_1SubElement extends OpenApi3_1Element {}

        assert.isTrue(isOpenApiApi3_1Element(new OpenApi3_1SubElement()));
      });
    });

    context('given non OpenApi3_1SubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isOpenApiApi3_1Element(1));
        assert.isFalse(isOpenApiApi3_1Element(null));
        assert.isFalse(isOpenApiApi3_1Element(undefined));
        assert.isFalse(isOpenApiApi3_1Element({}));
        assert.isFalse(isOpenApiApi3_1Element([]));
        assert.isFalse(isOpenApiApi3_1Element('string'));
      });
    });

    specify('should support duck-typing', function () {
      const openApi3_1ElementDuck = {
        element: 'openApi3-1',
        classes: new ArrayElement(['api']),
        content: [],
        primitive() {
          return 'object';
        },
        get openapi() {
          return 'openapi';
        },
        get info() {
          return 'info';
        },
        get servers() {
          return 'servers';
        },
        get components() {
          return 'components';
        },
      };

      const openApi3_1ElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isOpenApiApi3_1Element(openApi3_1ElementDuck));
      assert.isFalse(isOpenApiApi3_1Element(openApi3_1ElementSwan));
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
        element: 'schema',
        content: [],
        primitive() {
          return 'object';
        },
      };

      const schemaElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'openapi',
        content: '',
        primitive() {
          return 'string';
        },
        get length() {
          return 0;
        },
      };

      const openapiElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'components',
        content: [],
        primitive() {
          return 'object';
        },
        get schemas() {
          return 'schemas';
        },
      };

      const componentsElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'info',
        content: [],
        primitive() {
          return 'object';
        },
        get title() {
          return 'title';
        },
        get description() {
          return 'description';
        },
        get summary() {
          return 'summary';
        },
        get termsOfService() {
          return 'termsOfService';
        },
        get version() {
          return 'version';
        },
        get license() {
          return 'license';
        },
        get contact() {
          return 'contact';
        },
      };

      const infoElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'license',
        content: [],
        primitive() {
          return 'object';
        },
        get name() {
          return 'name';
        },
        get identifier() {
          return 'identifier';
        },
        get url() {
          return 'url';
        },
      };

      const licenseElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'contact',
        content: [],
        primitive() {
          return 'object';
        },
        get name() {
          return 'name';
        },
        get url() {
          return 'url';
        },
        get email() {
          return 'email';
        },
      };

      const contactElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'server',
        content: [],
        primitive() {
          return 'object';
        },
        get url() {
          return 'url';
        },
        get description() {
          return 'description';
        },
        get variables() {
          return 'variables';
        },
      };

      const serverElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'serverVariable',
        content: [],
        primitive() {
          return 'object';
        },
        get default() {
          return 'default';
        },
        get description() {
          return 'description';
        },
        get enum() {
          return 'enum';
        },
      };

      const serverVariableElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isServerVariableElement(serverVariableElementDuck));
      assert.isFalse(isServerVariableElement(serverVariableElementSwan));
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
        element: 'paths',
        content: [],
        primitive() {
          return 'object';
        },
      };

      const pathsElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'pathItem',
        content: [],
        primitive() {
          return 'object';
        },
        get $ref() {
          return '$ref';
        },
        get summary() {
          return 'summary';
        },
        get description() {
          return 'description';
        },
        get GET() {
          return 'get';
        },
        get PUT() {
          return 'put';
        },
        get POST() {
          return 'post';
        },
        get DELETE() {
          return 'delete';
        },
        get OPTIONS() {
          return 'options';
        },
        get HEAD() {
          return 'head';
        },
        get PATCH() {
          return 'patch';
        },
        get TRACE() {
          return 'trace';
        },
        get servers() {
          return 'servers';
        },
      };

      const pathItemElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'operation',
        content: [],
        primitive() {
          return 'object';
        },
        get summary() {
          return 'summary';
        },
        get description() {
          return 'description';
        },
        get tags() {
          return 'tags';
        },
        get operationId() {
          return 'operationId';
        },
        get parameters() {
          return 'parameters';
        },
      };

      const operationElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isOperationElement(operationElementDuck));
      assert.isFalse(isOperationElement(operationElementSwan));
    });
  });
});
