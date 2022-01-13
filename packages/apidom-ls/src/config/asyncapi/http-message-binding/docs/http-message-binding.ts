const httpMessageBindingDocs = [
  {
    target: 'headers',
    docs: '[Schema object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject)\n\n ---- \n\nA Schema object containing the definitions for HTTP-specific headers. This schema MUST be of type `object` and have a `properties` key.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "latest" MUST be assumed.',
  },
  {
    docs: 'This object contains information about the message representation in HTTP.',
  },
];
export default httpMessageBindingDocs;
