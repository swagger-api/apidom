const infoDocs = [
  {
    target: 'title',
    docs: '**Required.** The title of the application.',
  },
  {
    target: 'version',
    docs: '**Required.** Provides the version of the application API (not to be confused with the specification version).',
  },
  {
    target: 'description',
    docs: 'A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
  {
    target: 'termsOfService',
    docs: 'A URL to the Terms of Service for the API. MUST be in the format of a URL.',
  },
  {
    target: 'contact',
    docs: '[Contact Object](https://www.asyncapi.com/docs/specifications/v2.3.0#contactObject)\n\\\n\\\nContact information for the exposed API.',
  },
  {
    target: 'license',
    docs: '[License Object](https://www.asyncapi.com/docs/specifications/v2.3.0#licenseObject)\n\\\n\\\nLicense information for the exposed API.',
  },
];
export default infoDocs;
