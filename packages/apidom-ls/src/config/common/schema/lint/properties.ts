import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaPropertiesLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTIES,
  source: 'apilint',
  message: 'properties members must be schemas',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: ['schema'],
  marker: 'key',
  markerTarget: 'properties',
  target: 'properties',
  data: {},
};

export default schemaPropertiesLint;
