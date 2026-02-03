import allowedFields2_0__2_6Lint from './allowed-fields-2-0--2-6.ts';
import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import descriptionTypeLint from './description--type.ts';
import urlFormatURILint from './url--format-uri.ts';
import urlRequired2_0__2_6Lint from './url--required-2-0--2-6.ts';
import urlRequired3_0Lint from './url--required-3-0.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';

const lints = [
  descriptionTypeLint,
  urlFormatURILint,
  urlRequired2_0__2_6Lint,
  urlRequired3_0Lint,
  $refValidLint,
  $refNoSiblingsLint,
  allowedFields2_0__2_6Lint,
  allowedFields3_0Lint,
];

export default lints;
