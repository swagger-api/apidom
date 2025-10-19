import FallbackVisitor from './visitors/FallbackVisitor.ts';

import AsyncApi3Visitor from './visitors/AsyncApi3Visitor.ts';
import InfoVisitor from './visitors/info/InfoVisitor.ts';
import ChannelsVisitor from './visitors/channels/ChannelsVisitor.ts';
import ComponentsVisitor from './visitors/components/ComponentsVisitor.ts';
import SecuritySchemesVisitor from './visitors/SecuritySchemesVisitor.ts';
import MessageVisitor from './visitors/message/MessageVisitor.ts';
import ServerVisitor from './visitors/server/ServerVisitor.ts';
import ServerVariableVisitor from './visitors/server/ServerVariableVisitor.ts';
import ParametersVisitor from './visitors/ParametersVisitor.ts';
import BindingsVisitor from './visitors/BindingsVisitor.ts';
import TagsVisitor from './visitors/TagsVisitor.ts';
import ExternalDocumentationVisitor from './visitors/ExternalDocumentationVisitor.ts';
import ChannelItemVisitor from './visitors/channel/ChanneVisitor.ts';
import OperationVisitor from './visitors/operation/OperationVisitor.ts';
import OperationMessageVisitor from './visitors/operation/OperationMessageVisitor.ts';
import SchemaVisitor from './visitors/schema/SchemaVisitor.ts';
import ReferenceVisitor from './visitors/reference/ReferenceVisitor.ts';

const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        AsyncApi: {
          $visitor: AsyncApi3Visitor,
          fixedFields: {
            asyncapi: { $ref: '#/visitors/value' },
            id: { $ref: '#/visitors/value' },
            info: { $ref: '#/visitors/document/objects/Info' },
            servers: { $ref: '#/visitors/document/objects/Servers' },
            defaultContentType: { $ref: '#/visitors/value' },
            channels: { $ref: '#/visitors/document/objects/Channels' },
            components: { $ref: '#/visitors/document/objects/Components' },
            tags: { $ref: '#/visitors/document/objects/Tags' },
            externalDocs: { $ref: '#/visitors/document/objects/ExternalDocumentation' },
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
