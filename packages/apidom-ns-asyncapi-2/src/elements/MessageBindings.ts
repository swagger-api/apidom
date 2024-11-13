import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import HttpMessageBindingElement from './bindings/http/HttpMessageBinding.ts';
import WebSocketMessageBindingElement from './bindings/ws/WebSocketMessageBinding.ts';
import KafkaMessageBindingElement from './bindings/kafka/KafkaMessageBinding.ts';
import AnypointmqMessageBindingElement from './bindings/anypointmq/AnypointmqMessageBinding.ts';
import AmqpMessageBindingElement from './bindings/amqp/AmqpMessageBinding.ts';
import Amqp1MessageBindingElement from './bindings/amqp1/Amqp1MessageBinding.ts';
import MqttMessageBindingElement from './bindings/mqtt/MqttMessageBinding.ts';
import Mqtt5MessageBindingElement from './bindings/mqtt5/Mqtt5MessageBinding.ts';
import NatsMessageBindingElement from './bindings/nats/NatsMessageBinding.ts';
import JmsMessageBindingElement from './bindings/jms/JmsMessageBinding.ts';
import SnsMessageBindingElement from './bindings/sns/SnsMessageBinding.ts';
import SolaceMessageBindingElement from './bindings/solace/SolaceMessageBinding.ts';
import SqsMessageBindingElement from './bindings/sqs/SqsMessageBinding.ts';
import StompMessageBindingElement from './bindings/stomp/StompMessageBinding.ts';
import RedisMessageBindingElement from './bindings/redis/RedisMessageBinding.ts';
import MercureMessageBindingElement from './bindings/mercure/MercureMessageBinding.ts';
import IbmmqMessageBindingElement from './bindings/ibmmq/IbmmqMessageBinding.ts';
import GooglepubsubMessageBindingElement from './bindings/googlepubsub/GooglepubsubMessageBinding.ts';

class MessageBindings extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'messageBindings';
  }

  get http(): HttpMessageBindingElement | undefined {
    return this.get('http');
  }

  set http(http: HttpMessageBindingElement | undefined) {
    this.set('http', http);
  }

  get ws(): WebSocketMessageBindingElement | undefined {
    return this.get('ws');
  }

  set ws(ws: WebSocketMessageBindingElement | undefined) {
    this.set('ws', ws);
  }

  get kafka(): KafkaMessageBindingElement | undefined {
    return this.get('kafka');
  }

  set kafka(kafka: KafkaMessageBindingElement | undefined) {
    this.set('kafka', kafka);
  }

  get anypointmq(): AnypointmqMessageBindingElement | undefined {
    return this.get('anypointmq');
  }

  set anypointmq(anypointmq: AnypointmqMessageBindingElement | undefined) {
    this.set('anypointmq', anypointmq);
  }

  get amqp(): AmqpMessageBindingElement | undefined {
    return this.get('amqp');
  }

  set amqp(amqp: AmqpMessageBindingElement | undefined) {
    this.set('amqp', amqp);
  }

  get amqp1(): Amqp1MessageBindingElement | undefined {
    return this.get('amqp1');
  }

  set amqp1(amqp1: Amqp1MessageBindingElement | undefined) {
    this.set('amqp1', amqp1);
  }

  get mqtt(): MqttMessageBindingElement | undefined {
    return this.get('mqtt');
  }

  set mqtt(mqtt: MqttMessageBindingElement | undefined) {
    this.set('mqtt', mqtt);
  }

  get mqtt5(): Mqtt5MessageBindingElement | undefined {
    return this.get('mqtt5');
  }

  set mqtt5(mqtt5: Mqtt5MessageBindingElement | undefined) {
    this.set('mqtt5', mqtt5);
  }

  get nats(): NatsMessageBindingElement | undefined {
    return this.get('nats');
  }

  set nats(nats: NatsMessageBindingElement | undefined) {
    this.set('nats', nats);
  }

  get jms(): JmsMessageBindingElement | undefined {
    return this.get('jms');
  }

  set jms(jms: JmsMessageBindingElement | undefined) {
    this.set('jms', jms);
  }

  get sns(): SnsMessageBindingElement | undefined {
    return this.get('sns');
  }

  set sns(sns: SnsMessageBindingElement | undefined) {
    this.set('sns', sns);
  }

  get solace(): SolaceMessageBindingElement | undefined {
    return this.get('solace');
  }

  set solace(solace: SolaceMessageBindingElement | undefined) {
    this.set('solace', solace);
  }

  get sqs(): SqsMessageBindingElement | undefined {
    return this.get('sqs');
  }

  set sqs(sqs: SqsMessageBindingElement | undefined) {
    this.set('sqs', sqs);
  }

  get stomp(): StompMessageBindingElement | undefined {
    return this.get('stomp');
  }

  set stomp(stomp: StompMessageBindingElement | undefined) {
    this.set('stomp', stomp);
  }

  get redis(): RedisMessageBindingElement | undefined {
    return this.get('redis');
  }

  set redis(redis: RedisMessageBindingElement | undefined) {
    this.set('redis', redis);
  }

  get mercure(): MercureMessageBindingElement | undefined {
    return this.get('mercure');
  }

  set mercure(mercure: MercureMessageBindingElement | undefined) {
    this.set('mercure', mercure);
  }

  get googlepubsub(): GooglepubsubMessageBindingElement | undefined {
    return this.get('googlepubsub');
  }

  set googlepubsub(googlepubsub: GooglepubsubMessageBindingElement | undefined) {
    this.set('googlepubsub', googlepubsub);
  }

  get ibmmq(): IbmmqMessageBindingElement | undefined {
    return this.get('ibmmq');
  }

  set ibmmq(ibmmq: IbmmqMessageBindingElement | undefined) {
    this.set('ibmmq', ibmmq);
  }
}

export default MessageBindings;
