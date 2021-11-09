import { ObjectElement, isStringElement, includesClasses } from '@swagger-api/apidom-core';

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

/**
 * This plugin is specific to YAML 1.2 format which allows to define key value pairs,
 * with empty key, empty value or both. If value is not provided in YAML format, this plugin
 * compensates for this missing value with the most appropriate semantic element type.
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
    asyncapi: AsyncApiVersionElement,
    identifier: IdentifierElement,
    info: InfoElement,
    servers: ServersElement,
    defaultContentType: DefaultContentTypeElement,
    channels: ChannelsElement,
    components: ComponentsElement,
    tags: TagsElement,
    externalDocs: ExternalDocumentationElement,
  },
  InfoElement: {
    contact: ContactElement,
    license: LicenseElement,
  },
  ServersElement: {
    '*': ServerElement,
  },
};

const replaceEmptyValues = <T extends ObjectElement>(type: string, element: T) => {
  element.forEach((value, key, item) => {
    if (!isEmptyElement(value)) return;

    // @ts-ignore
    const ElementClass = Object.prototype.hasOwnProperty.call(schema[type], '*')
      ? // @ts-ignore
        schema[type]['*']
      : // @ts-ignore
        schema[type][key.toValue()];
    if (typeof ElementClass === 'function') {
      // @ts-ignore
      item.value = new ElementClass(); // eslint-disable-line no-param-reassign
    }
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
    },
  };
};

export default plugin;
