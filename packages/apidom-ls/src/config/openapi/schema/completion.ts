import jsonSchema202012completion from '../../json-schema/2020-12/json-schema/completion.ts';
import { compose, assoc } from '../../json-schema/2020-12/target-specs.ts';
import commonSchemaCompletion from '../../common/schema/completion.ts';
import { OpenAPI31 } from '../target-specs.ts';

export default compose([jsonSchema202012completion, commonSchemaCompletion], assoc(OpenAPI31));
