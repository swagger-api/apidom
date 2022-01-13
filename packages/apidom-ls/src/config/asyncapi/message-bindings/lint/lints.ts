import messageBindings$RefLint from './ref';
import messageBindingsRefNonSiblingsLint from './ref-non-siblings';
import messageBindingsAllowedFields2021Lint from './allowed-fields-2_0-2_1';
import messageBindingsAllowedFields22Lint from './allowed-fields-2_2';
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
import sqsLint from './sqs';
import stompLint from './stomp';
import wsLint from './ws';

const messageBindingsLints = [
  messageBindingsAllowedFields2021Lint,
  messageBindingsAllowedFields22Lint,
  messageBindings$RefLint,
  messageBindingsRefNonSiblingsLint,
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
  sqsLint,
  stompLint,
  wsLint,
];

export default messageBindingsLints;
