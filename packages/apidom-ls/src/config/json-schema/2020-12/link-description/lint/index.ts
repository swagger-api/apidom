import anchorTypeLint from './anchor--type.ts';
import anchorPointerTypeLint from './anchor-pointer--type.ts';
import relTypeLint from './rel--type.ts';
import relRequiredLint from './rel--required.ts';
import relItemsTypeLint from './rel--items-type.ts';
import hrefTypeLint from './href--type.ts';
import hrefRequiredLint from './href--required.ts';
import hrefSchemaTypeLint from './href-schema--type.ts';
import templatePointersTypeLint from './template-pointers--type.ts';
import templatePointersValuesTypeLint from './template-pointers--values-type.ts';
import templateRequiredTypeLint from './template-required--type.ts';
import templateRequiredUniqueLint from './template-required--unique.ts';
import titleTypeLint from './title--type.ts';
import descriptionTypeLint from './description--type.ts';
import targetSchemaTypeLint from './target-schema--type.ts';
import targetMediaTypeTypeLint from './target-media-type--type.ts';
import targetHintsTypeLint from './target-hints--type.ts';
import headerSchemaTypeLint from './header-schema--type.ts';
import submissionMediaTypeTypeLint from './submission-media-type--type.ts';
import submissionSchemaTypeLint from './submission-schema--type.ts';
import $commentTypeLint from './$comment--type.ts';

const lints = [
  anchorTypeLint,
  anchorPointerTypeLint,
  relTypeLint,
  relRequiredLint,
  relItemsTypeLint,
  hrefTypeLint,
  hrefRequiredLint,
  hrefSchemaTypeLint,
  templatePointersTypeLint,
  templatePointersValuesTypeLint,
  templateRequiredTypeLint,
  templateRequiredUniqueLint,
  titleTypeLint,
  descriptionTypeLint,
  targetSchemaTypeLint,
  targetMediaTypeTypeLint,
  targetHintsTypeLint,
  headerSchemaTypeLint,
  submissionMediaTypeTypeLint,
  submissionSchemaTypeLint,
  $commentTypeLint,
];

export default lints;
