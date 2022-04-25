import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationBindingsAllowedFields22Lint: LinterMeta = {
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
      'anypointmq',
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
      'mercure',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: [{ namespace: 'asyncapi', version: '2.2.0' }],
};

export default operationBindingsAllowedFields22Lint;
