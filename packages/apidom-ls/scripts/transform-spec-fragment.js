/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  console.log(JSON.stringify(str.trim().replace(/(\r\n|\n|\r)/gm, '\n')));
};

transform(
  `[Contact Object](https://www.asyncapi.com/docs/specifications/v2.3.0#contactObject)
\\
\\
Contact information for the exposed API.`,
);
