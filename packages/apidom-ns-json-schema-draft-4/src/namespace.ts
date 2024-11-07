import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import JSONSchemaElement from './elements/JSONSchema.ts';
import JSONReferenceElement from './elements/JSONReference.ts';
import MediaElement from './elements/Media.ts';
import LinkDescriptionElement from './elements/LinkDescription.ts';

const jsonSchemaDraft4 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('jSONSchemaDraft4', JSONSchemaElement);
    base.register('jSONReference', JSONReferenceElement);
    base.register('media', MediaElement);
    base.register('linkDescription', LinkDescriptionElement);

    return base;
  },
};

export default jsonSchemaDraft4;
