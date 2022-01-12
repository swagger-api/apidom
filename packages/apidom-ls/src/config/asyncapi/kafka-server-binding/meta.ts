import { FormatMeta } from '../../../apidom-language-types';
import kafkaServerBindingLints from './lint/lints';

const kafkaServerBindingMeta: FormatMeta = {
  lint: kafkaServerBindingLints,
};

export default kafkaServerBindingMeta;
