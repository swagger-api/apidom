import { assert } from 'chai';
import { ArrayElement } from '@swagger-api/apidom-core';

import {
  isAsyncApi2Element,
  isAsyncApiVersionElement,
  isChannelItemElement,
  isChannelsElement,
  isComponentsElement,
  isContactElement,
  isIdentifierElement,
  isInfoElement,
  isLicenseElement,
  isParameterElement,
  isReferenceElement,
  isSchemaElement,
  isServerElement,
  isServersElement,
  isServerVariableElement,
  AsyncApi2Element,
  AsyncApiVersionElement,
  ChannelItemElement,
  ChannelsElement,
  ComponentsElement,
  ContactElement,
  IdentifierElement,
  InfoElement,
  LicenseElement,
  ParameterElement,
  ReferenceElement,
  SchemaElement,
  ServerElement,
  ServersElement,
  ServerVariableElement,
} from '../src/index.ts';

describe('predicates', function () {
  context('isAsyncApi2Element', function () {
    context('given AsyncApi2Element instance value', function () {
      specify('should return true', function () {
        const element = new AsyncApi2Element();

        assert.isTrue(isAsyncApi2Element(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class AsyncApi2SubElement extends AsyncApi2Element {}

        assert.isTrue(isAsyncApi2Element(new AsyncApi2SubElement()));
      });
    });

    context('given non AsyncApi2Element instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isAsyncApi2Element(1));
        assert.isFalse(isAsyncApi2Element(null));
        assert.isFalse(isAsyncApi2Element(undefined));
        assert.isFalse(isAsyncApi2Element({}));
        assert.isFalse(isAsyncApi2Element([]));
        assert.isFalse(isAsyncApi2Element('string'));
      });
    });

    specify('should support duck-typing', function () {
      const asyncApi2ElementDuck = {
        _storedElement: 'asyncApi2',
        _content: [],
        classes: new ArrayElement(['api']),
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const asyncApi2ElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isAsyncApi2Element(asyncApi2ElementDuck));
      assert.isFalse(isAsyncApi2Element(asyncApi2ElementSwan));
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

  context('isChannelItemElement', function () {
    context('given ChannelItemElement instance value', function () {
      specify('should return true', function () {
        const element = new ChannelItemElement();

        assert.isTrue(isChannelItemElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ChannelItemSubElement extends ChannelItemElement {}

        assert.isTrue(isChannelItemElement(new ChannelItemSubElement()));
      });
    });

    context('given non ChannelItemElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isChannelItemElement(1));
        assert.isFalse(isChannelItemElement(null));
        assert.isFalse(isChannelItemElement(undefined));
        assert.isFalse(isChannelItemElement({}));
        assert.isFalse(isChannelItemElement([]));
        assert.isFalse(isChannelItemElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const channelItemElementDuck = {
        _storedElement: 'channelItem',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const channelItemElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isChannelItemElement(channelItemElementDuck));
      assert.isFalse(isChannelItemElement(channelItemElementSwan));
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

      const parameterItemElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isParameterElement(parameterElementDuck));
      assert.isFalse(isParameterElement(parameterItemElementSwan));
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
