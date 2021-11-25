import operationComplete from './complete/operation';
import operationDocs from './docs/operation';
import { FormatMeta } from '../../../apidom-language-types';

const operationMeta: FormatMeta = {
  documentation: operationDocs,
  completion: operationComplete,
};

export default operationMeta;
