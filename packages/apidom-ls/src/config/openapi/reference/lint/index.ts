import $refFormatURILint from './$ref--format-uri.ts';
import $ref2_0__3_0NoSiblingsLint from './$ref-2-0--3-0--no-siblings.ts';
import $ref3_1__3_2AllowedSiblingsLint from './$ref-3-1--3-2--allowed-siblings.ts';
import description3_1__3_2TypeLint from './description-3-1--3-2--type.ts';
import summary3_1__3_2TypeLint from './summary-3-1--3-2--type.ts';

const lints = [
  $refFormatURILint,
  $ref2_0__3_0NoSiblingsLint,
  $ref3_1__3_2AllowedSiblingsLint,
  description3_1__3_2TypeLint,
  summary3_1__3_2TypeLint,
];

export default lints;
