import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import allowedFields3_1Lint from './allowed-fields-3-1.ts';
import operationRefFormatURILint from './operation-ref--format-uri.ts';
import operationRefMutuallyExclusiveLint from './operation-ref--mutually-exclusive.ts';
import operationIdTypeLint from './operation-id--type.ts';
import descriptionTypeLint from './description--type.ts';
import serverTypeLint from './server--type.ts';

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
