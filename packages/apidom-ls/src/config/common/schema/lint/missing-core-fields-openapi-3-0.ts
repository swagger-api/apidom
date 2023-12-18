import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../../openapi/target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const missingCoreFieldsOpenAPI3_0Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MISSING_CORE_FIELDS,
  source: 'apilint',
  message: 'Schema does not include any Schema Object keywords',
  severity: DiagnosticSeverity.Hint,
  linterFunction: 'existAnyOfFields',
  linterParams: [
    [
      '$ref',
      'multipleOf',
      'maximum',
      'exclusiveMaximum',
      'minimum',
      'exclusiveMinimum',
      'maxLength',
      'minLength',
      'pattern',
      'additionalItems',
      'items',
      'maxItems',
      'minItems',
      'uniqueItems',
      'maxProperties',
      'minProperties',
      'required',
      'properties',
      'additionalProperties',
      'enum',
      'type',
      'allOf',
      'anyOf',
      'oneOf',
      'not',
      'title',
      'description',
      'default',
      'format',
      'readOnly',
      'nullable',
      'discriminator',
      'externalDocs',
      'writeOnly',
      'xml',
      'example',
      'deprecated',
    ],
    true,
    'boolean',
  ],
  marker: 'key',
  targetSpecs: [...OpenAPI30],
};

export default missingCoreFieldsOpenAPI3_0Lint;
