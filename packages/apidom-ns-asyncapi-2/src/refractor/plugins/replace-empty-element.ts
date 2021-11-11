import {
  ObjectElement,
  MemberElement,
  isStringElement,
  includesClasses,
} from '@swagger-api/apidom-core';

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
import SchemaElement from '../../elements/Schema';
import MessageElement from '../../elements/Message';
import SecuritySchemeElement from '../../elements/SecurityScheme';
import ParameterElement from '../../elements/Parameter';
import CorrelationIDElement from '../../elements/CorrelationID';
import OperationTraitElement from '../../elements/OperationTrait';
import MessageTraitElement from '../../elements/MessageTrait';
import ServerBindingsElement from '../../elements/ServerBindings';
import ChannelBindingsElement from '../../elements/ChannelBindings';
import OperationBindingsElement from '../../elements/OperationBindings';
import MessageBindingsElement from '../../elements/MessageBindings';

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
  // concrete types handling
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
  // non concrete types handling - NCT
  'components-schemas': {
    '*': () => new SchemaElement(),
  },
  'components-messages': {
    '*': () => new MessageElement(),
  },
  'components-security-schemes': {
    '*': () => new SecuritySchemeElement(),
  },
  'components-parameters': {
    '*': () => new ParameterElement(),
  },
  'components-correlation-ids': {
    '*': () => new CorrelationIDElement(),
  },
  'components-operation-traits': {
    '*': () => new OperationTraitElement(),
  },
  'components-message-traits': {
    '*': () => new MessageTraitElement(),
  },
  'components-server-bindings': {
    '*': () => new ServerBindingsElement(),
  },
  'components-channel-bindings': {
    '*': () => new ChannelBindingsElement(),
  },
  'components-operation-bindings': {
    '*': () => new OperationBindingsElement(),
  },
  'components-message-bindings': {
    '*': () => new MessageBindingsElement(),
  },
};

const plugin = () => () => {
  const replaceEmptyValues = <T extends ObjectElement>(type: string, element: T) => {
    const members: MemberElement[] = [];
    let hasEmptyElement = false;

    element.forEach((value, key, member) => {
      if (!isEmptyElement(value)) {
        // @ts-ignore
        members.push(member);
        return;
      }

      // @ts-ignore
      const elementFactory = Object.prototype.hasOwnProperty.call(schema[type], '*')
        ? // @ts-ignore
          schema[type]['*']
        : // @ts-ignore
          schema[type][key.toValue()];

      if (typeof elementFactory !== 'function') {
        // @ts-ignore
        members.push(member);
        return;
      }

      const newMember = new MemberElement(
        // @ts-ignore
        member.key,
        elementFactory(),
        member.meta.clone(),
        member.attributes.clone(),
      );

      hasEmptyElement = true;
      members.push(newMember);
    });

    if (hasEmptyElement) {
      // shallow clone of the element
      // @ts-ignore
      return new element.constructor(members, element.meta.clone(), element.attributes.clone());
    }

    return undefined;
  };

  return {
    visitor: {
      AsyncApi2Element(element: AsyncApi2Element) {
        return replaceEmptyValues('AsyncApi2Element', element);
      },
      InfoElement(element: InfoElement) {
        return replaceEmptyValues('InfoElement', element);
      },
      ServersElement(element: ServersElement) {
        return replaceEmptyValues('ServersElement', element);
      },
      ChannelsElement(element: ChannelsElement) {
        return replaceEmptyValues('ChannelsElement', element);
      },
      ComponentsElement(element: ComponentsElement) {
        return replaceEmptyValues('ComponentsElement', element);
      },
      ObjectElement(element: ObjectElement) {
        // skip the chain of following checks
        if (element.classes.length === 0) {
          return undefined;
        }

        if (element.classes.includes('components-schemas')) {
          return replaceEmptyValues('components-schemas', element);
        }
        if (element.classes.includes('components-messages')) {
          return replaceEmptyValues('components-messages', element);
        }
        if (element.classes.includes('components-security-schemes')) {
          return replaceEmptyValues('components-security-schemes', element);
        }
        if (element.classes.includes('components-parameters')) {
          return replaceEmptyValues('components-parameters', element);
        }
        if (element.classes.includes('components-correlation-ids')) {
          return replaceEmptyValues('components-correlation-ids', element);
        }
        if (element.classes.includes('components-operation-traits')) {
          return replaceEmptyValues('components-messages', element);
        }
        if (element.classes.includes('components-message-traits')) {
          return replaceEmptyValues('components-message-traits', element);
        }
        if (element.classes.includes('components-server-bindings')) {
          return replaceEmptyValues('components-server-bindings', element);
        }
        if (element.classes.includes('components-channel-bindings')) {
          return replaceEmptyValues('components-channel-bindings', element);
        }
        if (element.classes.includes('components-operation-bindings')) {
          return replaceEmptyValues('components-operation-bindings', element);
        }
        if (element.classes.includes('components-message-bindings')) {
          return replaceEmptyValues('components-message-bindings', element);
        }

        return undefined;
      },
    },
  };
};

export default plugin;
