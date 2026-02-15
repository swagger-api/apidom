import { LinterMeta } from 'src/apidom-language-types.ts';

import valuesTypeLint from './values-type.ts';

const lints: LinterMeta[] = [valuesTypeLint];

export default lints;
