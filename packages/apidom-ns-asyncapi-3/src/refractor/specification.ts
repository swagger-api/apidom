import FallbackVisitor from './visitors/FallbackVisitor.ts';
import AsyncApi3Visitor from './visitors/async-api-3/AsyncApi3Visitor.ts';
import InfoVisitor from './visitors/async-api-3/info/InfoVisitor.ts';
import ChannelsVisitor from './visitors/async-api-3/channels/ChannelsVisitor.ts';
import ComponentsVisitor from './visitors/async-api-3/components/ComponentsVisitor.ts';
import SecuritySchemesVisitor from './visitors/async-api-3/SecuritySchemesVisitor.ts';
import MessageVisitor from './visitors/async-api-3/message/MessageVisitor.ts';
import ServerVisitor from './visitors/async-api-3/server/ServerVisitor.ts';
import ServerVariableVisitor from './visitors/async-api-3/server/ServerVariableVisitor.ts';
import ParametersVisitor from './visitors/async-api-3/ParametersVisitor.ts';
import BindingsVisitor from './visitors/async-api-3/BindingsVisitor.ts';
import TagsVisitor from './visitors/async-api-3/TagsVisitor.ts';
import ExternalDocumentationVisitor from './visitors/async-api-3/ExternalDocumentationVisitor.ts';
import ChannelItemVisitor from './visitors/async-api-3/channel/ChanneVisitor.ts';
import OperationVisitor from './visitors/async-api-3/operation/OperationVisitor.ts';
import OperationMessageVisitor from './visitors/async-api-3/operation/OperationMessageVisitor.ts';
import SchemaVisitor from './visitors/async-api-3/schema/SchemaVisitor.ts';
import ReferenceVisitor from './visitors/async-api-3/reference/ReferenceVisitor.ts';

const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        /**
         * `AsyncApi 3.0.0` specification elements.
         */
        AsyncApi: {
          $visitor: AsyncApi3Visitor,
          fixedFields: {
            asyncapi: { $ref: '#/visitors/value' },
            id: { $ref: '#/visitors/value' },
            info: { $ref: '#/visitors/document/objects/Info' },
            servers: { $ref: '#/visitors/document/objects/Servers' },
            defaultContentType: { $ref: '#/visitors/value' },
            channels: { $ref: '#/visitors/document/objects/Channels' },
            operations: { $ref: '#/visitors/document/objects/Operation' },
            components: { $ref: '#/visitors/document/objects/Components' },
          },
        },
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: { $ref: '#/visitors/value' },
            version: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
          },
        },
        Servers: {
          $visitor: ServerVisitor,
          fixedFields: {
            // server entries are dynamic keys - handled by ChannelsVisitor/ServersVisitor in full impl
          },
        },
        ServerVariable: {
          $visitor: ServerVariableVisitor,
        },
        Channels: {
          $visitor: ChannelsVisitor,
        },
        Tags: {
          $visitor: TagsVisitor,
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
        },
        Parameters: {
          $visitor: ParametersVisitor,
        },
        Bindings: {
          $visitor: BindingsVisitor,
        },
        ChannelItem: {
          $visitor: ChannelItemVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            subscribe: { $ref: '#/visitors/document/objects/Operation' },
            publish: { $ref: '#/visitors/document/objects/Operation' },
            parameters: { $ref: '#/visitors/document/objects/Parameters' },
            bindings: { $ref: '#/visitors/document/objects/Bindings' },
          },
        },
        Components: {
          $visitor: ComponentsVisitor,
          fixedFields: {
            securitySchemes: { $ref: '#/visitors/document/objects/SecuritySchemes' },
          },
        },

        SecuritySchemes: {
          $visitor: SecuritySchemesVisitor,
        },
        Operation: {
          $visitor: OperationVisitor,
          fixedFields: {
            operationId: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            message: { $ref: '#/visitors/document/objects/OperationMessage' },
            tags: { $ref: '#/visitors/document/objects/Tags' },
            bindings: { $ref: '#/visitors/document/objects/Bindings' },
          },
        },
        OperationMessage: {
          $visitor: OperationMessageVisitor,
        },
        Message: {
          $visitor: MessageVisitor,
          fixedFields: {
            payload: { $ref: '#/visitors/document/objects/Schema' },
            headers: { $ref: '#/visitors/document/objects/Schema' },
            examples: { $ref: '#/visitors/value' },
          },
        },
        Schema: {
          $visitor: SchemaVisitor,
          fixedFields: {
            $ref: { $ref: '#/visitors/document/objects/Reference' },
            type: { $ref: '#/visitors/value' },
            properties: { $ref: '#/visitors/document/objects/Schema' },
          },
        },
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: { $ref: '#/visitors/value' },
          },
        },
      },
    },
  },
};

export default specification;
