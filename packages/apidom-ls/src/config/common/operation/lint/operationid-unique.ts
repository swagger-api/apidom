import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationIdUniqueLint: LinterMeta = {
  code: ApilintCodes.OPERATION_ID_UNIQUE,
  source: 'apilint',
  message: "operationId' must be unique among all operations",
  severity: 1,
  linterFunction: 'apilintPropertyUniqueValue',
  linterParams: [['operation', 'operationTrait'], 'operationId'],
  marker: 'key',
  markerTarget: 'operationId',
  target: 'operationId',
  data: {},
};

export default operationIdUniqueLint;
