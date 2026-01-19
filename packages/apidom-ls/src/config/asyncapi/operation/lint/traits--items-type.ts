import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const traitsItemsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_FIELD_TRAITS_ITEMS_TYPE,
  source: 'apilint',
  message: 'traits must be an array of Operation Trait Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['operationTrait']],
  marker: 'key',
  target: 'traits',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default traitsItemsTypeLint;
