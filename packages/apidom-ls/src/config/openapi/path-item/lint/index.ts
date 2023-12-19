import allowedFields2_0Lint from './allowed-fields-2-0';
import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFields3_1Lint from './allowed-fields-3-1';
import $refFormatURILint from './$ref--format-uri';
import summaryTypeLint from './summary--type';
import descriptionTypeLint from './description--type';
import getTypeLint from './get--type';
import putTypeLint from './put--type';
import postTypeLint from './post--type';
import deleteTypeLint from './delete--type';
import optionsTypeLint from './options--type';
import headTypeLint from './head--type';
import patchTypeLint from './patch--type';
import traceTypeLint from './trace--type';
import serversTypeLint from './servers--type';
import serversItemsTypeLint from './servers--items-type';
import parametersTypeLint from './parameters--type';
import parametersItemsTypeLint from './parameters--items-type';

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
  serversTypeLint,
  serversItemsTypeLint,
  parametersTypeLint,
  parametersItemsTypeLint,
  allowedFields2_0Lint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default lints;
