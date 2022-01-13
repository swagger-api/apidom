import { FormatMeta } from '../../../apidom-language-types';
import kafkaMessageBindingLints from './lint/lints';
import kafkaMessageBindingDocs from './docs/kafka-message-binding';
import kafkaMessageBindingCompleteJson from './complete/kafka-message-binding';

const kafkaMessageBindingMeta: FormatMeta = {
  lint: kafkaMessageBindingLints,
  completion: kafkaMessageBindingCompleteJson,
  documentation: kafkaMessageBindingDocs,
};

export default kafkaMessageBindingMeta;
