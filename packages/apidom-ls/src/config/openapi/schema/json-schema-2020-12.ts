import jsonSchema202012Lint from '../../json-schema/2020-12/json-schema/lint/index.ts';
import jsonSchema202012Completion from '../../json-schema/2020-12/json-schema/completion.ts';
import jsonSchema202012Documentation from '../../json-schema/2020-12/json-schema/documentation.ts';
import { compose, assoc, assocElement } from '../../json-schema/2020-12/target-specs.ts';
import { OpenAPI31, OpenAPI32 } from '../target-specs.ts';
import {
  ApidomCompletionItem,
  DocumentationMeta,
  LinterMeta,
} from '../../../apidom-language-types.ts';

// JSON Schema Hyper-Schema keywords are not part of the OpenAPI Schema Object dialect
const hyperSchemaKeywords = ['base', 'links'];

const toOpenAPI = <T>(rule: T): T =>
  assocElement('schema')(assoc([...OpenAPI31, ...OpenAPI32])(rule));

export const lint: LinterMeta[] = compose(
  jsonSchema202012Lint.filter((rule) => !hyperSchemaKeywords.includes(rule.target ?? '')),
  toOpenAPI,
);

export const completion: ApidomCompletionItem[] = compose(
  jsonSchema202012Completion.filter((item) => !hyperSchemaKeywords.includes(item.label)),
  toOpenAPI,
);

export const documentation: DocumentationMeta[] = compose(
  jsonSchema202012Documentation.filter(
    (doc) => doc.target !== undefined && !hyperSchemaKeywords.includes(doc.target),
  ),
  toOpenAPI,
);
