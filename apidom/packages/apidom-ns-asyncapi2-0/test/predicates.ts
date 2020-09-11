import { assert } from 'chai';
import { ArrayElement } from 'minim';

import {
  isSchemaElement,
  isLicenseElement,
  isInfoElement,
  isIdentifierElement,
  isContactElement,
  isComponentsElement,
  isAsycapiElement,
  isAsycApi2_0Element,
  isChannelsElement,
  isChannelItemElement,
  isServersElement,
  isServerElement,
  AsyncApi2_0Element,
  AsyncapiElement,
  SchemaElement,
  IdentifierElement,
  ComponentsElement,
  InfoElement,
  LicenseElement,
  ContactElement,
  ChannelsElement,
  ChannelItemElement,
  ServersElement,
  ServerElement,
} from '../src';

describe('predicates', function () {
  context('isAsyncApi2_0Element', function () {
    context('given AsyncApi2_0Element instance value', function () {
      specify('should return true', function () {
        const element = new AsyncApi2_0Element();

        assert.isTrue(isAsycApi2_0Element(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class AsyncApi2_0SubElement extends AsyncApi2_0Element {}

        assert.isTrue(isAsycApi2_0Element(new AsyncApi2_0SubElement()));
      });
    });

    context('given non AsyncApi2_0Element instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isAsycApi2_0Element(1));
        assert.isFalse(isAsycApi2_0Element(null));
        assert.isFalse(isAsycApi2_0Element(undefined));
        assert.isFalse(isAsycApi2_0Element({}));
        assert.isFalse(isAsycApi2_0Element([]));
        assert.isFalse(isAsycApi2_0Element('string'));
      });
    });

    specify('should support duck-typing', function () {
      const asyncApi2_0ElementDuck = {
        element: 'asyncApi2-0',
        classes: new ArrayElement(['api']),
        content: [],
        primitive() {
          return 'object';
        },
        get asyncapi() {
          return 'asyncapi';
        },
        get info() {
          return 'info';
        },
        get channels() {
          return 'channels';
        },
      };

      const asyncApi2_0ElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isAsycApi2_0Element(asyncApi2_0ElementDuck));
      assert.isFalse(isAsycApi2_0Element(asyncApi2_0ElementSwan));
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
        element: 'identifier',
        content: [],
        primitive() {
          return 'string';
        },
        get length() {
          return 0;
        },
      };

      const identifierElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isIdentifierElement(identifierElementDuck));
      assert.isFalse(isIdentifierElement(identifierElementSwan));
    });
  });

  context('isAsyncapiElement', function () {
    context('given AsyncapiElement instance value', function () {
      specify('should return true', function () {
        const element = new AsyncapiElement();

        assert.isTrue(isAsycapiElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class AsyncapiSubElement extends AsyncapiElement {}

        assert.isTrue(isAsycapiElement(new AsyncapiSubElement()));
      });
    });

    context('given non AsyncapiElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isAsycapiElement(1));
        assert.isFalse(isAsycapiElement(null));
        assert.isFalse(isAsycapiElement(undefined));
        assert.isFalse(isAsycapiElement({}));
        assert.isFalse(isAsycapiElement([]));
        assert.isFalse(isAsycapiElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const asyncapiElementDuck = {
        element: 'asyncapi',
        content: '',
        primitive() {
          return 'string';
        },
        get length() {
          return 0;
        },
      };

      const asyncapiElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isAsycapiElement(asyncapiElementDuck));
      assert.isFalse(isAsycapiElement(asyncapiElementSwan));
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
        element: 'servers',
        content: [],
        primitive() {
          return 'object';
        },
      };

      const serversElementSwan = {
        element: undefined,
        content: undefined,
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
        element: 'server',
        content: [],
        primitive() {
          return 'object';
        },
        get url() {
          return 'url';
        },
        get protocol() {
          return 'protocol';
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
        element: 'channels',
        content: [],
        primitive() {
          return 'object';
        },
      };

      const channelsElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isChannelsElement(channelsElementDuck));
      assert.isFalse(isChannelsElement(channelsElementSwan));
    });
  });

  context('isChannelItemElement', function () {
    context('given ChannelItem instance value', function () {
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

    context('given non ChannelItem instance value', function () {
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
        element: 'channelItem',
        content: [],
        primitive() {
          return 'object';
        },
        get $ref() {
          return '$ref';
        },
        get description() {
          return 'description';
        },
        get subscribe() {
          return 'subscribe';
        },
        get publish() {
          return 'publish';
        },
        get parameters() {
          return 'parameters';
        },
        get bindings() {
          return 'bindings';
        },
      };

      const channelItemElementSwan = {
        element: undefined,
        content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isChannelItemElement(channelItemElementDuck));
      assert.isFalse(isChannelItemElement(channelItemElementSwan));
    });
  });
});
