import {
  MemberElement,
  StringElement,
  isStringElement,
  includesClasses,
  isArrayElement,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

/**
 * Workflows 1.0.0 specification elements.
 */
import InfoElement from '../../elements/Info';
import { getNodeType } from '../../traversal/visitor';

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
 * openapi: 1.0.0
 * info:
 * ```
 * Refracting result without this plugin:
 *
 *  (WorkflowsSpecificationElement
 *    (MemberElement
 *      (StringElement)
 *      (WorkflowsSpecElement))
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *
 * Refracting result with this plugin:
 *
 *  (WorkflowsSpecificationElement
 *    (MemberElement
 *      (StringElement)
 *      (WorkflowsSpecElement))
 *    (MemberElement
 *      (StringElement)
 *      (InfoElement))
 */

const isEmptyElement = (element: any) =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema = {
  // concrete types handling (CTs)
  WorkflowsSpecificationElement: {
    info(...args: any[]) {
      return new InfoElement(...args);
    },
  },
};

const findElementFactory = (ancestor: any, keyName: string) => {
  const elementType = getNodeType(ancestor); // @ts-ignore
  const keyMapping = schema[elementType] || schema[toValue(ancestor.classes.first)];

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
        const ancestor = ancestors[ancestors.length - 1]; // @TODO(vladimir.gorej@gmail.com): can be replaced by Array.prototype.at in future
        const elementFactory = findElementFactory(ancestor, toValue(element.key));

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        const originalValue = element.value as StringElement;

        return new MemberElement(
          element.key,
          elementFactory.call(
            { context: ancestor },
            undefined,
            cloneDeep(originalValue.meta),
            cloneDeep(originalValue.attributes),
          ),
          cloneDeep(element.meta),
          cloneDeep(element.attributes),
        );
      },

      StringElement(element: StringElement, ...rest: any) {
        if (!isEmptyElement(element)) return undefined;

        const [, , , ancestors] = rest;
        const ancestor = ancestors[ancestors.length - 1]; // @TODO(vladimir.gorej@gmail.com): can be replaced by Array.prototype.at in future

        // we're only interested in empty elements in ArrayElements
        if (!isArrayElement(ancestor)) return undefined;

        const elementFactory = findElementFactory(ancestor, '<*>');

        // no element factory found
        if (typeof elementFactory === 'undefined') return undefined;

        return elementFactory.call(
          { context: element },
          undefined,
          cloneDeep(element.meta),
          cloneDeep(element.attributes),
        );
      },
    },
  };
};

export default plugin;
