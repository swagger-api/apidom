import allowedFieldsLint from './allowed-fields.ts';
import idRequiredLint from './id--required.ts';
import nameRequiredLint from './name--required.ts';
import descriptionRequiredLint from './description--required.ts';
import tagsRequiredLint from './tags--required.ts';
import idLint from './id--type.ts';
import nameLint from './name--type.ts';
import descriptionLint from './description--type.ts';
import tagsLint from './tags--type.ts';
import examplesLint from './examples--type.ts';
import inputModesLint from './input-modes--type.ts';
import outputModesLint from './output-modes--type.ts';
import securityRequirementsLint from './security-requirements--type.ts';

const lints = [
  allowedFieldsLint,
  idRequiredLint,
  nameRequiredLint,
  descriptionRequiredLint,
  tagsRequiredLint,
  idLint,
  nameLint,
  descriptionLint,
  tagsLint,
  examplesLint,
  inputModesLint,
  outputModesLint,
  securityRequirementsLint,
];

export default lints;
