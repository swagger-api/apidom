import allowedFields3_0Lint from './allowed-fields-3-0.ts';
import addressTypeLint from './address--type.ts';
import channelTypeLint from './channel--type.ts';
import messagesTypeLint from './messages--type.ts';
import $refValidLint from './$ref--valid.ts';
import $refNoSiblingsLint from './$ref--no-siblings.ts';

const lints = [
  addressTypeLint,
  channelTypeLint,
  messagesTypeLint,
  allowedFields3_0Lint,
  $refValidLint,
  $refNoSiblingsLint,
];

export default lints;
