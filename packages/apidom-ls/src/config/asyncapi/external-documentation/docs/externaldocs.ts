const externalDocsDocs = [
  {
    docs: '#### External Documentation Object\n\n ---- \n\nnAllows referencing an external resource for extended documentation.\n\n ---- \n\n##### Fixed Fields\n\n ---- \n\n**description** (`string`) : A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\n\n ---- \n\n**url** (`string`) : **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
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
