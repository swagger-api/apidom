import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const linksValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_RESPONSE_FIELD_LINKS_VALUES_TYPE,
  source: 'apilint',
  message: '"links" members must be Link Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['link']],
  marker: 'key',
  markerTarget: 'links',
  target: 'links',
  data: {},
};

export default linksValuesTypeLint;
