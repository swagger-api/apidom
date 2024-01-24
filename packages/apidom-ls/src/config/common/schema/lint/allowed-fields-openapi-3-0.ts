import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../../openapi/target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFieldsOpenAPI3_0Lint: LinterMeta = {
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
      'title',
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
      'allOf',
      'oneOf',
      'anyOf',
      'not',
      'items',
      'properties',
      'additionalProperties',
      'description',
      'format',
      'default',
      'nullable',
      'discriminator',
      'readOnly',
      'writeOnly',
      'xml',
      'externalDocs',
      'example',
      'deprecated',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI30,
};

export default allowedFieldsOpenAPI3_0Lint;
