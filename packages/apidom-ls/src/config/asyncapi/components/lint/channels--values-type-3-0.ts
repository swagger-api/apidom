import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const channelsValuesType3_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_COMPONENTS_FIELD_CHANNELS_VALUES_TYPE,
  source: 'apilint',
  message: '"channels" members must be Channel Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['channel']],
  marker: 'key',
  markerTarget: 'channels',
  target: 'channels',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default channelsValuesType3_0Lint;
