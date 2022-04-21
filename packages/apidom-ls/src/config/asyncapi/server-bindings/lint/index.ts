import serverBindings$RefLint from './ref';
import serverBindingsRefNonSiblingsLint from './ref-non-siblings';
import serverBindingsAllowedFields2_0__2_1Lint from './allowed-fields-2-0--2-1';
import serverBindingsAllowedFields2_2Lint from './allowed-fields-2-2';
import serverBindingsAllowedFields2_3Lint from './allowed-fields-2-3';
import httpLint from './http';
import amqpLint from './amqp';
import amqp1Lint from './amqp1';
import anypointmqLint from './anypointmq';
import ibmmqLint from './ibmmq';
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
  serverBindingsAllowedFields2_0__2_1Lint,
  serverBindingsAllowedFields2_2Lint,
  serverBindingsAllowedFields2_3Lint,
  serverBindings$RefLint,
  serverBindingsRefNonSiblingsLint,
  httpLint,
  amqpLint,
  amqp1Lint,
  anypointmqLint,
  ibmmqLint,
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
