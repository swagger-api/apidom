import { DiagnosticSeverity } from 'vscode-languageserver-types';

import JSONSchemaMeta from './json-schema/meta.ts';
import LinkDescriptionMeta from './link-description/meta.ts';
import ApilintCodes from '../../codes.ts';

export default {
  '*': {
    lint: [
      {
        code: ApilintCodes.DUPLICATE_KEYS,
        source: 'apilint',
        message: 'JSON Schema 2020-12 object cannot contain duplicate keys',
        severity: DiagnosticSeverity.Error,
        linterFunction: 'apilintNoDuplicateKeys',
        marker: 'key',
      },
    ],
  },
  JSONSchema202012: JSONSchemaMeta,
  LinkDescription: LinkDescriptionMeta,
};
