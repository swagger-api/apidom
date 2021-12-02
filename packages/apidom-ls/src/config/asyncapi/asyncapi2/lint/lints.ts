import rootInfoLint from '../../../common/root/lint/info';
import rootChannelsLint from './channels';
import rootAsyncapiLint from './asyncapi';
import rootAsyncapiRequiredLint from './asyncapi-required';
import rootIdLint from '../../../common/root/lint/id';
import infoObjectLint from '../../../common/root/lint/info-object';
import serversObjectLint from './servers-object';
import channelsObjectLint from './channels-object';
import componentsObjectLint from './components-object';
import tagsObjectLint from './tags-object';
import externaldocsObjectLint from './externaldocs-object';
import rootDefaultContentTypeLint from './defaultcontenttype';

const asyncapiRootLints = [
  rootIdLint,
  rootInfoLint,
  rootChannelsLint,
  rootAsyncapiLint,
  rootAsyncapiRequiredLint,
  infoObjectLint,
  serversObjectLint,
  channelsObjectLint,
  componentsObjectLint,
  tagsObjectLint,
  externaldocsObjectLint,
  rootDefaultContentTypeLint,
];

export default asyncapiRootLints;
