import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const propertyNameRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_DISCRIMINATOR_FIELD_PROPERTY_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'propertyName'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['propertyName'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'propertyName' field",
        action: 'addChild',
        snippetYaml: 'propertyName: \n  ',
        snippetJson: '"propertyName": "",\n    ',
      },
    ],
  },
  targetSpecs: OpenAPI3,
};

export default propertyNameRequiredLint;
