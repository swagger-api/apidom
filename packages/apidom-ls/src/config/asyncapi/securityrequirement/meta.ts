import securityRequirementLints from './lint/lints';
import { FormatMeta } from '../../../apidom-language-types';

const securityRequirementMeta: FormatMeta = {
  lint: securityRequirementLints,
};

export default securityRequirementMeta;
