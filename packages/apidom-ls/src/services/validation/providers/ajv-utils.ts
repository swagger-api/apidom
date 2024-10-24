import Ajv2020, * as Ajv2020Ns from 'ajv/dist/2020.js'; // eslint-disable-line import/extensions
import Ajv, * as AjvNs from 'ajv';
import AjvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

import draft7MetaSchema from '../json-schema/json-schema-draft-07';
import openapiSchemaJson31Ajv from '../json-schema/open-api-31/openapi-schema-31-ajv';
import openapiSchemaJson31Meta from '../json-schema/open-api-31/openapi-schema-31-meta';
import openapiSchemaJson31Dialect from '../json-schema/open-api-31/openapi-schema-31-dialect';

let ajvInstance: Ajv;
let ajv2020Instance: Ajv2020;

export function ajv(ajv2020: boolean): Ajv2020 | Ajv {
  if (!ajv2020Instance && ajv2020) {
    ajv2020Instance = new Ajv2020({
      strict: false,
      allErrors: true,
      schemas: [openapiSchemaJson31Ajv, openapiSchemaJson31Meta, openapiSchemaJson31Dialect],
    });
    ajv2020Instance.addMetaSchema(draft7MetaSchema);
    addFormats(ajv2020Instance);
    ajv2020Instance.addFormat('media-range', true);

    AjvErrors(ajv2020Instance);
  } else if (!ajvInstance && !ajv2020) {
    ajvInstance = new Ajv({
      strict: false,
      meta: true,
      allErrors: true,
      validateFormats: false,
      unicodeRegExp: false,
    });
    AjvErrors(ajvInstance);
  }

  if (ajv2020) {
    return ajv2020Instance;
  }
  return ajvInstance;
}

export function compileAjv(
  jsonSchema: Record<string, unknown>,
  ajv2020: boolean,
): Ajv2020Ns.ValidateFunction | AjvNs.ValidateFunction {
  if (!ajv2020Instance && ajv2020) {
    ajv(ajv2020);
  } else if (!ajvInstance && !ajv2020) {
    ajv(ajv2020);
  }
  const ajvInst = ajv2020 ? ajv2020Instance : ajvInstance;
  return ajvInst.compile(jsonSchema);
}
