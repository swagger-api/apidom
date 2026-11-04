import { completion as jsonSchema202012Completion } from './json-schema-2020-12.ts';
import commonSchemaCompletion from '../../common/schema/completion.ts';
import { ApidomCompletionItem } from '../../../apidom-language-types.ts';

const completion: ApidomCompletionItem[] = [
  ...jsonSchema202012Completion,
  ...commonSchemaCompletion,
];

export default completion;
