import {
  ArrayElement,
  ObjectElement,
  StringElement,
  isStringElement,
  isArrayElement,
  isElement,
  isMemberElement,
  includesClasses,
  cloneDeep,
  toValue,
  assignSourceMap,
} from '@swagger-api/apidom-core';

/**
 * A2A v1 specification elements.
 */
import AgentProviderElement from '../../elements/AgentProvider.ts';
import AgentCapabilitiesElement from '../../elements/AgentCapabilities.ts';
import AgentExtensionElement from '../../elements/AgentExtension.ts';
import AgentInterfaceElement from '../../elements/AgentInterface.ts';
import AgentSkillElement from '../../elements/AgentSkill.ts';
import AgentCardSignatureElement from '../../elements/AgentCardSignature.ts';
import SecurityRequirementElement from '../../elements/SecurityRequirement.ts';
import SecuritySchemeElement from '../../elements/SecurityScheme.ts';
import APIKeySecuritySchemeElement from '../../elements/APIKeySecurityScheme.ts';
import HTTPAuthSecuritySchemeElement from '../../elements/HTTPAuthSecurityScheme.ts';
import MutualTlsSecuritySchemeElement from '../../elements/MutualTlsSecurityScheme.ts';
import OAuth2SecuritySchemeElement from '../../elements/OAuth2SecurityScheme.ts';
import OpenIdConnectSecuritySchemeElement from '../../elements/OpenIdConnectSecurityScheme.ts';
import OAuthFlowsElement from '../../elements/OAuthFlows.ts';
import AuthorizationCodeOAuthFlowElement from '../../elements/AuthorizationCodeOAuthFlow.ts';
import ClientCredentialsOAuthFlowElement from '../../elements/ClientCredentialsOAuthFlow.ts';
import DeviceCodeOAuthFlowElement from '../../elements/DeviceCodeOAuthFlow.ts';
// non-concrete Elements (NCEs)
import SkillsElement from '../../elements/nces/Skills.ts';
import SignaturesElement from '../../elements/nces/Signatures.ts';
import SupportedInterfacesElement from '../../elements/nces/SupportedInterfaces.ts';
import SecurityRequirementsElement from '../../elements/nces/SecurityRequirements.ts';
import ExtensionsElement from '../../elements/nces/Extensions.ts';
import SecuritySchemesElement from '../../elements/nces/SecuritySchemes.ts';
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
 * name: 'agent example'
 * capabilities:
 * ```
 * Refracting result without this plugin:
 *
 *  (A2aAgentCard1Element
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *
 * Refracting result with this plugin:
 *
 *  (A2aAgentCard1Element
 *    (MemberElement
 *      (StringElement)
 *      (StringElement))
 *    (MemberElement
 *      (StringElement)
 *      (AgentCapabilitiesElement))
 */

const isEmptyElement = (element: unknown) =>
  isStringElement(element) && includesClasses(['yaml-e-node', 'yaml-e-scalar'], element);

const schema = {
  // concrete types handling (CTs)
  A2aAgentCard1Element: {
    provider(...args: any[]) {
      return new AgentProviderElement(...args);
    },
    capabilities(...args: any[]) {
      return new AgentCapabilitiesElement(...args);
    },
    defaultInputModes(...args: any[]) {
      return new ArrayElement(...args);
    },
    defaultOutputModes(...args: any[]) {
      return new ArrayElement(...args);
    },
    supportedInterfaces(...args: any[]) {
      return new SupportedInterfacesElement(...args);
    },
    skills(...args: any[]) {
      return new SkillsElement(...args);
    },
    securitySchemes(...args: any[]) {
      return new SecuritySchemesElement(...args);
    },
    securityRequirements(...args: any[]) {
      return new SecurityRequirementsElement(...args);
    },
    signatures(...args: any[]) {
      return new SignaturesElement(...args);
    },
  },
  AgentCapabilitiesElement: {
    extensions(...args: any[]) {
      return new ExtensionsElement(...args);
    },
  },
  AgentExtensionElement: {
    params(...args: any[]) {
      return new ObjectElement(...args);
    },
  },
  AgentSkillElement: {
    tags(...args: any[]) {
      return new ArrayElement(...args);
    },
    examples(...args: any[]) {
      return new ArrayElement(...args);
    },
    inputModes(...args: any[]) {
      return new ArrayElement(...args);
    },
    outputModes(...args: any[]) {
      return new ArrayElement(...args);
    },
    securityRequirements(...args: any[]) {
      return new SecurityRequirementsElement(...args);
    },
  },
  SecuritySchemeElement: {
    apiKeySecurityScheme(...args: any[]) {
      return new APIKeySecuritySchemeElement(...args);
    },
    httpAuthSecurityScheme(...args: any[]) {
      return new HTTPAuthSecuritySchemeElement(...args);
    },
    mtlsSecurityScheme(...args: any[]) {
      return new MutualTlsSecuritySchemeElement(...args);
    },
    oauth2SecurityScheme(...args: any[]) {
      return new OAuth2SecuritySchemeElement(...args);
    },
    openIdConnectSecurityScheme(...args: any[]) {
      return new OpenIdConnectSecuritySchemeElement(...args);
    },
  },
  Oauth2SecuritySchemeElement: {
    flows(...args: any[]) {
      return new OAuthFlowsElement(...args);
    },
  },
  OauthFlowsElement: {
    authorizationCode(...args: any[]) {
      return new AuthorizationCodeOAuthFlowElement(...args);
    },
    clientCredentials(...args: any[]) {
      return new ClientCredentialsOAuthFlowElement(...args);
    },
    deviceCode(...args: any[]) {
      return new DeviceCodeOAuthFlowElement(...args);
    },
  },
  AuthorizationCodeOAuthFlowElement: {
    scopes(...args: any[]) {
      return new ObjectElement(...args);
    },
  },
  ClientCredentialsOAuthFlowElement: {
    scopes(...args: any[]) {
      return new ObjectElement(...args);
    },
  },
  DeviceCodeOAuthFlowElement: {
    scopes(...args: any[]) {
      return new ObjectElement(...args);
    },
  },
  SecurityRequirementElement: {
    schemes(...args: any[]) {
      return new ObjectElement(...args);
    },
  },
  // non-concrete types handling (NCEs)
  [SkillsElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new AgentSkillElement(...args);
    },
  },
  [SignaturesElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new AgentCardSignatureElement(...args);
    },
  },
  [SupportedInterfacesElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new AgentInterfaceElement(...args);
    },
  },
  [SecurityRequirementsElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new SecurityRequirementElement(...args);
    },
  },
  [ExtensionsElement.primaryClass]: {
    '<*>': function asterisk(...args: any[]) {
      return new AgentExtensionElement(...args);
    },
  },
  [SecuritySchemesElement.primaryClass]: {
    '[key: *]': function key(...args: any[]) {
      return new SecuritySchemeElement(...args);
    },
  },
  'security-requirement-schemes': {
    '[key: *]': function key(...args: any[]) {
      return new ArrayElement(...args);
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

/**
 * @public
 */
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

      const result = elementFactory.call(
        { context },
        undefined,
        cloneDeep(element.meta),
        cloneDeep(element.attributes),
      );

      return assignSourceMap(result, element);
    },
  },
});

export default plugin;
