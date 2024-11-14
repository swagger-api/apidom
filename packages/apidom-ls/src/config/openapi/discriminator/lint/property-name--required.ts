import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

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
