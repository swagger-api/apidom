import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const securityItemsType3_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_FIELD_SECURITY_ITEMS_TYPE,
  source: 'apilint',
  message: 'security must be an array of Security Scheme Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['securityScheme']],
  marker: 'key',
  target: 'security',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default securityItemsType3_0Lint;
