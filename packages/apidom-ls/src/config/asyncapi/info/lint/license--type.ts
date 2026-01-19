import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const licenseTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_INFO_FIELD_LICENSE_TYPE,
  source: 'apilint',
  message: 'license must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['license']],
  marker: 'value',
  target: 'license',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default licenseTypeLint;
