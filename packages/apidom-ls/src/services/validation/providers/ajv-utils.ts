import Ajv2020, * as Ajv2020Ns from 'ajv/dist/2020.js';
import type { Ajv2020 as Ajv2020Type } from 'ajv/dist/2020.d.ts';
import Ajv, * as AjvNs from 'ajv';
import type { Ajv as AjvType } from 'ajv';
import AjvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

// eslint-disable-next-line import/no-relative-packages
import draft7MetaSchema from '../../../../../../node_modules/ajv/dist/refs/json-schema-draft-07.json' with { type: 'json' };
import openapiSchemaJson31Ajv from '../json-schema/open-api-31/openapi-schema-31-ajv.json' with { type: 'json' };
import openapiSchemaJson31Meta from '../json-schema/open-api-31/openapi-schema-31-meta.json' with { type: 'json' };
import openapiSchemaJson31Dialect from '../json-schema/open-api-31/openapi-schema-31-dialect.json' with { type: 'json' };

let ajvInstance: AjvType;
let ajv2020Instance: Ajv2020Type;

export function ajv(ajv2020: boolean): Ajv2020Type | AjvType {
  if (!ajv2020Instance && ajv2020) {
    // @ts-ignore
    ajv2020Instance = new Ajv2020({
      strict: false,
      allErrors: true,
      schemas: [openapiSchemaJson31Ajv, openapiSchemaJson31Meta, openapiSchemaJson31Dialect],
    });
    ajv2020Instance.addMetaSchema(draft7MetaSchema);
    // @ts-ignore
    addFormats(ajv2020Instance);
    ajv2020Instance.addFormat('media-range', true);

    // @ts-ignore
    AjvErrors(ajv2020Instance);
  } else if (!ajvInstance && !ajv2020) {
    // @ts-ignore
    ajvInstance = new Ajv({
      strict: false,
      meta: true,
      allErrors: true,
      validateFormats: false,
      unicodeRegExp: false,
    });
    // @ts-ignore
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
