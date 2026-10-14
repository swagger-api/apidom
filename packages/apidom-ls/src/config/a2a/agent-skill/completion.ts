import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { A2A1 } from '../target-specs.ts';

const skillField = (
  label: string,
  format: CompletionFormat,
  docs: string,
): ApidomCompletionItem => ({
  label,
  insertText: label,
  kind: 14,
  format,
  type: CompletionType.PROPERTY,
  insertTextFormat: 2,
  documentation: { kind: 'markdown', value: docs },
  targetSpecs: A2A1,
});

const completion: ApidomCompletionItem[] = [
  skillField('id', CompletionFormat.QUOTED, 'Unique identifier for the skill.'),
  skillField('name', CompletionFormat.QUOTED, 'Human-readable name for the skill.'),
  skillField('description', CompletionFormat.QUOTED, 'Detailed description of the skill.'),
  skillField('tags', CompletionFormat.ARRAY, "Keywords describing the skill's capabilities."),
  skillField(
    'examples',
    CompletionFormat.ARRAY,
    'Example prompts or scenarios this skill can handle.',
  ),
  skillField(
    'inputModes',
    CompletionFormat.ARRAY,
    "Supported input media types for this skill, overriding the agent's defaults.",
  ),
  skillField(
    'outputModes',
    CompletionFormat.ARRAY,
    "Supported output media types for this skill, overriding the agent's defaults.",
  ),
  skillField(
    'securityRequirements',
    CompletionFormat.ARRAY,
    'Security schemes necessary for this skill.',
  ),
];

export default completion;
