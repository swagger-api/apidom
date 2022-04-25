import channelBindings$RefLint from './ref';
import channelBindingsRefNonSiblingsLint from './ref-non-siblings';
import channelBindingsAllowedFields2_0__2_1Lint from './allowed-fields-2-0--2-1';
import channelBindingsAllowedFields2_2Lint from './allowed-fields-2-2';
import channelBindingsAllowedFields2_3Lint from './allowed-fields-2-3';
import httpLint from './http';
import ibmmqLint from './ibmmq';
import amqpLint from './amqp';
import amqp1Lint from './amqp1';
import anypointmqLint from './anypointmq';
import jmsLint from './jms';
import kafkaLint from './kafka';
import mercureLint from './mercure';
import mqttLint from './mqtt';
import mqtt5Lint from './mqtt5';
import natsLint from './nats';
import redisLint from './redis';
import snsLint from './sns';
import solaceLint from './solace';
import sqsLint from './sqs';
import stompLint from './stomp';
import wsLint from './ws';

const lints = [
  channelBindingsAllowedFields2_0__2_1Lint,
  channelBindingsAllowedFields2_2Lint,
  channelBindingsAllowedFields2_3Lint,
  channelBindings$RefLint,
  channelBindingsRefNonSiblingsLint,
  httpLint,
  ibmmqLint,
  amqpLint,
  amqp1Lint,
  anypointmqLint,
  jmsLint,
  kafkaLint,
  mercureLint,
  mqttLint,
  mqtt5Lint,
  natsLint,
  redisLint,
  snsLint,
  solaceLint,
  sqsLint,
  stompLint,
  wsLint,
];

export default lints;
