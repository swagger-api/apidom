const contactDocs = [
  {
    target: 'name',
    docs: 'The identifying name of the contact person/organization.',
  },
  {
    target: 'url',
    docs: 'The URL pointing to the contact information. **MUST** be in the format of a URL.',
  },
  {
    target: 'email',
    docs: 'The email address of the contact person/organization. **MUST** be in the format of an email address.',
  },
  {
    docs: '#### Contact Object\n\nContact information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | The identifying name of the contact person/organization.\nurl | `string` | The URL pointing to the contact information. MUST be in the format of a URL.\nemail | `string` | The email address of the contact person/organization. MUST be in the format of an email address.\n\n\\\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions).\n\n##### Contact Object Example:\n\n```json\n{\n  "name": "API Support",\n  "url": "https://www.example.com/support",\n  "email": "support@example.com"\n}\n```\n\n```yaml\nname: API Support\nurl: https://www.example.com/support\nemail: support@example.com\n```',
  },
];
export default contactDocs;
