import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import AsyncApi3Element from './elements/AsyncApi3.ts';
import InfoElement from './elements/Info.ts';
import ServersElement from './elements/Servers.ts';
import ChannelsElement from './elements/Channels.ts';
import ComponentsElement from './elements/Components.ts';
import MessageElement from './elements/Message.ts';
import TagElement from './elements/Tag.ts';
import ExternalDocumentationElement from './elements/ExternalDocumentation.ts';
import IdentifierElement from './elements/Identifier.ts';
import SchemaElement from './elements/Schema.ts';
import ReferenceElement from './elements/Reference.ts';
import SecuritySchemeElement from './elements/SecurityScheme.ts';

const asyncApi3 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

  // Register top-level AsyncAPI 3 elements. Add more as implemented.
  base.register('asyncApi3', AsyncApi3Element);
  base.register('info', InfoElement);
  base.register('servers', ServersElement);
  base.register('channels', ChannelsElement);
  base.register('components', ComponentsElement);
  base.register('message', MessageElement);
  base.register('tag', TagElement);
  base.register('externalDocs', ExternalDocumentationElement);
  base.register('identifier', IdentifierElement);
  base.register('schema', SchemaElement);
  base.register('reference', ReferenceElement);
  base.register('securityScheme', SecuritySchemeElement);

    return base;
  },
};

export default asyncApi3;
