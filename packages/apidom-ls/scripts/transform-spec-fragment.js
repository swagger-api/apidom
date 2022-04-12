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

transform(``);
