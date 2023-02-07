/**
 * Omitted fixed fields:
 *  - tags
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: 'url',
    docs: '**REQUIRED**. A URL to the target host.  This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the AsyncAPI document is being served. Variable substitutions will be made when a variable is named in `{`braces`}`.',
  },
  {
    target: 'protocol',
    docs: '**REQUIRED**. The protocol this URL supports for connection. Supported protocol include, but are not limited to: `amqp`, `amqps`, `http`, `https`, `ibmmq`, `jms`, `kafka`, `kafka-secure`, `anypointmq`, `mqtt`, `secure-mqtt`, `solace`, `stomp`, `stomps`, `ws`, `wss`, `mercure`, `googlepubsub`.',
  },
  {
    target: 'protocolVersion',
    docs: 'The version of the protocol used for connection. For instance: AMQP `0.9.1`, HTTP `2.0`, Kafka `1.0.0`, etc.',
  },
  {
    target: 'description',
    docs: 'An optional string describing the host designated by the URL. [CommonMark syntax](https://spec.commonmark.org/) **MAY** be used for rich text representation.',
  },
  {
    target: 'variables',
    docs: "Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]\n\\\n\\\nA map between a variable name and its value.  The value is used for substitution in the server's URL template.",
  },
  {
    target: 'security',
    docs: '[[Security Requirement Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms can be used with this server. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a connection or operation.',
  },
  {
    target: 'bindings',
    docs: '[Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the server.',
  },
  {
    target: '$ref',
    docs: 'A reference to a server.',
  },
  {
    docs: '#### [Server Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject)\n\nAn object representing a message broker, a server or any other kind of computer program capable of sending and/or receiving data. This object is used to capture details such as URIs, protocols and security configuration. Variable substitution can be used so that some details, for example usernames and passwords, can be injected by code generation tools.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nurl | `string` | **REQUIRED**. A URL to the target host.  This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the AsyncAPI document is being served. Variable substitutions will be made when a variable is named in `{`braces`}`.\nprotocol | `string` | **REQUIRED**. The protocol this URL supports for connection. Supported protocol include, but are not limited to: `amqp`, `amqps`, `http`, `https`, `ibmmq`, `jms`, `kafka`, `kafka-secure`, `anypointmq`, `mqtt`, `secure-mqtt`, `solace`, `stomp`, `stomps`, `ws`, `wss`, `mercure`.\nprotocolVersion | `string` | The version of the protocol used for connection. For instance: AMQP `0.9.1`, HTTP `2.0`, Kafka `1.0.0`, etc.\ndescription | `string` | An optional string describing the host designated by the URL. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nvariables | Map[`string`, [Server Variable Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverVariableObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)]] | A map between a variable name and its value.  The value is used for substitution in the server\'s URL template.\nsecurity | [[Security Requirement Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securityRequirementObject)] | A declaration of which security mechanisms can be used with this server. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a connection or operation.\ntags | [Tags Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#tagsObject) | A list of tags for logical grouping and categorization of servers.\nbindings | [Server Bindings Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the server.\n\nThis object MAY be extended with [Specification Extensions](https://www.asyncapi.com/docs/reference/specification/v2.6.0#specificationExtensions).\n\n##### Server Object Example\n\nA single server would be described as:\n\n\n\\\nJSON\n\n\\\nJSON\n```json\n{\n  "url": "development.gigantic-server.com",\n  "description": "Development server",\n  "protocol": "kafka",\n  "protocolVersion": "1.0.0"\n}\n```\n\n\n\\\nYAML\n\n\\\nYAML\n```yaml\nurl: development.gigantic-server.com\ndescription: Development server\nprotocol: kafka\nprotocolVersion: \'1.0.0\'\n```',
  },
];
export default documentation;
