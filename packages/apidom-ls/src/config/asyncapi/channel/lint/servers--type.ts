import { LinterMeta } from '../../../../apidom-language-types.ts';

const serversTypeLint: LinterMeta = {
  targetSpecs: [{ namespace: 'asyncapi', version: '3.0.0' }],
};

export default serversTypeLint;
