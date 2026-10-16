import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI310 } from '../../target-specs.ts';

const ros2TypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_CHANNEL_BINDINGS_FIELD_ROS2_TYPE,
  source: 'apilint',
  message: '"ros2" must be a ROS 2 Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['ros2ChannelBinding']],
  marker: 'value',
  target: 'ros2',
  data: {},
  targetSpecs: AsyncAPI310,
};

export default ros2TypeLint;
