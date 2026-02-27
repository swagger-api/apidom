import allowedFields2_0Lint from './allowed-fields-2-0.ts';
import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import allowedFields3_1Lint from './allowed-fields-3-1.ts';
import allowedFields3_2Lint from './allowed-fields-3-2.ts';
import $refFormatURILint from './$ref--format-uri.ts';
import summaryTypeLint from './summary--type.ts';
import descriptionTypeLint from './description--type.ts';
import getTypeLint from './get--type.ts';
import putTypeLint from './put--type.ts';
import postTypeLint from './post--type.ts';
import deleteTypeLint from './delete--type.ts';
import optionsTypeLint from './options--type.ts';
import headTypeLint from './head--type.ts';
import patchTypeLint from './patch--type.ts';
import traceTypeLint from './trace--type.ts';
import queryTypeLint from './query--type.ts';
import additionalOperationsTypeLint from './additional-operations--type.ts';
import additionalOperationsValuesTypeLint from './additional-operations--values-type.ts';
import serversTypeLint from './servers--type.ts';
import serversItemsTypeLint from './servers--items-type.ts';
import parametersTypeLint from './parameters--type.ts';
import parametersItemsTypeLint from './parameters--items-type.ts';

const lints = [
  $refFormatURILint,
  summaryTypeLint,
  descriptionTypeLint,
  getTypeLint,
  putTypeLint,
  postTypeLint,
  deleteTypeLint,
  optionsTypeLint,
  headTypeLint,
  patchTypeLint,
  traceTypeLint,
  queryTypeLint,
  additionalOperationsTypeLint,
  additionalOperationsValuesTypeLint,
  serversTypeLint,
  serversItemsTypeLint,
  parametersTypeLint,
  parametersItemsTypeLint,
  allowedFields2_0Lint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
  allowedFields3_2Lint,
];

export default lints;
