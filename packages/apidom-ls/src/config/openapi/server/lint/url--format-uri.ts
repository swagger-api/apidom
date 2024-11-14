import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const urlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_FIELD_URL_FORMAT_URI,
  source: 'apilint',
  message: 'url MUST be in the format of an URL.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'url',
  data: {},
  conditions: [
    {
      targets: [{ path: 'url' }],
      function: 'apilintValueRegex',
      params: ['^(?!.*\\{\\S+?\\}).*$'], // validate as URI only if variables in brackets not present
    },
  ],
  targetSpecs: OpenAPI3,
};

export default urlFormatURILint;
