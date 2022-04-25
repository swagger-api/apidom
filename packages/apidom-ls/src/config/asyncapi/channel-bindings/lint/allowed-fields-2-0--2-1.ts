import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelBindingsAllowedFields2021Lint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      '$ref',
      'http',
      'ws',
      'kafka',
      'amqp',
      'amqp1',
      'mqtt',
      'mqtt5',
      'nats',
      'jms',
      'sns',
      'sqs',
      'stomp',
      'redis',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.0.0' },
    { namespace: 'asyncapi', version: '2.1.0' },
  ],
};

export default channelBindingsAllowedFields2021Lint;
