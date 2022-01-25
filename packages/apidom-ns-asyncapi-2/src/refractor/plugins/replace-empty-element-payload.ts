import {
  MemberElement,
  StringElement,
  isStringElement,
  includesClasses,
  isArrayElement,
} from '@swagger-api/apidom-core';

import SchemaElement from '../../elements/Schema';
import { getNodeType } from '../../traversal/visitor';

/**
 * This plugin is specific to YAML 1.2 format, which allows defining key-value pairs
 * with empty key, empty value, or both.
 * If the message.payloaa or messageTrait.payload value is not provided in YAML format,
 * this plugin compensates for this missing value with the SchemaElemet element type.
 * It is implemented in own separate plugin as this is somehow an opinionated choice useful for
 * completion "intellisense", as AsyncAPI specification defines `payload` as `any` type,
 * but defaulting to `Schema` object.
 *
 * https://yaml.org/spec/1.2.2/#72-empty-nodes
 *
 * @example
 *
 * ```yaml
 * asyncapi: 2.2.0
 * components:
 *   messages:
 *     foo:
 *       payload:
 * ```
 * Refracting result without this plugin:
 *
 *  (AsyncApi2Element
 *    (MemberElement
 *      (StringElement)
 *      (AsyncApiVersionElement))
 *    (MemberElement
 *      (StringElement)
 *      (ComponentsElement
 *        (MemberElement
 *          (StringElement)
 *          (ObjectElement
 *            (MemberElement
 *              (StringElement)
 *              (MessageElement
 *                (MemberElement
 *                  (StringElement)
 *                  (StringElement)))))))))
 *
 * Refracting result with this plugin:
 *
 *  (AsyncApi2Element
 *    (MemberElement
 *      (StringElement)
 *      (AsyncApiVersionElement))
 *    (MemberElement
 *      (StringElement)
 *      (ComponentsElement
 *        (MemberElement
 *          (StringElement)
 *          (ObjectElement
 *            (MemberElement
 *              (StringElement)
 *              (MessageElement
 *                (MemberElement
 *                  (StringElement)
 *                  (SchemaElement)))))))))
 */

const isEmptyElement = (element: any) =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema = {
  MessageElement: {
    payload: (...args: any[]) => new SchemaElement(...args),
  },
  MessageTraitElement: {
    payload: (...args: any[]) => new SchemaElement(...args),
  },
};

const findElementFactory = (ancestor: any, keyName: string) => {
  const elementType = getNodeType(ancestor); // @ts-ignore
  const keyMapping = schema[elementType] || schema[ancestor.classes.first?.toValue?.()];

  return typeof keyMapping === 'undefined'
    ? undefined
    : Object.prototype.hasOwnProperty.call(keyMapping, '[key: *]')
    ? keyMapping['[key: *]']
    : keyMapping[keyName];
};

const plugin = () => () => {
  return {
    visitor: {
      MemberElement(element: MemberElement, ...rest: any) {
        // no empty Element, continue with next one
        if (!isEmptyElement(element.value)) return undefined;

        const [, , , ancestors] = rest;
        const ancestor = ancestors[ancestors.length - 1]; // @ts-ignore
        const elementFactory = findElementFactory(ancestor, element.key.toValue());

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        const originalValue = element.value as StringElement;

        return new MemberElement(
          element.key,
          elementFactory(undefined, originalValue.meta.clone(), originalValue.attributes.clone()),
          element.meta.clone(),
          element.attributes.clone(),
        );
      },

      StringElement(element: StringElement, ...rest: any) {
        if (!isEmptyElement(element)) return undefined;

        const [, , , ancestors] = rest;
        const ancestor = ancestors[ancestors.length - 1];

        // we're only interested in empty elements in ArrayElements
        if (!isArrayElement(ancestor)) return undefined;

        const elementFactory = findElementFactory(ancestor, '<*>');

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        return elementFactory(undefined, element.meta.clone(), element.attributes.clone());
      },
    },
  };
};

export default plugin;
