import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const publishTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_ITEM_FIELD_PUBLISH_TYPE,
  source: 'apilint',
  message: '"publish" must be an operation',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'publish',
  data: {},
};

export default publishTypeLint;
