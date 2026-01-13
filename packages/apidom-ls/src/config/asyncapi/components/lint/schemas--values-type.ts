import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const schemasValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_SCHEMAS_VALUES_TYPE,
  source: 'apilint',
  message: '"schemas" members must be either a schema object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['schema', 'boolean']],
  marker: 'key',
  markerTarget: 'schemas',
  target: 'schemas',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default schemasValuesTypeLint;
