import infoMeta from './info/meta';
import contactMeta from './contact/meta';
import licenseMeta from './license/meta';
import operationMeta from './operation/meta';
import parameterMeta from './parameter/meta';
import pathItemMeta from './path-item/meta';
import pathsMeta from './paths/meta';
import serversMeta from './servers/meta';
import serverMeta from './server/meta';
import serverVariablesMeta from './server-variables/meta';
import schemaMeta from '../common/schema/meta';
import ApilintCodes from '../codes';

export default {
  '*': {
    lint: [
      {
        code: ApilintCodes.DUPLICATE_KEYS,
        source: 'apilint',
        message: 'an object cannot contain duplicate keys',
        severity: 1,
        linterFunction: 'apilintNoDuplicateKeys',
        marker: 'key',
      },
    ],
  },
  info: infoMeta,
  contact: contactMeta,
  license: licenseMeta,
  schema: schemaMeta,
  operation: operationMeta,
  parameter: parameterMeta,
  parameters: parameterMeta,
  pathItem: pathItemMeta,
  paths: pathsMeta,
  servers: serversMeta,
  server: serverMeta,
  'server-variables': serverVariablesMeta,
};
