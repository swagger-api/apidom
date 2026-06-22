import { A2A1 } from '../target-specs.ts';

/**
 * Hover documentation for A2A v1 APIKeySecurityScheme fields.
 * See [APIKeySecurityScheme](https://a2a-protocol.org/latest/specification/#452-apikeysecurityscheme).
 */
const documentation = [
  {
    target: 'description',
    docs: 'An optional description for the security scheme (string).',
    targetSpecs: A2A1,
  },
  {
    target: 'location',
    docs: 'The location of the API key. Valid values are "query", "header", or "cookie" (string, required).',
    targetSpecs: A2A1,
  },
  {
    target: 'name',
    docs: 'The name of the header, query, or cookie parameter to be used (string, required).',
    targetSpecs: A2A1,
  },
];

export default documentation;
