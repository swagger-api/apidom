import { NamespacePluginOptions } from 'minim';
import OpenApi3 from './elements/OpenApi3';
import Openapi from './elements/Openapi';
import Info from './elements/Info';
import License from './elements/License';
import Contact from './elements/Contact';
import Components from './elements/Components';
import Schema from './elements/Schema';

const openApi3 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('openApi3', OpenApi3);
    base.register('openapi', Openapi);
    base.register('info', Info);
    base.register('license', License);
    base.register('contact', Contact);
    base.register('components', Components);
    base.register('schema', Schema);

    return base;
  },
};

export default openApi3;
