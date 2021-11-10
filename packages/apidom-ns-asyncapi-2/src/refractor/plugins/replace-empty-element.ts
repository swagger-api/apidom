import { Element, ObjectElement, isStringElement, includesClasses } from '@swagger-api/apidom-core';

import AsyncApi2Element from '../../elements/AsyncApi2';
import AsyncApiVersionElement from '../../elements/AsyncApiVersion';
import IdentifierElement from '../../elements/Identifier';
import InfoElement from '../../elements/Info';
import ServersElement from '../../elements/Servers';
import DefaultContentTypeElement from '../../elements/DefaultContentType';
import ChannelsElement from '../../elements/Channels';
import ComponentsElement from '../../elements/Components';
import TagsElement from '../../elements/Tags';
import ExternalDocumentationElement from '../../elements/ExternalDocumentation';
import ContactElement from '../../elements/Contact';
import LicenseElement from '../../elements/License';
import ServerElement from '../../elements/Server';
import ChannelItemElement from '../../elements/ChannelItem';

/**
 * This plugin is specific to YAML 1.2 format, which allows defining key-value pairs
 * with empty key, empty value, or both. If the value is not provided in YAML format,
 * this plugin compensates for this missing value with the most appropriate semantic element type.
 *
 * https://yaml.org/spec/1.2.2/#72-empty-nodes
 *
 * @example
 *
 * ```yaml
 * asyncapi: 2.2.0
 * info:
 * ```
 * Refracting result without this plugin:
 *
 *  (AsyncApi2Element
 *    (MemberElement
 *      (StringElement)
 *      (AsyncApiVersionElement))
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *
 * Refracting result with this plugin:
 *
 *  (AsyncApi2Element
 *    (MemberElement
 *      (StringElement)
 *      (AsyncApiVersionElement))
 *    (MemberElement
 *      (StringElement)
 *      (InfoElement))
 */

const isEmptyElement = (element: any) =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema = {
  AsyncApi2Element: {
    asyncapi: () => new AsyncApiVersionElement(),
    identifier: () => new IdentifierElement(),
    info: () => new InfoElement(),
    servers: () => new ServersElement(),
    defaultContentType: () => new DefaultContentTypeElement(),
    channels: () => new ChannelsElement(),
    components: () => new ComponentsElement(),
    tags: () => new TagsElement(),
    externalDocs: () => new ExternalDocumentationElement(),
  },
  InfoElement: {
    contact: () => new ContactElement(),
    license: () => new LicenseElement(),
  },
  ServersElement: {
    '*': () => new ServerElement(),
  },
  ChannelsElement: {
    '*': () => new ChannelItemElement(),
  },
  ComponentsElement: {
    schemas: () => new ObjectElement({}, { classes: ['components-schemas'] }),
    messages: () => new ObjectElement({}, { classes: ['components-messages'] }),
    securitySchemes: () => new ObjectElement({}, { classes: ['components-security-schemes'] }),
    parameters: () => new ObjectElement({}, { classes: ['components-parameters'] }),
    correlationIds: () => new ObjectElement({}, { classes: ['components-correlation-ids'] }),
    operationTraits: () => new ObjectElement({}, { classes: ['components-operation-traits'] }),
    messageTraits: () => new ObjectElement({}, { classes: ['components-message-traits'] }),
    serverBindings: () => new ObjectElement({}, { classes: ['components-server-bindings'] }),
    channelBindings: () => new ObjectElement({}, { classes: ['components-channel-bindings'] }),
    operationBindings: () => new ObjectElement({}, { classes: ['components-operation-bindings'] }),
    messageBindings: () => new ObjectElement({}, { classes: ['components-message-bindings'] }),
  },
};

const replaceEmptyValues = <T extends ObjectElement>(type: string, element: T) => {
  element.forEach((value, key, item) => {
    if (!isEmptyElement(value)) return;

    // @ts-ignore
    const elementFactory = Object.prototype.hasOwnProperty.call(schema[type], '*')
      ? // @ts-ignore
        schema[type]['*']
      : // @ts-ignore
        schema[type][key.toValue()];
    if (typeof elementFactory === 'function') {
      // @ts-ignore
      item.value = elementFactory(); // eslint-disable-line no-param-reassign
    }
  });
};

const replaceEmptyValuesWith = <T extends Element>(
  elementFactory: () => T,
  element: ObjectElement,
) => {
  element.forEach((value, key, item) => {
    if (!isEmptyElement(value)) return;

    // @ts-ignore
    item.value = elementFactory(); // eslint-disable-line no-param-reassign
  });
};

const plugin = () => () => {
  return {
    visitor: {
      AsyncApi2Element(element: AsyncApi2Element) {
        replaceEmptyValues('AsyncApi2Element', element);
      },
      InfoElement(element: InfoElement) {
        replaceEmptyValues('InfoElement', element);
      },
      ServersElement(element: ServersElement) {
        replaceEmptyValues('ServersElement', element);
      },
      ChannelsElement(element: ChannelsElement) {
        replaceEmptyValues('ChannelsElement', element);
      },
      ComponentsElement(element: ComponentsElement) {
        replaceEmptyValues('ComponentsElement', element);
      },
      ObjectElement(element: ObjectElement) {
        if (element.classes.includes('components-schemas')) {
          replaceEmptyValuesWith(schema.ComponentsElement.schemas, element);
        } else if (element.classes.includes('components-messages')) {
          replaceEmptyValuesWith(schema.ComponentsElement.messages, element);
        } else if (element.classes.includes('components-security-schemes')) {
          replaceEmptyValuesWith(schema.ComponentsElement.securitySchemes, element);
        } else if (element.classes.includes('components-parameters')) {
          replaceEmptyValuesWith(schema.ComponentsElement.parameters, element);
        } else if (element.classes.includes('components-correlation-ids')) {
          replaceEmptyValuesWith(schema.ComponentsElement.correlationIds, element);
        } else if (element.classes.includes('components-operation-traits')) {
          replaceEmptyValuesWith(schema.ComponentsElement.operationTraits, element);
        } else if (element.classes.includes('components-message-traits')) {
          replaceEmptyValuesWith(schema.ComponentsElement.messageTraits, element);
        } else if (element.classes.includes('components-server-bindings')) {
          replaceEmptyValuesWith(schema.ComponentsElement.serverBindings, element);
        } else if (element.classes.includes('components-channel-bindings')) {
          replaceEmptyValuesWith(schema.ComponentsElement.channelBindings, element);
        } else if (element.classes.includes('components-operation-bindings')) {
          replaceEmptyValuesWith(schema.ComponentsElement.operationBindings, element);
        } else if (element.classes.includes('components-message-bindings')) {
          replaceEmptyValuesWith(schema.ComponentsElement.messageBindings, element);
        }
      },
    },
  };
};

export default plugin;
