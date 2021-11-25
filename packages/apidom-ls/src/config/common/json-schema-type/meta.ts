import jsonSchemaTypeComplete from './complete/json-schema-type';
import { FormatMeta } from '../../../apidom-language-types';

const jsonSchemaTypeMeta: FormatMeta = {
  completion: jsonSchemaTypeComplete,
};

export default jsonSchemaTypeMeta;
