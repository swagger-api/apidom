// eslint-disable-next-line import/prefer-default-export
export const testTemplateShort =
  '{{!mustache}}\n# {{artifactId}}\n' +
  '------------ | ------------- | ------------- | -------------\n' +
  '{{#apiInfo}}{{#apis}}{{#operations}}{{#operation}}*{{#s}}* | [**{{operationId}}**]({{apiDocPath}}{{classname}}.md#{{operationId}}) | **{{httpMethod}}** {{path}} | {{#summary}}{{summary}}{{/summary}}\n' +
  '{{/operation}}{{/operations}}{{/apis}}{{/apiInfo}}\n';
