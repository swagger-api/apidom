import jsonSchemaComplete from './complete/schema';
import schemaLints from './lint/lints';
import schemaDocs from './docs/schema';

const jsonSchemaMeta = {
  documentation: schemaDocs,
  lint: schemaLints,
  completion: jsonSchemaComplete,
};

export default jsonSchemaMeta;
