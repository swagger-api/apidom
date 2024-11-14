import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields2_0Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'name',
      'in',
      'description',
      'required',
      'schema',
      'type',
      'format',
      'allowEmptyValue',
      'items',
      'collectionFormat',
      'default',
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
      'enum',
      'multipleOf',
      '$ref',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI2,
};

export default allowedFields2_0Lint;
