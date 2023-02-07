import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const geoReplicationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PULSAR_CHANNEL_BINDING_FIELD_GEO_REPLICATION_TYPE,
  source: 'apilint',
  message: "'geo-replication' value must be array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'value',
  target: 'geo-replication',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default geoReplicationTypeLint;
