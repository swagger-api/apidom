import jsonSchema202012Documentation from '../../json-schema/2020-12/json-schema/documentation.ts';
import { compose, assoc } from '../../json-schema/2020-12/target-specs.ts';
import commonSchemaDocumentation from '../../common/schema/documentation.ts';
import { OpenAPI31 } from '../target-specs.ts';

export default compose(
  [jsonSchema202012Documentation, commonSchemaDocumentation],
  assoc(OpenAPI31),
);
