import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../../openapi/target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFieldsOpenAPI2_0Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  /**
   * Technically additional JSON Schema keywords can be present, they are just unsupported.
   * That's why we use Warning severity here instead of Error.
   */
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      '$ref',
      'format',
      'title',
      'description',
      'default',
      'multipleOf',
      'maximum',
      'exclusiveMaximum',
      'minimum',
      'exclusiveMinimum',
      'maxLength',
      'minLength',
      'pattern',
      'maxItems',
      'minItems',
      'uniqueItems',
      'maxProperties',
      'minProperties',
      'required',
      'enum',
      'type',
      'items',
      'allOf',
      'properties',
      'additionalProperties',
      'discriminator',
      'readOnly',
      'xml',
      'externalDocs',
      'example',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI2,
};

export default allowedFieldsOpenAPI2_0Lint;
