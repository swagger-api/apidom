import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const componentsMessageTraitsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_MESSAGE_TRAITS_VALUES_TYPE,
  source: 'apilint',
  message: '"messageTraits" members must be Security Scheme Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['messageTrait']],
  marker: 'key',
  markerTarget: 'messageTraits',
  target: 'messageTraits',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default componentsMessageTraitsLint;
