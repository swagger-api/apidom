import allowedFields3_0Lint from './allowed-fields-3-0';
import allowedFields3_1Lint from './allowed-fields-3-1';
import operationRefFormatURILint from './operation-ref--format-uri';
import operationRefMutuallyExclusiveLint from './operation-ref--mutually-exclusive';
import operationIdTypeLint from './operation-id--type';
import descriptionTypeLint from './description--type';
import serverTypeLint from './server--type';

const links = [
  operationRefFormatURILint,
  operationRefMutuallyExclusiveLint,
  operationIdTypeLint,
  descriptionTypeLint,
  serverTypeLint,
  allowedFields3_0Lint,
  allowedFields3_1Lint,
];

export default links;
