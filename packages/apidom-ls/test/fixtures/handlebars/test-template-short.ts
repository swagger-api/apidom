export const testTemplateShort = '# {{artifactId}}\n' +
    '------------ | ------------- | ------------- | -------------\n' +
    '{{#apiInfo}}{{#apis}}{{#operations}}{{#operation}}*{{#s}}* | [**{{operationId}}**]({{apiDocPath}}{{classname}}.md#{{operationId}}) | **{{httpMethod}}** {{path}} | {{#summary}}{{summary}}{{/summary}}\n' +
    '{{/operation}}{{/operations}}{{/apis}}{{/apiInfo}}\n';