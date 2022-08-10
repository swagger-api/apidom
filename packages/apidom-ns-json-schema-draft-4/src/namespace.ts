import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import JSONSchemaElement from './elements/JSONSchema';
import JSONReferenceElement from './elements/JSONReference';
import MediaElement from './elements/Media';
import LinkDescriptionElement from './elements/LinkDescription';

const jsonSchemaDraft4 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('jsonSchemaDraft4', JSONSchemaElement);
    base.register('jsonReference', JSONReferenceElement);
    base.register('media', MediaElement);
    base.register('linkDescription', LinkDescriptionElement);

    return base;
  },
};

export default jsonSchemaDraft4;
