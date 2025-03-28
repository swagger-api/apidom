import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const destinationsItemsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SOLACE_OPERATION_BINDING_FIELD_DESTINATIONS_TYPE,
  source: 'apilint',
  message: "'destinations' value must be a list of Destination Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['object']],
  marker: 'value',
  target: 'destinations',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default destinationsItemsTypeLint;
