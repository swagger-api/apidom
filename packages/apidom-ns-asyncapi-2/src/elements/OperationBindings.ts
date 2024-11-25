import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import HttpOperationBindingElement from './bindings/http/HttpOperationBinding.ts';
import WebSocketOperationBindingElement from './bindings/ws/WebSocketOperationBinding.ts';
import KafkaOperationBindingElement from './bindings/kafka/KafkaOperationBinding.ts';
import AnypointmqOperationBindingElement from './bindings/anypointmq/AnypointmqOperationBinding.ts';
import AmqpOperationBindingElement from './bindings/amqp/AmqpOperationBinding.ts';
import Amqp1OperationBindingElement from './bindings/amqp1/Amqp1OperationBinding.ts';
import MqttOperationBindingElement from './bindings/mqtt/MqttOperationBinding.ts';
import Mqtt5OperationBindingElement from './bindings/mqtt5/Mqtt5OperationBinding.ts';
import NatsOperationBindingElement from './bindings/nats/NatsOperationBinding.ts';
import JmsOperationBindingElement from './bindings/jms/JmsOperationBinding.ts';
import SnsOperationBindingElement from './bindings/sns/SnsOperationBinding.ts';
import SolaceOperationBindingElement from './bindings/solace/SolaceOperationBinding.ts';
import SqsOperationBindingElement from './bindings/sqs/SqsOperationBinding.ts';
import StompOperationBindingElement from './bindings/stomp/StompOperationBinding.ts';
import RedisOperationBindingElement from './bindings/redis/RedisOperationBinding.ts';
import MercureOperationBindingElement from './bindings/mercure/MercureOperationBinding.ts';
import IbmmqOperationBindingElement from './bindings/ibmmq/IbmmqOperationBinding.ts';
import GooglepubsubOperationBindingElement from './bindings/googlepubsub/GooglepubsubOperationBinding.ts';

/**
 * @public
 */
class OperationBindings extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operationBindings';
  }

  get http(): HttpOperationBindingElement | undefined {
    return this.get('http');
  }

  set http(http: HttpOperationBindingElement | undefined) {
    this.set('http', http);
  }

  get ws(): WebSocketOperationBindingElement | undefined {
    return this.get('ws');
  }

  set ws(ws: WebSocketOperationBindingElement | undefined) {
    this.set('ws', ws);
  }

  get kafka(): KafkaOperationBindingElement | undefined {
    return this.get('kafka');
  }

  set kafka(kafka: KafkaOperationBindingElement | undefined) {
    this.set('kafka', kafka);
  }

  get anypointmq(): AnypointmqOperationBindingElement | undefined {
    return this.get('anypointmq');
  }

  set anypointmq(anypointmq: AnypointmqOperationBindingElement | undefined) {
    this.set('anypointmq', anypointmq);
  }

  get amqp(): AmqpOperationBindingElement | undefined {
    return this.get('amqp');
  }

  set amqp(amqp: AmqpOperationBindingElement | undefined) {
    this.set('amqp', amqp);
  }

  get amqp1(): Amqp1OperationBindingElement | undefined {
    return this.get('amqp1');
  }

  set amqp1(amqp1: Amqp1OperationBindingElement | undefined) {
    this.set('amqp1', amqp1);
  }

  get mqtt(): MqttOperationBindingElement | undefined {
    return this.get('mqtt');
  }

  set mqtt(mqtt: MqttOperationBindingElement | undefined) {
    this.set('mqtt', mqtt);
  }

  get mqtt5(): Mqtt5OperationBindingElement | undefined {
    return this.get('mqtt5');
  }

  set mqtt5(mqtt5: Mqtt5OperationBindingElement | undefined) {
    this.set('mqtt5', mqtt5);
  }

  get nats(): NatsOperationBindingElement | undefined {
    return this.get('nats');
  }

  set nats(nats: NatsOperationBindingElement | undefined) {
    this.set('nats', nats);
  }

  get jms(): JmsOperationBindingElement | undefined {
    return this.get('jms');
  }

  set jms(jms: JmsOperationBindingElement | undefined) {
    this.set('jms', jms);
  }

  get sns(): SnsOperationBindingElement | undefined {
    return this.get('sns');
  }

  set sns(sns: SnsOperationBindingElement | undefined) {
    this.set('sns', sns);
  }

  get solace(): SolaceOperationBindingElement | undefined {
    return this.get('solace');
  }

  set solace(solace: SolaceOperationBindingElement | undefined) {
    this.set('solace', solace);
  }

  get sqs(): SqsOperationBindingElement | undefined {
    return this.get('sqs');
  }

  set sqs(sqs: SqsOperationBindingElement | undefined) {
    this.set('sqs', sqs);
  }

  get stomp(): StompOperationBindingElement | undefined {
    return this.get('stomp');
  }

  set stomp(stomp: StompOperationBindingElement | undefined) {
    this.set('stomp', stomp);
  }

  get redis(): RedisOperationBindingElement | undefined {
    return this.get('redis');
  }

  set redis(redis: RedisOperationBindingElement | undefined) {
    this.set('redis', redis);
  }

  get mercure(): MercureOperationBindingElement | undefined {
    return this.get('mercure');
  }

  set mercure(mercure: MercureOperationBindingElement | undefined) {
    this.set('mercure', mercure);
  }

  get googlepubsub(): GooglepubsubOperationBindingElement | undefined {
    return this.get('googlepubsub');
  }

  set googlepubsub(googlepubsub: GooglepubsubOperationBindingElement | undefined) {
    this.set('googlepubsub', googlepubsub);
  }

  get ibmmq(): IbmmqOperationBindingElement | undefined {
    return this.get('ibmmq');
  }

  set ibmmq(ibmmq: IbmmqOperationBindingElement | undefined) {
    this.set('ibmmq', ibmmq);
  }
}

export default OperationBindings;
