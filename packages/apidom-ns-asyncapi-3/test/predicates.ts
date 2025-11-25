import { assert } from 'chai';
import { ArrayElement } from '@swagger-api/apidom-core';

import {
  isAsyncApi3Element,
  isAsyncApiVersionElement,
  isChannelElement,
  isChannelBindingsElement,
  isChannelsElement,
  isComponentsElement,
  isContactElement,
  isIdentifierElement,
  isInfoElement,
  isLicenseElement,
  isMultiFormatSchemaElement,
  isOperationElement,
  isParameterElement,
  isParametersElement,
  isReferenceElement,
  isSchemaElement,
  isServerElement,
  isServerBindingsElement,
  isServersElement,
  isServerVariableElement,
  AsyncApi3Element,
  AsyncApiVersionElement,
  ChannelElement,
  ChannelBindingsElement,
  ChannelsElement,
  ComponentsElement,
  ContactElement,
  IdentifierElement,
  InfoElement,
  LicenseElement,
  OperationElement,
  ParameterElement,
  ParametersElement,
  ReferenceElement,
  SchemaElement,
  ServerElement,
  ServerBindingsElement,
  ServersElement,
  ServerVariableElement,
  MultiFormatSchemaElement,
} from '../src/index.ts';

describe('predicates', function () {
  context('isAsyncApi3Element', function () {
    context('given AsyncApi3Element instance value', function () {
      specify('should return true', function () {
        const element = new AsyncApi3Element();

        assert.isTrue(isAsyncApi3Element(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class AsyncApi3SubElement extends AsyncApi3Element {}

        assert.isTrue(isAsyncApi3Element(new AsyncApi3SubElement()));
      });
    });

    context('given non AsyncApi3Element instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isAsyncApi3Element(1));
        assert.isFalse(isAsyncApi3Element(null));
        assert.isFalse(isAsyncApi3Element(undefined));
        assert.isFalse(isAsyncApi3Element({}));
        assert.isFalse(isAsyncApi3Element([]));
        assert.isFalse(isAsyncApi3Element('string'));
      });
    });

    specify('should support duck-typing', function () {
      const asyncApi3ElementDuck = {
        _storedElement: 'asyncApi3',
        _content: [],
        classes: new ArrayElement(['api']),
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const asyncApi3ElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isAsyncApi3Element(asyncApi3ElementDuck));
      assert.isFalse(isAsyncApi3Element(asyncApi3ElementSwan));
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

  context('isMultiFormatSchemaElement', function () {
    context('given MultiFormatSchemaElement instance value', function () {
      specify('should return true', function () {
        const element = new MultiFormatSchemaElement();

        assert.isTrue(isMultiFormatSchemaElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class MultiFormatSchemaSubElement extends MultiFormatSchemaElement {}

        assert.isTrue(isMultiFormatSchemaElement(new MultiFormatSchemaSubElement()));
      });
    });

    context('given non MultiFormatSchemaElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isMultiFormatSchemaElement(1));
        assert.isFalse(isMultiFormatSchemaElement(null));
        assert.isFalse(isMultiFormatSchemaElement(undefined));
        assert.isFalse(isMultiFormatSchemaElement({}));
        assert.isFalse(isMultiFormatSchemaElement([]));
        assert.isFalse(isMultiFormatSchemaElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const schemaElementDuck = {
        _storedElement: 'multiFormatSchema',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const multiFormatSchemaElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isMultiFormatSchemaElement(schemaElementDuck));
      assert.isFalse(isMultiFormatSchemaElement(multiFormatSchemaElementSwan));
    });
  });

  context('isIdentifierElement', function () {
    context('given IdentifierElement instance value', function () {
      specify('should return true', function () {
        const element = new IdentifierElement();

        assert.isTrue(isIdentifierElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class IdentifierSubElement extends IdentifierElement {}

        assert.isTrue(isIdentifierElement(new IdentifierSubElement()));
      });
    });

    context('given non IdentifierElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isIdentifierElement(1));
        assert.isFalse(isIdentifierElement(null));
        assert.isFalse(isIdentifierElement(undefined));
        assert.isFalse(isIdentifierElement({}));
        assert.isFalse(isIdentifierElement([]));
        assert.isFalse(isIdentifierElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const identifierElementDuck = {
        _storedElement: 'identifier',
        _content: [],
        primitive() {
          return 'string';
        },
        get element() {
          return this._storedElement;
        },
      };

      const identifierElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isIdentifierElement(identifierElementDuck));
      assert.isFalse(isIdentifierElement(identifierElementSwan));
    });
  });

  context('isAsyncApiVersionElement', function () {
    context('given AsyncApiVersionElement instance value', function () {
      specify('should return true', function () {
        const element = new AsyncApiVersionElement();

        assert.isTrue(isAsyncApiVersionElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class AsyncApiVersionSubElement extends AsyncApiVersionElement {}

        assert.isTrue(isAsyncApiVersionElement(new AsyncApiVersionSubElement()));
      });
    });

    context('given non AsyncApiVersionElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isAsyncApiVersionElement(1));
        assert.isFalse(isAsyncApiVersionElement(null));
        assert.isFalse(isAsyncApiVersionElement(undefined));
        assert.isFalse(isAsyncApiVersionElement({}));
        assert.isFalse(isAsyncApiVersionElement([]));
        assert.isFalse(isAsyncApiVersionElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const asyncApiVersionElementDuck = {
        _storedElement: 'asyncApiVersion',
        _content: '',
        primitive() {
          return 'string';
        },
        get element() {
          return this._storedElement;
        },
      };

      const asyncapiElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isAsyncApiVersionElement(asyncApiVersionElementDuck));
      assert.isFalse(isAsyncApiVersionElement(asyncapiElementSwan));
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

  context('isServersElement', function () {
    context('given ServersElement instance value', function () {
      specify('should return true', function () {
        const element = new ServersElement();

        assert.isTrue(isServersElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ServersSubElement extends ServersElement {}

        assert.isTrue(isServersElement(new ServersSubElement()));
      });
    });

    context('given non ServersElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isServersElement(1));
        assert.isFalse(isServersElement(null));
        assert.isFalse(isServersElement(undefined));
        assert.isFalse(isServersElement({}));
        assert.isFalse(isServersElement([]));
        assert.isFalse(isServersElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const serversElementDuck = {
        _storedElement: 'servers',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const serversElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isServersElement(serversElementDuck));
      assert.isFalse(isServersElement(serversElementSwan));
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
    context('given ServerVariableElement instance value', function () {
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

  context('isChannelsElement', function () {
    context('given ChannelsElement instance value', function () {
      specify('should return true', function () {
        const element = new ChannelsElement();

        assert.isTrue(isChannelsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ChannelsSubElement extends ChannelsElement {}

        assert.isTrue(isChannelsElement(new ChannelsSubElement()));
      });
    });

    context('given non ChannelsElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isChannelsElement(1));
        assert.isFalse(isChannelsElement(null));
        assert.isFalse(isChannelsElement(undefined));
        assert.isFalse(isChannelsElement({}));
        assert.isFalse(isChannelsElement([]));
        assert.isFalse(isChannelsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const channelsElementDuck = {
        _storedElement: 'channels',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const channelsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isChannelsElement(channelsElementDuck));
      assert.isFalse(isChannelsElement(channelsElementSwan));
    });
  });

  context('isChannelElement', function () {
    context('given ChannelElement instance value', function () {
      specify('should return true', function () {
        const element = new ChannelElement();

        assert.isTrue(isChannelElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ChannelItemSubElement extends ChannelElement {}

        assert.isTrue(isChannelElement(new ChannelItemSubElement()));
      });
    });

    context('given non ChannelElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isChannelElement(1));
        assert.isFalse(isChannelElement(null));
        assert.isFalse(isChannelElement(undefined));
        assert.isFalse(isChannelElement({}));
        assert.isFalse(isChannelElement([]));
        assert.isFalse(isChannelElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const channelElementDuck = {
        _storedElement: 'channel',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const channelElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isChannelElement(channelElementDuck));
      assert.isFalse(isChannelElement(channelElementSwan));
    });
  });

  context('isParameterElement', function () {
    context('given ParameterElement instance value', function () {
      specify('should return true', function () {
        const element = new ParameterElement();

        assert.isTrue(isParameterElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ParameterSubElement extends ParameterElement {}

        assert.isTrue(isParameterElement(new ParameterSubElement()));
      });
    });

    context('given non ParameterElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isParameterElement(1));
        assert.isFalse(isParameterElement(null));
        assert.isFalse(isParameterElement(undefined));
        assert.isFalse(isParameterElement({}));
        assert.isFalse(isParameterElement([]));
        assert.isFalse(isParameterElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const parameterElementDuck = {
        _storedElement: 'parameter',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const parameterElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isParameterElement(parameterElementDuck));
      assert.isFalse(isParameterElement(parameterElementSwan));
    });
  });

  context('isParametersElement', function () {
    context('given ParametersElement instance value', function () {
      specify('should return true', function () {
        const element = new ParametersElement();

        assert.isTrue(isParametersElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ParametersSubElement extends ParametersElement {}

        assert.isTrue(isParametersElement(new ParametersSubElement()));
      });
    });

    context('given non ParametersElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isParametersElement(1));
        assert.isFalse(isParametersElement(null));
        assert.isFalse(isParametersElement(undefined));
        assert.isFalse(isParametersElement({}));
        assert.isFalse(isParametersElement([]));
        assert.isFalse(isParametersElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const parametersElementDuck = {
        _storedElement: 'parameters',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const parametersElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isParametersElement(parametersElementDuck));
      assert.isFalse(isParametersElement(parametersElementSwan));
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

  context('isChannelBindingsElement', function () {
    context('given ChannelBindingsElement instance value', function () {
      specify('should return true', function () {
        const element = new ChannelBindingsElement();

        assert.isTrue(isChannelBindingsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ChannelBindingsSubElement extends ChannelBindingsElement {}

        assert.isTrue(isChannelBindingsElement(new ChannelBindingsSubElement()));
      });
    });

    context('given non ChannelBindingsElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isChannelBindingsElement(1));
        assert.isFalse(isChannelBindingsElement(null));
        assert.isFalse(isChannelBindingsElement(undefined));
        assert.isFalse(isChannelBindingsElement({}));
        assert.isFalse(isChannelBindingsElement([]));
        assert.isFalse(isChannelBindingsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const channelBindingsElementDuck = {
        _storedElement: 'channelBindings',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const channelBindingsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isChannelBindingsElement(channelBindingsElementDuck));
      assert.isFalse(isChannelBindingsElement(channelBindingsElementSwan));
    });
  });

  context('isServerBindingsElement', function () {
    context('given ServerBindingsElement instance value', function () {
      specify('should return true', function () {
        const element = new ServerBindingsElement();

        assert.isTrue(isServerBindingsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ServerBindingsSubElement extends ServerBindingsElement {}

        assert.isTrue(isServerBindingsElement(new ServerBindingsSubElement()));
      });
    });

    context('given non ServerBindingsElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isServerBindingsElement(1));
        assert.isFalse(isServerBindingsElement(null));
        assert.isFalse(isServerBindingsElement(undefined));
        assert.isFalse(isServerBindingsElement({}));
        assert.isFalse(isServerBindingsElement([]));
        assert.isFalse(isServerBindingsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const serverBindingsElementDuck = {
        _storedElement: 'serverBindings',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const serverBindingsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isServerBindingsElement(serverBindingsElementDuck));
      assert.isFalse(isServerBindingsElement(serverBindingsElementSwan));
    });
  });
});
