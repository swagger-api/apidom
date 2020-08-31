import { NamespacePluginOptions } from 'minim';
import OpenApi3_1 from './elements/OpenApi3-1';
import Openapi from './elements/Openapi';
import Info from './elements/Info';
import License from './elements/License';
import Contact from './elements/Contact';
import Components from './elements/Components';
import Schema from './elements/Schema';
import Server from './elements/Server';
import ServerVariable from './elements/ServerVariable';
import Paths from './elements/Paths';
import PathItem from './elements/PathItem';
import Operation from './elements/Operation';

const openApi3_1 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('openApi3_1', OpenApi3_1);
    base.register('openapi', Openapi);
    base.register('info', Info);
    base.register('license', License);
    base.register('contact', Contact);
    base.register('components', Components);
    base.register('schema', Schema);
    base.register('server', Server);
    base.register('serverVariable', ServerVariable);
    base.register('paths', Paths);
    base.register('pathItem', PathItem);
    base.register('operation', Operation);

    return base;
  },
};

export default openApi3_1;
