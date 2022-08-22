const documentation = [
  {
    target: 'url',
    docs: '**REQUIRED.** A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenAPI document is being served. Variable substitutions will be made when a variable is named in `{` brackets `}`.',
  },
  {
    target: 'description',
    docs: 'An optional string describing the host designated by the URL. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
  },
  {
    target: 'variables',
    docs: "A map between a variable name and its value. The value is used for substitution in the server's URL template.",
  },
];

export default documentation;
