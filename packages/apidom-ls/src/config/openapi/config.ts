import jsonSchemaTypeMeta from '../common/json-schema-type/meta';
import jsonSchemaMeta from '../common/schema/meta';
import infoMeta from '../common/info/meta';
import contactMeta from '../common/contact/meta';
import operationMeta from '../common/operation/meta';

export default {
  '*': {
    lint: [],
  },
  info: infoMeta,
  contact: contactMeta,
  operation: operationMeta,
  'json-schema-type': jsonSchemaTypeMeta,
  schema: jsonSchemaMeta,
};
