import $refFormatURILint from './$ref--format-uri.ts';
import $ref2_0__3_0NoSiblingsLint from './$ref-2-0--3-0--no-siblings.ts';
import $ref3_1AllowedSiblingsLint from './$ref-3-1--allowed-siblings.ts';
import description3_1TypeLint from './description-3-1--type.ts';
import summary3_1TypeLint from './summary-3-1--type.ts';
import $ref3RequestBodiesLint from './$ref-3-0--request-bodies.ts';
import $ref3RequestBodiesNamingLint from './$ref-3-0--request-bodies-naming.ts';
import $ref3RequestBodiesNamingSchemaLint from './$ref-3-0--request-bodies-naming-schema.ts';

const lints = [
  $refFormatURILint,
  $ref2_0__3_0NoSiblingsLint,
  $ref3_1AllowedSiblingsLint,
  $ref3RequestBodiesLint,
  $ref3RequestBodiesNamingLint,
  $ref3RequestBodiesNamingSchemaLint,
  description3_1TypeLint,
  summary3_1TypeLint,
];

export default lints;
