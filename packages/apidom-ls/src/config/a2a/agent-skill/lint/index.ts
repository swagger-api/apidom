import allowedFieldsLint from './allowed-fields.ts';
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
