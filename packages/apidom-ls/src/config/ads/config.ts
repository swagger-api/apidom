import { DiagnosticSeverity } from 'vscode-languageserver-types';

import infoMeta from './info/meta';
import mainMeta from './main/meta';
import ApilintCodes from '../codes';

export default {
  '*': {
    lint: [
      {
        code: ApilintCodes.DUPLICATE_KEYS,
        source: 'apilint',
        message: 'an object cannot contain duplicate keys',
        severity: DiagnosticSeverity.Error,
        linterFunction: 'apilintNoDuplicateKeys',
        marker: 'key',
      },
    ],
  },
  info: infoMeta,
  main: mainMeta,
};
