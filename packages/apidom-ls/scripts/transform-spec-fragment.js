/**
 * Before using transform function please use
 * this tool https://markdown-it.github.io/ to verify how your Markdown renders.
 */

const transform = (str) => {
  const transformed = JSON.stringify(str.trim().replace(/(\r\n|\n|\r)/gm, '\n'));
  const jsonTransformed = transformed.replace(/```json/m, '\n\\\nJSON\n```json');
  const yamlTransformed = jsonTransformed.replace(/```yaml/m, '\n\\\nYAML\n```yaml');
  console.log(yamlTransformed);
};

transform(
  `\`\`\`json
  test
  \`\`\`
  `,
);
