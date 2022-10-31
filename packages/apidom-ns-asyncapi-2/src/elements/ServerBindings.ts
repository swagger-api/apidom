import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import HttpServerBindingElement from './bindings/http/HttpServerBinding';
import WebSocketServerBindingElement from './bindings/ws/WebSocketServerBinding';
import KafkaServerBindingElement from './bindings/kafka/KafkaServerBinding';
import AnypointmqServerBindingElement from './bindings/anypointmq/AnypointmqServerBinding';
import AmqpServerBindingElement from './bindings/amqp/AmqpServerBinding';
import Amqp1ServerBindingElement from './bindings/amqp1/Amqp1ServerBinding';
import MqttServerBindingElement from './bindings/mqtt/MqttServerBinding';
import Mqtt5ServerBindingElement from './bindings/mqtt5/Mqtt5ServerBinding';
import NatsServerBindingElement from './bindings/nats/NatsServerBinding';
import JmsServerBindingElement from './bindings/jms/JmsServerBinding';
import SnsServerBindingElement from './bindings/sns/SnsServerBinding';
import SolaceServerBindingElement from './bindings/solace/SolaceServerBinding';
import SqsServerBindingElement from './bindings/sqs/SqsServerBinding';
import StompServerBindingElement from './bindings/stomp/StompServerBinding';
import RedisServerBindingElement from './bindings/redis/RedisServerBinding';
import MercureServerBindingElement from './bindings/mercure/MercureServerBinding';
import IbmmqServerBindingElement from './bindings/ibmmq/IbmmqServerBinding';
import GooglePubSubServerBindingElement from './bindings/googlepubsub/GooglePubSubServerBinding';

class ServerBindings extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'serverBindings';
  }

  get http(): HttpServerBindingElement | undefined {
    return this.get('http');
  }

  set http(http: HttpServerBindingElement | undefined) {
    this.set('http', http);
  }

  get ws(): WebSocketServerBindingElement | undefined {
    return this.get('ws');
  }

  set ws(ws: WebSocketServerBindingElement | undefined) {
    this.set('ws', ws);
  }

  get kafka(): KafkaServerBindingElement | undefined {
    return this.get('kafka');
  }

  set kafka(kafka: KafkaServerBindingElement | undefined) {
    this.set('kafka', kafka);
  }

  get anypointmq(): AnypointmqServerBindingElement | undefined {
    return this.get('anypointmq');
  }

  set anypointmq(anypointmq: AnypointmqServerBindingElement | undefined) {
    this.set('anypointmq', anypointmq);
  }

  get amqp(): AmqpServerBindingElement | undefined {
    return this.get('amqp');
  }

  set amqp(amqp: AmqpServerBindingElement | undefined) {
    this.set('amqp', amqp);
  }

  get amqp1(): Amqp1ServerBindingElement | undefined {
    return this.get('amqp1');
  }

  set amqp1(amqp1: Amqp1ServerBindingElement | undefined) {
    this.set('amqp1', amqp1);
  }

  get mqtt(): MqttServerBindingElement | undefined {
    return this.get('mqtt');
  }

  set mqtt(mqtt: MqttServerBindingElement | undefined) {
    this.set('mqtt', mqtt);
  }

  get mqtt5(): Mqtt5ServerBindingElement | undefined {
    return this.get('mqtt5');
  }

  set mqtt5(mqtt5: Mqtt5ServerBindingElement | undefined) {
    this.set('mqtt5', mqtt5);
  }

  get nats(): NatsServerBindingElement | undefined {
    return this.get('nats');
  }

  set nats(nats: NatsServerBindingElement | undefined) {
    this.set('nats', nats);
  }

  get jms(): JmsServerBindingElement | undefined {
    return this.get('jms');
  }

  set jms(jms: JmsServerBindingElement | undefined) {
    this.set('jms', jms);
  }

  get sns(): SnsServerBindingElement | undefined {
    return this.get('sns');
  }

  set sns(sns: SnsServerBindingElement | undefined) {
    this.set('sns', sns);
  }

  get solace(): SolaceServerBindingElement | undefined {
    return this.get('solace');
  }

  set solace(solace: SolaceServerBindingElement | undefined) {
    this.set('solace', solace);
  }

  get sqs(): SqsServerBindingElement | undefined {
    return this.get('sqs');
  }

  set sqs(sqs: SqsServerBindingElement | undefined) {
    this.set('sqs', sqs);
  }

  get stomp(): StompServerBindingElement | undefined {
    return this.get('stomp');
  }

  set stomp(stomp: StompServerBindingElement | undefined) {
    this.set('stomp', stomp);
  }

  get redis(): RedisServerBindingElement | undefined {
    return this.get('redis');
  }

  set redis(redis: RedisServerBindingElement | undefined) {
    this.set('redis', redis);
  }

  get mercure(): MercureServerBindingElement | undefined {
    return this.get('mercure');
  }

  set mercure(mercure: MercureServerBindingElement | undefined) {
    this.set('mercure', mercure);
  }

  get googlepubsub(): GooglePubSubServerBindingElement | undefined {
    return this.get('googlepubsub');
  }

  set googlepubsub(googlepubsub: GooglePubSubServerBindingElement | undefined) {
    this.set('googlepubsub', googlepubsub);
  }

  get ibmmq(): IbmmqServerBindingElement | undefined {
    return this.get('ibmmq');
  }

  set ibmmq(ibmmq: IbmmqServerBindingElement | undefined) {
    this.set('ibmmq', ibmmq);
  }
}

export default ServerBindings;
