import componentsComplete from './complete/components';
import { FormatMeta } from '../../../apidom-language-types';
import componentsDocs from './docs/components';
import componentsLints from './lint/lints';

const componentsMeta: FormatMeta = {
  lint: componentsLints,
  completion: componentsComplete,
  documentation: componentsDocs,
};

export default componentsMeta;
