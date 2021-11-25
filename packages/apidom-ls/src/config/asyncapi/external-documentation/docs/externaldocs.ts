const externalDocsDocs = [
  {
    docs: '#### External Documentation Object\\n\\nAllows referencing an external resource for extended documentation.\\n\\n##### Fixed Fields\\n\\n**description** (`string`) : A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\\n\\n**url** (`string`) : **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\\n\\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
  },
  {
    target: 'url',
    docs: '**Required.** The URL for the target documentation. Value MUST be in the format of a URL.',
  },
  {
    target: 'description',
    docs: 'A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
  },
];
export default externalDocsDocs;
