const infoDocs = [
  {
    target: 'contact',
    docs: '[Contact Object](https://www.asyncapi.com/docs/specifications/v2.2.0#contactObject) - Contact information for the exposed API.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
  {
    target: 'license',
    docs: '[License Object](https://www.asyncapi.com/docs/specifications/v2.2.0#licenseObject) - License information for the exposed API.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
  {
    target: 'title',
    docs: '**Required.** The title of the application.',
  },
  {
    target: 'version',
    docs: '**Required** Provides the version of the application API (not to be confused with the specification version).',
  },
  {
    target: 'description',
    docs: 'A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'termsOfService',
    docs: 'A URL to the Terms of Service for the API. MUST be in the format of a URL.',
  },
];
export default infoDocs;
