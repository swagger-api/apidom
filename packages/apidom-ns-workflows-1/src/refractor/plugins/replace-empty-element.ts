import {
  StringElement,
  isStringElement,
  isArrayElement,
  isElement,
  isMemberElement,
  includesClasses,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

/**
 * Workflows 1.0.0 specification elements.
 */
import InfoElement from '../../elements/Info.ts';
import { getNodeType } from '../../traversal/visitor.ts';

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
 * workflowsSpec: 1.0.0
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

const isEmptyElement = (element: unknown) =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema = {
  // concrete types handling (CTs)
  WorkflowsSpecification1Element: {
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

const plugin = () => () => ({
  visitor: {
    StringElement(element: StringElement, key: any, parent: any, path: any, ancestors: any[]) {
      if (!isEmptyElement(element)) return undefined;

      const lineage = [...ancestors, parent].filter(isElement);
      const parentElement = lineage[lineage.length - 1]; // @TODO(vladimir.gorej@gmail.com): can be replaced by Array.prototype.at in future
      let elementFactory;
      let context;

      if (isArrayElement(parentElement)) {
        context = element;
        elementFactory = findElementFactory(parentElement, '<*>');
      } else if (isMemberElement(parentElement)) {
        context = lineage[lineage.length - 2]; // @TODO(vladimir.gorej@gmail.com): can be replaced by Array.prototype.at in future
        elementFactory = findElementFactory(context, toValue(parentElement.key));
      }

      // no element factory found
      if (typeof elementFactory !== 'function') return undefined;

      return elementFactory.call(
        { context },
        undefined,
        cloneDeep(element.meta),
        cloneDeep(element.attributes),
      );
    },
  },
});

export default plugin;
