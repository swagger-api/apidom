import { DocumentationMeta } from '../../../../../apidom-language-types.ts';
import JSONSchema202012 from '../../target-specs.ts';

const documentation: DocumentationMeta[] = [
  {
    target: '$id',
    docs: 'The "$id" keyword identifies a schema resource with its canonical [RFC6596] URI.\n\\\n\\\nNote that this URI is an identifier and not necessarily a network locator. In the case of a network-addressable URL, a schema need not be downloadable from its canonical URI.',
    targetSpecs: JSONSchema202012,
  },
];

export default documentation;
