import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import HttpChannelBindingElement from './bindings/http/HttpChannelBinding';
import WebSocketChannelBindingElement from './bindings/ws/WebSocketChannelBinding';
import KafkaChannelBindingElement from './bindings/kafka/KafkaChannelBinding';
import AnypointmqChannelBindingElement from './bindings/anypointmq/AnypointmqChannelBinding';
import AmqpChannelBindingElement from './bindings/amqp/AmqpChannelBinding';
import Amqp1ChannelBindingElement from './bindings/amqp1/Amqp1ChannelBinding';
import MqttChannelBindingElement from './bindings/mqtt/MqttChannelBinding';
import Mqtt5ChannelBindingElement from './bindings/mqtt5/Mqtt5ChannelBinding';
import NatsChannelBindingElement from './bindings/nats/NatsChannelBinding';
import JmsChannelBindingElement from './bindings/jms/JmsChannelBinding';
import SnsChannelBindingElement from './bindings/sns/SnsChannelBinding';
import SolaceChannelBindingElement from './bindings/solace/SolaceChannelBinding';
import SqsChannelBindingElement from './bindings/sqs/SqsChannelBinding';
import StompChannelBindingElement from './bindings/stomp/StompChannelBinding';
import RedisChannelBindingElement from './bindings/redis/RedisChannelBinding';
import MercureChannelBindingElement from './bindings/mercure/MercureChannelBinding';
import IbmmqChannelBindingElement from './bindings/ibmmq/IbmmqChannelBinding';
import GooglepubsubChannelBindingElement from './bindings/googlepubsub/GooglepubsubChannelBinding';

class ChannelBindings extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'channelBindings';
  }

  get http(): HttpChannelBindingElement | undefined {
    return this.get('http');
  }

  set http(http: HttpChannelBindingElement | undefined) {
    this.set('http', http);
  }

  get ws(): WebSocketChannelBindingElement | undefined {
    return this.get('ws');
  }

  set ws(ws: WebSocketChannelBindingElement | undefined) {
    this.set('ws', ws);
  }

  get kafka(): KafkaChannelBindingElement | undefined {
    return this.get('kafka');
  }

  set kafka(kafka: KafkaChannelBindingElement | undefined) {
    this.set('kafka', kafka);
  }

  get anypointmq(): AnypointmqChannelBindingElement | undefined {
    return this.get('anypointmq');
  }

  set anypointmq(anypointmq: AnypointmqChannelBindingElement | undefined) {
    this.set('anypointmq', anypointmq);
  }

  get amqp(): AmqpChannelBindingElement | undefined {
    return this.get('amqp');
  }

  set amqp(amqp: AmqpChannelBindingElement | undefined) {
    this.set('amqp', amqp);
  }

  get amqp1(): Amqp1ChannelBindingElement | undefined {
    return this.get('amqp1');
  }

  set amqp1(amqp1: Amqp1ChannelBindingElement | undefined) {
    this.set('amqp1', amqp1);
  }

  get mqtt(): MqttChannelBindingElement | undefined {
    return this.get('mqtt');
  }

  set mqtt(mqtt: MqttChannelBindingElement | undefined) {
    this.set('mqtt', mqtt);
  }

  get mqtt5(): Mqtt5ChannelBindingElement | undefined {
    return this.get('mqtt5');
  }

  set mqtt5(mqtt5: Mqtt5ChannelBindingElement | undefined) {
    this.set('mqtt5', mqtt5);
  }

  get nats(): NatsChannelBindingElement | undefined {
    return this.get('nats');
  }

  set nats(nats: NatsChannelBindingElement | undefined) {
    this.set('nats', nats);
  }

  get jms(): JmsChannelBindingElement | undefined {
    return this.get('jms');
  }

  set jms(jms: JmsChannelBindingElement | undefined) {
    this.set('jms', jms);
  }

  get sns(): SnsChannelBindingElement | undefined {
    return this.get('sns');
  }

  set sns(sns: SnsChannelBindingElement | undefined) {
    this.set('sns', sns);
  }

  get solace(): SolaceChannelBindingElement | undefined {
    return this.get('solace');
  }

  set solace(solace: SolaceChannelBindingElement | undefined) {
    this.set('solace', solace);
  }

  get sqs(): SqsChannelBindingElement | undefined {
    return this.get('sqs');
  }

  set sqs(sqs: SqsChannelBindingElement | undefined) {
    this.set('sqs', sqs);
  }

  get stomp(): StompChannelBindingElement | undefined {
    return this.get('stomp');
  }

  set stomp(stomp: StompChannelBindingElement | undefined) {
    this.set('stomp', stomp);
  }

  get redis(): RedisChannelBindingElement | undefined {
    return this.get('redis');
  }

  set redis(redis: RedisChannelBindingElement | undefined) {
    this.set('redis', redis);
  }

  get mercure(): MercureChannelBindingElement | undefined {
    return this.get('mercure');
  }

  set mercure(mercure: MercureChannelBindingElement | undefined) {
    this.set('mercure', mercure);
  }

  get googlepubsub(): GooglepubsubChannelBindingElement | undefined {
    return this.get('googlepubsub');
  }

  set googlepubsub(googlepubsub: GooglepubsubChannelBindingElement | undefined) {
    this.set('googlepubsub', googlepubsub);
  }

  get ibmmq(): IbmmqChannelBindingElement | undefined {
    return this.get('ibmmq');
  }

  set ibmmq(ibmmq: IbmmqChannelBindingElement | undefined) {
    this.set('ibmmq', ibmmq);
  }
}

export default ChannelBindings;
