import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const templateRequiredTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_TEMPLATE_REQUIRED_TYPE,
  source: 'apilint',
  message: "'templateRequired' must be an array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  markerTarget: 'templateRequired',
  target: 'templateRequired',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default templateRequiredTypeLint;
