/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  console.log(JSON.stringify(str.trim().replace(/(\r\n|\n|\r)/gm, '\n')));
};

transform(`[Schema Object](https://www.asyncapi.com/docs/specifications/v2.3.0#schemaObject) \\| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html)
\\
\\
 The message key. **NOTE**: You can also use the [reference object](https://asyncapi.io/docs/specifications/v2.3.0#referenceObject) way.`);
