import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const documentation = [
  {
    target: 'name',
    docs: 'The identifying name of the contact person/organization.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'url',
    docs: 'The URL pointing to the contact information. This MUST be in the form of a URL.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'email',
    docs: 'The email address of the contact person/organization. This MUST be in the form of an email address.',
    targetSpecs: OpenAPI3,
  },
  {
    docs: '#### [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#contactObject)\n\nContact information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | The identifying name of the contact person/organization.\nurl | `string` | The URL pointing to the contact information. MUST be in the format of a URL.\nemail | `string` | The email address of the contact person/organization. MUST be in the format of an email address.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### Contact Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "API Support",\n  "url": "http://www.example.com/support",\n  "email": "support@example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: API Support\nurl: http://www.example.com/support\nemail: support@example.com\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contactObject)\n\nContact information for the exposed API.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nname | `string` | The identifying name of the contact person/organization.\nurl | `string` | The URL pointing to the contact information. This MUST be in the form of a URL.\nemail | `string` | The email address of the contact person/organization. This MUST be in the form of an email address.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Contact Object Example\n\n\n\\\nJSON\n```json\n{\n  "name": "API Support",\n  "url": "https://www.example.com/support",\n  "email": "support@example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\nname: API Support\nurl: https://www.example.com/support\nemail: support@example.com\n```',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
