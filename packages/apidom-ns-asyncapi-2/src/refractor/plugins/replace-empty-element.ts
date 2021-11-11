import { mergeAll, test } from 'ramda';
import {
  ObjectElement,
  MemberElement,
  isStringElement,
  includesClasses,
} from '@swagger-api/apidom-core';

/**
 * AsyncApi 2.0.0 | 2.1.0 | 2.2.0 specification elements.
 */
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
// non-concrete Elements (NCEs)
import ComponentsSchemasElement from '../../elements/nces/ComponentsSchemas';
import ComponentsMessagesElement from '../../elements/nces/ComponentsMessages';
import ComponentsSecuritySchemesElement from '../../elements/nces/ComponentsSecuritySchemes';
import ComponentsParametersElement from '../../elements/nces/ComponentsParameters';
import ComponentsCorrelationIDsElement from '../../elements/nces/ComponentsCorrelationIDs';
import ComponentsOperationTraitsElement from '../../elements/nces/ComponentsOperationTraits';
import ComponentsMessageTraitsElement from '../../elements/nces/ComponentsMessageTraits';
import ComponentsServerBindingsElement from '../../elements/nces/ComponentsServerBindings';
import ComponentsChannelBindingsElement from '../../elements/nces/ComponentsChannelBindings';
import ComponentsOperationBindingsElement from '../../elements/nces/ComponentsOperationBindings';
import ComponentsMessageBindingsElement from '../../elements/nces/ComponentsMessageBindings';

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
  // concrete types handling (CTs)
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
    schemas: () => new ComponentsSchemasElement(),
    messages: () => new ComponentsMessagesElement(),
    securitySchemes: () => new ComponentsSecuritySchemesElement(),
    parameters: () => new ComponentsParametersElement(),
    correlationIds: () => new ComponentsCorrelationIDsElement(),
    operationTraits: () => new ComponentsOperationTraitsElement(),
    messageTraits: () => new ComponentsMessageTraitsElement(),
    serverBindings: () => new ComponentsServerBindingsElement(),
    channelBindings: () => new ComponentsChannelBindingsElement(),
    operationBindings: () => new ComponentsOperationBindingsElement(),
    messageBindings: () => new ComponentsMessageBindingsElement(),
  },
  // non-concrete types handling (NCEs)
  [ComponentsSchemasElement.primaryClass]: {
    '*': () => new SchemaElement(),
  },
  [ComponentsMessagesElement.primaryClass]: {
    '*': () => new MessageElement(),
  },
  [ComponentsSecuritySchemesElement.primaryClass]: {
    '*': () => new SecuritySchemeElement(),
  },
  [ComponentsParametersElement.primaryClass]: {
    '*': () => new ParameterElement(),
  },
  [ComponentsCorrelationIDsElement.primaryClass]: {
    '*': () => new CorrelationIDElement(),
  },
  [ComponentsOperationTraitsElement.primaryClass]: {
    '*': () => new OperationTraitElement(),
  },
  [ComponentsMessageTraitsElement.primaryClass]: {
    '*': () => new MessageTraitElement(),
  },
  [ComponentsServerBindingsElement.primaryClass]: {
    '*': () => new ServerBindingsElement(),
  },
  [ComponentsChannelBindingsElement.primaryClass]: {
    '*': () => new ChannelBindingsElement(),
  },
  [ComponentsOperationBindingsElement.primaryClass]: {
    '*': () => new OperationBindingsElement(),
  },
  [ComponentsMessageBindingsElement.primaryClass]: {
    '*': () => new MessageBindingsElement(),
  },
};

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

const plugin = () => () => {
  const ceVisitor = Object.keys(schema)
    .filter(test(/^[A-Z]/)) // concrete Elements starts with uppercase letters
    .map((elementType) => ({
      [elementType](element: ObjectElement) {
        return replaceEmptyValues(elementType, element);
      },
    }));
  const nctVisitor = {
    ObjectElement(element: ObjectElement) {
      // skip the chain of following checks
      if (element.classes.length === 0) {
        return undefined;
      }

      if (element.classes.includes(ComponentsSchemasElement.primaryClass)) {
        return replaceEmptyValues(ComponentsSchemasElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsMessagesElement.primaryClass)) {
        return replaceEmptyValues(ComponentsMessagesElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsSecuritySchemesElement.primaryClass)) {
        return replaceEmptyValues(ComponentsSecuritySchemesElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsParametersElement.primaryClass)) {
        return replaceEmptyValues(ComponentsParametersElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsCorrelationIDsElement.primaryClass)) {
        return replaceEmptyValues(ComponentsCorrelationIDsElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsOperationTraitsElement.primaryClass)) {
        return replaceEmptyValues(ComponentsOperationTraitsElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsMessageTraitsElement.primaryClass)) {
        return replaceEmptyValues(ComponentsMessageTraitsElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsServerBindingsElement.primaryClass)) {
        return replaceEmptyValues(ComponentsServerBindingsElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsChannelBindingsElement.primaryClass)) {
        return replaceEmptyValues(ComponentsChannelBindingsElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsOperationBindingsElement.primaryClass)) {
        return replaceEmptyValues(ComponentsOperationBindingsElement.primaryClass, element);
      }
      if (element.classes.includes(ComponentsMessageBindingsElement.primaryClass)) {
        return replaceEmptyValues(ComponentsMessageBindingsElement.primaryClass, element);
      }

      return undefined;
    },
  };

  return {
    visitor: { ...mergeAll(ceVisitor), ...nctVisitor },
  };
};

export default plugin;
