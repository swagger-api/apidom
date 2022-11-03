const documentation = [
  {
    target: 'is',
    docs: 'Defines what type of channel is it. Can be either `queue` or `routingKey` (default).',
  },
  {
    target: 'exchange',
    docs: '`Map[string, any]`\n\\\n\\\nWhen `is=routingKey`, this object defines the exchange properties.',
  },
  {
    target: 'queue',
    docs: '`Map[string, any]`\n\\\n\\\nWhen `is=queue`, this object defines the queue properties.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.2.0" MUST be assumed.',
  },
  {
    docs: '#### [Channel Binding Object](https://github.com/asyncapi/bindings/tree/master/amqp#channel)\n\nThis object contains information about the channel representation in AMQP.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n`is` | string | Defines what type of channel is it. Can be either `queue` or `routingKey` (default).\n`exchange` | Map[string, any] | When `is`=`routingKey`, this object defines the exchange properties.\n`exchange.name` | string | The name of the exchange. It MUST NOT exceed 255 characters long.\n`exchange.type` | string | The type of the exchange. Can be either `topic`, `direct`, `fanout`, `default` or `headers`.\n`exchange.durable` | boolean | Whether the exchange should survive broker restarts or not.\n`exchange.autoDelete` | boolean | Whether the exchange should be deleted when the last queue is unbound from it.\n`exchange.vhost` | string | The virtual host of the exchange. Defaults to `/`.\n`queue` | Map[string, any] | When `is`=`queue`, this object defines the queue properties.\n`queue.name` | string | The name of the queue. It MUST NOT exceed 255 characters long.\n`queue.durable` | boolean | Whether the queue should survive broker restarts or not.\n`queue.exclusive` | boolean | Whether the queue should be used only by one connection or not.\n`queue.autoDelete` | boolean | Whether the queue should be deleted when the last consumer unsubscribes.\n`queue.vhost` | string | The virtual host of the queue. Defaults to `/`.\n`bindingVersion` | string | The version of this binding. If omitted, "0.2.0" MUST be assumed.\n\nThis object MUST contain only the properties defined above.\n\n##### Example\n\n\n\\\nYAML\n```yaml\nchannels:\n  user/signedup:\n    bindings:\n      amqp:\n        is: routingKey\n        queue:\n          name: my-queue-name\n          durable: true\n          exclusive: true\n          autoDelete: false\n          vhost: /\n        exchange:\n          name: myExchange\n          type: topic\n          durable: true\n          autoDelete: false\n          vhost: /\n        bindingVersion: 0.2.0\n```',
  },
];
export default documentation;
