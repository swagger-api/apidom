import operationComplete from './complete/operation';
import operationDocs from './docs/operation';
import { FormatMeta } from '../../../apidom-language-types';
import operationLints from './lint/lints';

const operationMeta: FormatMeta = {
  documentation: operationDocs,
  completion: operationComplete,
  lint: operationLints,
};

export default operationMeta;
