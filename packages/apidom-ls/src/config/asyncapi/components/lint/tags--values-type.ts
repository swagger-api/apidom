import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const tagsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_COMPONENTS_FIELD_TAGS_VALUES_TYPE,
  source: 'apilint',
  message: '"tags" members must be Tag Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['tag']],
  marker: 'key',
  markerTarget: 'tags',
  target: 'tags',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default tagsValuesTypeLint;
