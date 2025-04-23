import $idCompletion from './$id/completion.ts';
import $schemaCompletion from './$schema/completion.ts';
import $refCompletion from './$ref/completion.ts';
import $commentCompletion from './$comment/completion.ts';
import { ApidomCompletionItem } from '../../../../apidom-language-types.ts';
import { compose } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = compose([
  $idCompletion,
  $schemaCompletion,
  $refCompletion,
  $commentCompletion,
]);

export default completion;
