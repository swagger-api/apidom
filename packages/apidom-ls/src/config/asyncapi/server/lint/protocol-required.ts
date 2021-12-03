import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverProtocolRequiredLint: LinterMeta = {
  code: ApilintCodes.SERVER_PROTOCOL_REQUIRED,
  source: 'apilint',
  message: "should always have a 'protocol'",
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['protocol'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'protocol'",
        action: 'addChild',
        snippetYaml: 'protocol: \n    ',
        snippetJson: '"protocol": "",\n      ',
      },
    ],
  },
};

export default serverProtocolRequiredLint;
