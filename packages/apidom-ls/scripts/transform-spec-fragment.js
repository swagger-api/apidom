/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  console.log(JSON.stringify(str.trim().replace(/(\r\n|\n|\r)/gm, '\n')));
};

transform(
  `#### [Channel Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#channelBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)
A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the channel.`,
);
