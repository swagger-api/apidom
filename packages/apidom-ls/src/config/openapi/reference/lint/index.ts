import $refFormatURILint from './$ref--format-uri';
import $ref2_0__3_0NoSiblingsLint from './$ref-2-0--3-0--no-siblings';
import $ref3_1AllowedSiblingsLint from './$ref-3-1--allowed-siblings';
import description3_1TypeLint from './description-3-1--type';
import summary3_1TypeLint from './summary-3-1--type';

const lints = [
  $refFormatURILint,
  $ref2_0__3_0NoSiblingsLint,
  $ref3_1AllowedSiblingsLint,
  description3_1TypeLint,
  summary3_1TypeLint,
];

export default lints;
