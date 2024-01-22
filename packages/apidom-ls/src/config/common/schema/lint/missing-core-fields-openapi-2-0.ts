import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../../openapi/target-specs';

const missingCoreFieldsOpenAPI2Lint: LinterMeta = {
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
      'title',
      'description',
      'default',
      'format',
      'readOnly',
      'discriminator',
      'externalDocs',
      'xml',
      'example',
    ],
    true,
  ],
  marker: 'key',
  conditions: [
    {
      function: 'apilintElementOrClass',
      params: [['schema']],
    },
  ],
  targetSpecs: OpenAPI2,
};

export default missingCoreFieldsOpenAPI2Lint;
