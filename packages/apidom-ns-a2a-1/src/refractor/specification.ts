import AgentCardVisitor from './visitors/a2a-1/agent-card/index.ts';
import AgentCapabilitiesVisitor from './visitors/a2a-1/agent-capabilities/index.ts';
import AgentExtensionVisitor from './visitors/a2a-1/agent-extension/index.ts';
import AgentProviderVisitor from './visitors/a2a-1/agent-provider/index.ts';
import AgentInterfaceVisitor from './visitors/a2a-1/agent-interface/index.ts';
import AgentSkillVisitor from './visitors/a2a-1/agent-skill/index.ts';
import AgentCardSignatureVisitor from './visitors/a2a-1/agent-card-signature/index.ts';
import SecurityRequirementVisitor from './visitors/a2a-1/security-requirement/index.ts';
import SecuritySchemeVisitor from './visitors/a2a-1/security-scheme/index.ts';
import APIKeySecuritySchemeVisitor from './visitors/a2a-1/api-key-security-scheme/index.ts';
import HTTPAuthSecuritySchemeVisitor from './visitors/a2a-1/http-auth-security-scheme/index.ts';
import MutualTlsSecuritySchemeVisitor from './visitors/a2a-1/mutual-tls-security-scheme/index.ts';
import OAuth2SecuritySchemeVisitor from './visitors/a2a-1/oauth2-security-scheme/index.ts';
import OpenIdConnectSecuritySchemeVisitor from './visitors/a2a-1/open-id-connect-security-scheme/index.ts';
import OAuthFlowsVisitor from './visitors/a2a-1/oauth-flows/index.ts';
import AuthorizationCodeOAuthFlowVisitor from './visitors/a2a-1/authorization-code-oauth-flow/index.ts';
import ClientCredentialsOAuthFlowVisitor from './visitors/a2a-1/client-credentials-oauth-flow/index.ts';
import DeviceCodeOAuthFlowVisitor from './visitors/a2a-1/device-code-oauth-flow/index.ts';
import ImplicitOAuthFlowVisitor from './visitors/a2a-1/implicit-oauth-flow/index.ts';
import PasswordOAuthFlowVisitor from './visitors/a2a-1/password-oauth-flow/index.ts';
import StringListVisitor from './visitors/a2a-1/string-list/index.ts';
import SkillsVisitor from './visitors/a2a-1/SkillsVisitor.ts';
import SignaturesVisitor from './visitors/a2a-1/SignaturesVisitor.ts';
import SupportedInterfacesVisitor from './visitors/a2a-1/SupportedInterfacesVisitor.ts';
import SecurityRequirementsVisitor from './visitors/a2a-1/SecurityRequirementsVisitor.ts';
import ExtensionsVisitor from './visitors/a2a-1/ExtensionsVisitor.ts';
import SecuritySchemesVisitor from './visitors/a2a-1/SecuritySchemesVisitor.ts';
import SecurityRequirementSchemesVisitor from './visitors/a2a-1/SecurityRequirementSchemesVisitor.ts';
import FallbackVisitor from './visitors/FallbackVisitor.ts';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 *
 * @public
 *
 * A2A's JSON encoding allows both camelCase and snake_case property names
 * (a protobuf JSON convention). Snake_case canonicalisation is handled by
 * `refractor/canonicalize.ts`, which runs before refraction — by the time
 * the visitors here see the input, all known snake_case keys have been
 * rewritten to camelCase. The fixed-field map below only needs camelCase
 * entries.
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        AgentCard: {
          $visitor: AgentCardVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            url: { $ref: '#/visitors/value' },
            version: { $ref: '#/visitors/value' },
            iconUrl: { $ref: '#/visitors/value' },
            documentationUrl: { $ref: '#/visitors/value' },
            provider: { $ref: '#/visitors/document/objects/AgentProvider' },
            capabilities: { $ref: '#/visitors/document/objects/AgentCapabilities' },
            defaultInputModes: { $ref: '#/visitors/value' },
            defaultOutputModes: { $ref: '#/visitors/value' },
            supportedInterfaces: SupportedInterfacesVisitor,
            skills: SkillsVisitor,
            securitySchemes: SecuritySchemesVisitor,
            securityRequirements: SecurityRequirementsVisitor,
            signatures: SignaturesVisitor,
          },
        },
        AgentCapabilities: {
          $visitor: AgentCapabilitiesVisitor,
          fixedFields: {
            streaming: { $ref: '#/visitors/value' },
            pushNotifications: { $ref: '#/visitors/value' },
            extendedAgentCard: { $ref: '#/visitors/value' },
            extensions: ExtensionsVisitor,
          },
        },
        AgentExtension: {
          $visitor: AgentExtensionVisitor,
          fixedFields: {
            uri: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            required: { $ref: '#/visitors/value' },
            params: { $ref: '#/visitors/value' },
          },
        },
        AgentProvider: {
          $visitor: AgentProviderVisitor,
          fixedFields: {
            organization: { $ref: '#/visitors/value' },
            url: { $ref: '#/visitors/value' },
          },
        },
        AgentInterface: {
          $visitor: AgentInterfaceVisitor,
          fixedFields: {
            url: { $ref: '#/visitors/value' },
            protocolBinding: { $ref: '#/visitors/value' },
            protocolVersion: { $ref: '#/visitors/value' },
            tenant: { $ref: '#/visitors/value' },
          },
        },
        AgentSkill: {
          $visitor: AgentSkillVisitor,
          fixedFields: {
            id: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            tags: { $ref: '#/visitors/value' },
            examples: { $ref: '#/visitors/value' },
            inputModes: { $ref: '#/visitors/value' },
            outputModes: { $ref: '#/visitors/value' },
            securityRequirements: SecurityRequirementsVisitor,
          },
        },
        AgentCardSignature: {
          $visitor: AgentCardSignatureVisitor,
          fixedFields: {
            protected: { $ref: '#/visitors/value' },
            signature: { $ref: '#/visitors/value' },
            header: { $ref: '#/visitors/value' },
          },
        },
        SecurityRequirement: {
          $visitor: SecurityRequirementVisitor,
          fixedFields: {
            schemes: SecurityRequirementSchemesVisitor,
          },
        },
        SecurityScheme: {
          $visitor: SecuritySchemeVisitor,
          fixedFields: {
            apiKeySecurityScheme: { $ref: '#/visitors/document/objects/APIKeySecurityScheme' },
            httpAuthSecurityScheme: { $ref: '#/visitors/document/objects/HTTPAuthSecurityScheme' },
            mtlsSecurityScheme: { $ref: '#/visitors/document/objects/MutualTlsSecurityScheme' },
            oauth2SecurityScheme: { $ref: '#/visitors/document/objects/OAuth2SecurityScheme' },
            openIdConnectSecurityScheme: {
              $ref: '#/visitors/document/objects/OpenIdConnectSecurityScheme',
            },
          },
        },
        APIKeySecurityScheme: {
          $visitor: APIKeySecuritySchemeVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            name: { $ref: '#/visitors/value' },
            location: { $ref: '#/visitors/value' },
          },
        },
        HTTPAuthSecurityScheme: {
          $visitor: HTTPAuthSecuritySchemeVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            scheme: { $ref: '#/visitors/value' },
            bearerFormat: { $ref: '#/visitors/value' },
          },
        },
        MutualTlsSecurityScheme: {
          $visitor: MutualTlsSecuritySchemeVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
          },
        },
        OAuth2SecurityScheme: {
          $visitor: OAuth2SecuritySchemeVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            flows: { $ref: '#/visitors/document/objects/OAuthFlows' },
            oauth2MetadataUrl: { $ref: '#/visitors/value' },
          },
        },
        OpenIdConnectSecurityScheme: {
          $visitor: OpenIdConnectSecuritySchemeVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            openIdConnectUrl: { $ref: '#/visitors/value' },
          },
        },
        OAuthFlows: {
          $visitor: OAuthFlowsVisitor,
          fixedFields: {
            authorizationCode: {
              $ref: '#/visitors/document/objects/AuthorizationCodeOAuthFlow',
            },
            clientCredentials: {
              $ref: '#/visitors/document/objects/ClientCredentialsOAuthFlow',
            },
            deviceCode: { $ref: '#/visitors/document/objects/DeviceCodeOAuthFlow' },
            implicit: { $ref: '#/visitors/document/objects/ImplicitOAuthFlow' },
            password: { $ref: '#/visitors/document/objects/PasswordOAuthFlow' },
          },
        },
        AuthorizationCodeOAuthFlow: {
          $visitor: AuthorizationCodeOAuthFlowVisitor,
          fixedFields: {
            authorizationUrl: { $ref: '#/visitors/value' },
            tokenUrl: { $ref: '#/visitors/value' },
            refreshUrl: { $ref: '#/visitors/value' },
            pkceRequired: { $ref: '#/visitors/value' },
            scopes: { $ref: '#/visitors/value' },
          },
        },
        ClientCredentialsOAuthFlow: {
          $visitor: ClientCredentialsOAuthFlowVisitor,
          fixedFields: {
            tokenUrl: { $ref: '#/visitors/value' },
            refreshUrl: { $ref: '#/visitors/value' },
            scopes: { $ref: '#/visitors/value' },
          },
        },
        DeviceCodeOAuthFlow: {
          $visitor: DeviceCodeOAuthFlowVisitor,
          fixedFields: {
            deviceAuthorizationUrl: { $ref: '#/visitors/value' },
            tokenUrl: { $ref: '#/visitors/value' },
            refreshUrl: { $ref: '#/visitors/value' },
            scopes: { $ref: '#/visitors/value' },
          },
        },
        ImplicitOAuthFlow: {
          $visitor: ImplicitOAuthFlowVisitor,
          fixedFields: {
            authorizationUrl: { $ref: '#/visitors/value' },
            refreshUrl: { $ref: '#/visitors/value' },
            scopes: { $ref: '#/visitors/value' },
          },
        },
        PasswordOAuthFlow: {
          $visitor: PasswordOAuthFlowVisitor,
          fixedFields: {
            tokenUrl: { $ref: '#/visitors/value' },
            refreshUrl: { $ref: '#/visitors/value' },
            scopes: { $ref: '#/visitors/value' },
          },
        },
        StringList: {
          $visitor: StringListVisitor,
          fixedFields: {
            list: { $ref: '#/visitors/value' },
          },
        },
      },
      // A2A does not support `x-*` specification extensions (every object
      // declares `additionalProperties: false`). No extension visitor block.
    },
  },
} as const;

export default specification;
