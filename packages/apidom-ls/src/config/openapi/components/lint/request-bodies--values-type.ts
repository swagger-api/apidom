import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requestBodiesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_REQUEST_BODIES_VALUES_TYPE,
  source: 'apilint',
  message: '"requestBodies" members must be Request Body Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['requestBody']],
  marker: 'key',
  markerTarget: 'requestBodies',
  target: 'requestBodies',
  data: {},
};

export default requestBodiesValuesTypeLint;
