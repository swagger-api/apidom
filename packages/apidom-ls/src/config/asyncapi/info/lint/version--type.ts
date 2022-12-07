import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const versionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_INFO_FIELD_VERSION_TYPE,
  source: 'apilint',
  message: 'version must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'version',
  data: {},
};

export default versionTypeLint;
