import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import HttpMessageBindingElement from './bindings/http/HttpMessageBinding';
import WebSocketMessageBindingElement from './bindings/ws/WebSocketMessageBinding';
import KafkaMessageBindingElement from './bindings/kafka/KafkaMessageBinding';
import AnypointmqMessageBindingElement from './bindings/anypointmq/AnypointmqMessageBinding';
import AmqpMessageBindingElement from './bindings/amqp/AmqpMessageBinding';
import Amqp1MessageBindingElement from './bindings/amqp1/Amqp1MessageBinding';
import MqttMessageBindingElement from './bindings/mqtt/MqttMessageBinding';
import Mqtt5MessageBindingElement from './bindings/mqtt5/Mqtt5MessageBinding';
import NatsMessageBindingElement from './bindings/nats/NatsMessageBinding';
import JmsMessageBindingElement from './bindings/jms/JmsMessageBinding';
import SnsMessageBindingElement from './bindings/sns/SnsMessageBinding';
import SolaceMessageBindingElement from './bindings/solace/SolaceMessageBinding';
import SqsMessageBindingElement from './bindings/sqs/SqsMessageBinding';
import StompMessageBindingElement from './bindings/stomp/StompMessageBinding';
import RedisMessageBindingElement from './bindings/redis/RedisMessageBinding';
import MercureMessageBindingElement from './bindings/mercure/MercureMessageBinding';
import IbmmqMessageBindingElement from './bindings/ibmmq/IbmmqMessageBinding';
import GooglepubsubMessageBindingElement from './bindings/googlepubsub/GooglepubsubMessageBinding';

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
