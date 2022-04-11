import { FormatMeta } from '../../../apidom-language-types';
import operationComplete from '../operation/complete/operation';
import operationTraitLints from './lint/lints';
import operationDocs from '../operation/docs/operation';

const operationTraitMeta: FormatMeta = {
  documentation: operationDocs,
  // TODO(Francesco): solve this
  completion: operationComplete.slice(0, -2),
  lint: operationTraitLints,
};

export default operationTraitMeta;
