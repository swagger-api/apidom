/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  const jsonTransformed = str.replace(/```json/m, '\n\\\nJSON\n```json');
  const yamlTransformed = jsonTransformed.replace(/```yaml/m, '\n\\\nYAML\n```yaml');
  const transformed = JSON.stringify(yamlTransformed.trim().replace(/(\r\n|\n|\r)/gm, '\n'));
  console.log(transformed);
};

transform(`#### [Channel Binding Object](https://github.com/asyncapi/bindings/blob/master/amqp/README.md#channel-binding-object)

This object contains information about the channel representation in AMQP.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
\`is\` | string | Defines what type of channel is it. Can be either \`queue\` or \`routingKey\` (default).
\`exchange\` | Map[string, any] | When \`is\`=\`routingKey\`, this object defines the exchange properties.
\`exchange.name\` | string | The name of the exchange. It MUST NOT exceed 255 characters long.
\`exchange.type\` | string | The type of the exchange. Can be either \`topic\`, \`direct\`, \`fanout\`, \`default\` or \`headers\`.
\`exchange.durable\` | boolean | Whether the exchange should survive broker restarts or not.
\`exchange.autoDelete\` | boolean | Whether the exchange should be deleted when the last queue is unbound from it.
\`exchange.vhost\` | string | The virtual host of the exchange. Defaults to \`/\`.
\`queue\` | Map[string, any] | When \`is\`=\`queue\`, this object defines the queue properties.
\`queue.name\` | string | The name of the queue. It MUST NOT exceed 255 characters long.
\`queue.durable\` | boolean | Whether the queue should survive broker restarts or not.
\`queue.exclusive\` | boolean | Whether the queue should be used only by one connection or not.
\`queue.autoDelete\` | boolean | Whether the queue should be deleted when the last consumer unsubscribes.
\`queue.vhost\` | string | The virtual host of the queue. Defaults to \`/\`.
\`bindingVersion\` | string | The version of this binding. If omitted, "latest" MUST be assumed.

This object MUST contain only the properties defined above.

`);
