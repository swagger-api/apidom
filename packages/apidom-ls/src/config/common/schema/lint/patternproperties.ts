import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaPatternPropertiesLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERNPROPERTIES,
  source: 'apilint',
  message: 'patternProperties members must be schemas',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: ['schema'],
  marker: 'key',
  markerTarget: 'patternProperties',
  target: 'patternProperties',
  data: {},
};

export default schemaPatternPropertiesLint;
