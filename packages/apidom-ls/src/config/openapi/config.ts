import jsonSchemaTypeMeta from '../common/json-schema-type/meta';
import jsonSchemaMeta from '../common/schema/meta';
import infoMeta from './info/meta';
import contactMeta from './contact/meta';

export default {
  '*': {
    lint: [],
  },
  info: infoMeta,
  contact: contactMeta,
  'json-schema-type': jsonSchemaTypeMeta,
  schema: jsonSchemaMeta,
};
