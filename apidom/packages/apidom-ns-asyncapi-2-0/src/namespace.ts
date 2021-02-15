import { NamespacePluginOptions } from 'minim';
import AsyncApi2_0 from './elements/AsyncApi2-0';
import AsyncApiVersion from './elements/AsyncApiVersion';
import Identifier from './elements/Identifier';
import Info from './elements/Info';
import License from './elements/License';
import Contact from './elements/Contact';
import Components from './elements/Components';
import Schema from './elements/Schema';
import Channels from './elements/Channels';
import ChannelItem from './elements/ChannelItem';
import Operation from './elements/Operation';
import Parameters from './elements/Parameters';
import Parameter from './elements/Parameter';
import ChannelBindings from './elements/ChannelBindings';
import Servers from './elements/Servers';
import Server from './elements/Server';
import ServerVariable from './elements/ServerVariable';
import SecurityRequirement from './elements/SecurityRequirement';
import ServerBindings from './elements/ServerBindings';
import Reference from './elements/Reference';
import { createRefractor } from './refractor';

// register refractors specific to element types
AsyncApi2_0.refract = createRefractor(['visitors', 'document', 'objects', 'AsyncApi', '$visitor']);
AsyncApiVersion.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'AsyncApiVersion',
  '$visitor',
]);
Identifier.refract = createRefractor(['visitors', 'document', 'objects', 'Identifier', '$visitor']);
Info.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
License.refract = createRefractor(['visitors', 'document', 'objects', 'License', '$visitor']);
Contact.refract = createRefractor(['visitors', 'document', 'objects', 'Contact', '$visitor']);
Components.refract = createRefractor(['visitors', 'document', 'objects', 'Components', '$visitor']);
Schema.refract = createRefractor(['visitors', 'document', 'objects', 'Schema', '$visitor']);
Channels.refract = createRefractor(['visitors', 'document', 'objects', 'Channels', '$visitor']);
ChannelItem.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ChannelItem',
  '$visitor',
]);
Operation.refract = createRefractor(['visitors', 'document', 'objects', 'Operation', '$visitor']);
Parameters.refract = createRefractor(['visitors', 'document', 'objects', 'Parameters', '$visitor']);
ChannelBindings.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ChannelBindings',
  '$visitor',
]);
Servers.refract = createRefractor(['visitors', 'document', 'objects', 'Servers', '$visitor']);
Server.refract = createRefractor(['visitors', 'document', 'objects', 'Server', '$visitor']);
ServerVariable.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerVariable',
  '$visitor',
]);
SecurityRequirement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);
ServerBindings.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerBindings',
  '$visitor',
]);
Reference.refract = createRefractor(['visitors', 'document', 'objects', 'Reference', '$visitor']);

const asyncApi2_0 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('asyncApi2_0', AsyncApi2_0);
    base.register('asyncApiVersion', AsyncApiVersion);
    base.register('identifier', Identifier);
    base.register('info', Info);
    base.register('license', License);
    base.register('contact', Contact);
    base.register('components', Components);
    base.register('schema', Schema);
    base.register('channels', Channels);
    base.register('channelItem', ChannelItem);
    base.register('operation', Operation);
    base.register('parameters', Parameters);
    base.register('parameter', Parameter);
    base.register('channelBindings', ChannelBindings);
    base.register('servers', Servers);
    base.register('server', Server);
    base.register('serverVariable', ServerVariable);
    base.register('securityRequirement', SecurityRequirement);
    base.register('serverBindings', ServerBindings);
    base.register('reference', Reference);

    return base;
  },
};

export default asyncApi2_0;
