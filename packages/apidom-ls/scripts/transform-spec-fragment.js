/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  console.log(JSON.stringify(str.trim().replace(/(\r\n|\n|\r)/gm, '\n')));
};

transform(
  `[HTTP Message Binding](https://github.com/asyncapi/bindings/blob/master/http#message)
\\
\\
Protocol-specific information for an HTTP message.`,
);
