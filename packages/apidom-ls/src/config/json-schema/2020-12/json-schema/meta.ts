import $idMeta from './$id/meta.ts';
import $schemaMeta from './$schema/meta.ts';
import $refMeta from './$ref/meta.ts';
import { FormatMeta } from '../../../../apidom-language-types.ts';

const meta: FormatMeta = {
  lint: [...$idMeta.lint!, ...$schemaMeta.lint!, ...$refMeta.lint!],
  completion: [...$idMeta.completion!, ...$schemaMeta.completion!, ...$refMeta.completion!],
  documentation: [
    ...$idMeta.documentation!,
    ...$schemaMeta.documentation!,
    ...$refMeta.documentation!,
  ],
};

export default meta;
