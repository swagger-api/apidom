import { DiagnosticSeverity } from 'vscode-languageserver-types';

/*
TODO remove targetSpecs when underlying issue has been fixed (missing referenced-element in ref)
see
  https://github.com/swagger-api/swagger-editor/issues/3722
  https://github.com/swagger-api/swagger-editor/issues/4026
 */
import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oneOfTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ONEOF,
  source: 'apilint',
  message: 'oneOf must be a non-empty array of schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema'], true],
  marker: 'key',
  target: 'oneOf',
  data: {},
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.0.0' },
    { namespace: 'asyncapi', version: '2.1.0' },
    { namespace: 'asyncapi', version: '2.2.0' },
    { namespace: 'asyncapi', version: '2.3.0' },
    { namespace: 'asyncapi', version: '2.4.0' },
    { namespace: 'asyncapi', version: '2.5.0' },
    { namespace: 'asyncapi', version: '2.6.0' },
    { namespace: 'openapi', version: '3.1.0' },
  ],
};

export default oneOfTypeLint;
