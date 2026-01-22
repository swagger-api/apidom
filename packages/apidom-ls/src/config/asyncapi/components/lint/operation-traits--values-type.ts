import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const operationTraitsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_OPERATION_TRAITS_VALUES_TYPE,
  source: 'apilint',
  message: '"operationTraits" members must be Security Scheme Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operationTrait']],
  marker: 'key',
  markerTarget: 'operationTraits',
  target: 'operationTraits',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default operationTraitsValuesTypeLint;
