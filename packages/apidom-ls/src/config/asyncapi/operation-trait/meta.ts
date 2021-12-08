import { FormatMeta } from '../../../apidom-language-types';
import operationComplete from '../../common/operation/complete/operation';
import operationTraitLints from './lint/lints';
import operationDocs from '../../common/operation/docs/operation';

const operationTraitMeta: FormatMeta = {
  documentation: operationDocs,
  // TODO solve this
  completion: operationComplete.slice(0, -2),
  lint: operationTraitLints,
};

export default operationTraitMeta;
