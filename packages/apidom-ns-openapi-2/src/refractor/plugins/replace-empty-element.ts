import {
  MemberElement,
  ArrayElement,
  ObjectElement,
  StringElement,
  isStringElement,
  includesClasses,
  isArrayElement,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';

/**
 * OpenAPI 2.0 specification elements.
 */
import InfoElement from '../../elements/Info';
import ContactElement from '../../elements/Contact';
import LicenseElement from '../../elements/License';
import PathsElement from '../../elements/Paths';
import PathItemElement from '../../elements/PathItem';
import OperationElement from '../../elements/Operation';
import ExternalDocumentationElement from '../../elements/ExternalDocumentation';
import ParameterElement from '../../elements/Parameter';
import ItemsElement from '../../elements/Items';
import ResponsesElement from '../../elements/Responses';
import ResponseElement from '../../elements/Response';
import HeadersElement from '../../elements/Headers';
import ExampleElement from '../../elements/Example';
import HeaderElement from '../../elements/Header';
import TagElement from '../../elements/Tag';
import SchemaElement from '../../elements/Schema';
import XmlElement from '../../elements/Xml';
import DefinitionsElement from '../../elements/Definitions';
import ParametersDefinitionsElement from '../../elements/ParametersDefinitions';
import ResponsesDefinitionsElement from '../../elements/ResponsesDefinitions';
import SecurityDefinitionsElement from '../../elements/SecurityDefinitions';
import SecuritySchemeElement from '../../elements/SecurityScheme';
import ScopesElement from '../../elements/Scopes';
import SecurityRequirementElement from '../../elements/SecurityRequirement';
// non-concrete Elements (NCEs)
import OperationConsumesElement from '../../elements/nces/OperationConsumes';
import OperationParametersElement from '../../elements/nces/OperationParameters';
import OperationProducesElement from '../../elements/nces/OperationProduces';
import OperationSchemesElement from '../../elements/nces/OperationSchemes';
import OperationSecurityElement from '../../elements/nces/OperationSecurity';
import OperationTagsElement from '../../elements/nces/OperationTags';
import PathItemParametersElement from '../../elements/nces/PathItemParameters';
import SwaggerSchemesElement from '../../elements/nces/SwaggerSchemes';
import SwaggerConsumesElement from '../../elements/nces/SwaggerConsumes';
import SwaggerProducesElement from '../../elements/nces/SwaggerProduces';
import SwaggerSecurityElement from '../../elements/nces/SwaggerSecurity';
import SwaggerTagsElement from '../../elements/nces/SwaggerTags';
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
 * swagger: "2.0"
 * info:
 * ```
 * Refracting result without this plugin:
 *
 *  (SwaggerElement
 *    (MemberElement
 *      (StringElement)
 *      (SwaggerVersionElement))
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *
 * Refracting result with this plugin:
 *
 *  (SwaggerElement
 *    (MemberElement
 *      (StringElement)
 *      (SwaggerVersionElement))
 *    (MemberElement
 *      (StringElement)
 *      (InfoElement))
 */

const isEmptyElement = (element: unknown) =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema = {
  // concrete types handling (CTs)
  SwaggerElement: {
    info(...args: any[]) {
      return new InfoElement(...args);
    },
    schemes(...args: any[]) {
      return new SwaggerSchemesElement(...args);
    },
    consumes(...args: any[]) {
      return new SwaggerConsumesElement(...args);
    },
    produces(...args: any[]) {
      return new SwaggerProducesElement(...args);
    },
    paths(...args: any[]) {
      return new PathsElement(...args);
    },
    definitions(...args: any[]) {
      return new DefinitionsElement(...args);
    },
    parameters(...args: any[]) {
      return new ParametersDefinitionsElement(...args);
    },
    responses(...args: any[]) {
      return new ResponsesDefinitionsElement(...args);
    },
    securityDefinitions(...args: any[]) {
      return new SecurityDefinitionsElement(...args);
    },
    security(...args: any[]) {
      return new SwaggerSecurityElement(...args);
    },
    tags(...args: any[]) {
      return new SwaggerTagsElement(...args);
    },
    externalDocs(...args: any[]) {
      return new ExternalDocumentationElement(...args);
    },
  },
  InfoElement: {
    contact(...args: any[]) {
      return new ContactElement(...args);
    },
    license(...args: any[]) {
      return new LicenseElement(...args);
    },
  },
  PathsElement: {
    '[key: *]': function key(...args: any[]) {
      return new PathItemElement(...args);
    },
  },
  PathItemElement: {
    get(...args: any[]) {
      return new OperationElement(...args);
    },
    put(...args: any[]) {
      return new OperationElement(...args);
    },
    post(...args: any[]) {
      return new OperationElement(...args);
    },
    delete(...args: any[]) {
      return new OperationElement(...args);
    },
    options(...args: any[]) {
      return new OperationElement(...args);
    },
    head(...args: any[]) {
      return new OperationElement(...args);
    },
    patch(...args: any[]) {
      return new OperationElement(...args);
    },
    parameters(...args: any[]) {
      return new PathItemParametersElement(...args);
    },
  },
  OperationElement: {
    tags(...args: any[]) {
      return new OperationTagsElement(...args);
    },
    externalDocs(...args: any[]) {
      return new ExternalDocumentationElement(...args);
    },
    consumes(...args: any[]) {
      return new OperationConsumesElement(...args);
    },
    produces(...args: any[]) {
      return new OperationProducesElement(...args);
    },
    parameters(...args: any[]) {
      return new OperationParametersElement(...args);
    },
    responses(...args: any[]) {
      return new ResponsesElement(...args);
    },
    schemes(...args: any[]) {
      return new OperationSchemesElement(...args);
    },
    security(...args: any[]) {
      return new OperationSecurityElement(...args);
    },
  },
  ParameterElement: {
    schema(...args: any[]) {
      return new SchemaElement(...args);
    },
    items(...args: any[]) {
      return new ItemsElement(...args);
    },
  },
  ItemsElement: {
    items(...args: any[]) {
      return new ItemsElement(...args);
    },
  },
  ResponsesElement: {
    '[key: *]': function key(...args: any[]) {
      return new ResponseElement(...args);
    },
  },
  ResponseElement: {
    schema(...args: any[]) {
      return new SchemaElement(...args);
    },
    headers(...args: any[]) {
      return new HeadersElement(...args);
    },
    examples(...args: any[]) {
      return new ExampleElement(...args);
    },
  },
  HeadersElement: {
    '[key: *]': function key(...args: any[]) {
      return new HeaderElement(...args);
    },
  },
  HeaderElement: {
    items(...args: any[]) {
      return new ItemsElement(...args);
    },
  },
  TagElement: {
    externalDocs(...args: any[]) {
      return new ExternalDocumentationElement(...args);
    },
  },
  SchemaElement: {
    items(...args: any[]) {
      return new SchemaElement(...args);
    },
    allOf(...args: any[]) {
      const element = new ArrayElement(...args);
      element.classes.push('json-schema-allOf');
      return element;
    },
    properties(...args: any[]) {
      const element = new ObjectElement(...args);
      element.classes.push('json-schema-properties');
      return element;
    },
    additionalProperties(...args: any[]) {
      return new SchemaElement(...args);
    },
    xml(...args: any[]) {
      return new XmlElement(...args);
    },
    externalDocs(...args: any[]) {
      return new ExternalDocumentationElement(...args);
    },
  },
  DefinitionsElement: {
    '[key: *]': function key(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  ParametersDefinitionsElement: {
    '[key: *]': function key(...args: any[]) {
      return new ParameterElement(...args);
    },
  },
  ResponsesDefinitionsElement: {
    '[key: *]': function key(...args: any[]) {
      return new ResponseElement(...args);
    },
  },
  SecurityDefinitionsElement: {
    '[key: *]': function key(...args: any[]) {
      return new SecuritySchemeElement(...args);
    },
  },
  SecuritySchemeElement: {
    scopes(...args: any[]) {
      return new ScopesElement(...args);
    },
  },
  SecurityRequirementElement: {
    '[key: *]': function key(...args: any[]) {
      return new ArrayElement(...args);
    },
  },
  // non-concrete types handling (NCEs)
  [OperationParametersElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new ParameterElement(...args);
    },
  },
  [OperationSecurityElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new SecurityRequirementElement(...args);
    },
  },
  [PathItemParametersElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new ParameterElement(...args);
    },
  },
  [SwaggerSecurityElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new SecurityRequirementElement(...args);
    },
  },
  [SwaggerTagsElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new TagElement(...args);
    },
  },
  'json-schema-properties': {
    '[key: *]': function key(...args: any[]) {
      return new SchemaElement(...args);
    },
  },
  'json-schema-allOf': {
    '<*>': function asterisk(...args: any[]) {
      return new SchemaElement(...args);
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
        const ancestor = ancestors.at(-1);
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
        const ancestor = ancestors.at(-1);

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
