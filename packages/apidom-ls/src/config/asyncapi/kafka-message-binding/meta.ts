import { FormatMeta } from '../../../apidom-language-types';
import kafkaMessageBindingLints from './lint/lints';

const kafkaMessageBindingMeta: FormatMeta = {
  lint: kafkaMessageBindingLints,
};

export default kafkaMessageBindingMeta;
