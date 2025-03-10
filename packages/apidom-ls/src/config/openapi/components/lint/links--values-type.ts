import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const linksValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_LINKS_VALUES_TYPE,
  source: 'apilint',
  message: '"links" members must be Link Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['link']],
  marker: 'key',
  markerTarget: 'links',
  target: 'links',
  data: {},
  targetSpecs: OpenAPI3,
};

export default linksValuesTypeLint;
