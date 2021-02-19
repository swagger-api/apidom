import { NamespacePluginOptions } from 'minim';
import AsyncApi2_0 from './elements/AsyncApi2-0';
import AsyncApiVersion from './elements/AsyncApiVersion';
import ChannelBindings from './elements/ChannelBindings';
import ChannelItem from './elements/ChannelItem';
import Channels from './elements/Channels';
import Components from './elements/Components';
import Contact from './elements/Contact';
import Identifier from './elements/Identifier';
import Info from './elements/Info';
import License from './elements/License';
import Operation from './elements/Operation';
import Parameter from './elements/Parameter';
import Parameters from './elements/Parameters';
import Reference from './elements/Reference';
import Schema from './elements/Schema';
import SecurityRequirement from './elements/SecurityRequirement';
import Server from './elements/Server';
import ServerBindings from './elements/ServerBindings';
import Servers from './elements/Servers';
import ServerVariable from './elements/ServerVariable';
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
ChannelBindings.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ChannelBindings',
  '$visitor',
]);
ChannelItem.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ChannelItem',
  '$visitor',
]);
Channels.refract = createRefractor(['visitors', 'document', 'objects', 'Channels', '$visitor']);
Components.refract = createRefractor(['visitors', 'document', 'objects', 'Components', '$visitor']);
Contact.refract = createRefractor(['visitors', 'document', 'objects', 'Contact', '$visitor']);
Identifier.refract = createRefractor(['visitors', 'document', 'objects', 'Identifier', '$visitor']);
Info.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
License.refract = createRefractor(['visitors', 'document', 'objects', 'License', '$visitor']);
Operation.refract = createRefractor(['visitors', 'document', 'objects', 'Operation', '$visitor']);
Parameter.refract = createRefractor(['visitors', 'document', 'objects', 'Parameter', '$visitor']);
Parameters.refract = createRefractor(['visitors', 'document', 'objects', 'Parameters', '$visitor']);
Reference.refract = createRefractor(['visitors', 'document', 'objects', 'Reference', '$visitor']);
Schema.refract = createRefractor(['visitors', 'document', 'objects', 'Schema', '$visitor']);
SecurityRequirement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);
Server.refract = createRefractor(['visitors', 'document', 'objects', 'Server', '$visitor']);
ServerBindings.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerBindings',
  '$visitor',
]);
Servers.refract = createRefractor(['visitors', 'document', 'objects', 'Servers', '$visitor']);
ServerVariable.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerVariable',
  '$visitor',
]);

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
