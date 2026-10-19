import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const externalDocsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_COMPONENTS_FIELD_EXTERNAL_DOCS_VALUES_TYPE,
  source: 'apilint',
  message: '"externalDocs" members must be External Documentation Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['externalDocumentation']],
  marker: 'key',
  markerTarget: 'externalDocs',
  target: 'externalDocs',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default externalDocsValuesTypeLint;
