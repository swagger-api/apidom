import parameterLints from './lint/lints';
import { FormatMeta } from '../../../apidom-language-types';
import parameterComplete from './complete/parameter';
import parameterDocs from './docs/parameter';

const parameterMeta: FormatMeta = {
  lint: parameterLints,
  completion: parameterComplete,
  documentation: parameterDocs,
};

export default parameterMeta;
