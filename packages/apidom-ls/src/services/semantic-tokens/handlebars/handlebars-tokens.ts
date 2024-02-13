import { TextDocument } from 'vscode-languageserver-textdocument';
import { SemanticTokens } from 'vscode-languageserver-protocol';

import {
  getAllMustacheTags,
  markOverlappingTags,
  MustacheTag,
  parseMustacheTags,
  sortTags,
} from '../../../utils/handlebars/utils';

export interface CompletionsCollector {
  add(suggestion: unknown): void;
  setAsIncomplete(): void;
  getNumberOfProposals(): number;
}

function tokenize(
  textDocument: TextDocument,
  isSemanticToken: (token: string) => boolean,
  getTokenModifiers: (modifiers: string[]) => number,
  getTokenType: (type: string) => number,
): SemanticTokens {
  const tokens: number[][] = [];

  const theStack: MustacheTag[] = [];
  const theRootTags: MustacheTag[] = [];
  const tags = parseMustacheTags(textDocument.getText(), theStack, theRootTags);
  let allTags: MustacheTag[] = [];
  getAllMustacheTags(tags, allTags);
  allTags = sortTags(allTags);
  markOverlappingTags(allTags);

  if (!allTags || allTags.length === 0) {
    return {
      data: tokens.flat(),
    } as SemanticTokens;
  }

  let lastLine = 0;
  let lastColumn = 0;

  const processed: MustacheTag[] = [];

  try {
    for (const tag of allTags) {
      const tagPosStart = textDocument.positionAt(tag.startIndex!);
      const tagPosEnd = textDocument.positionAt(tag.endIndex!);
      if (tagPosStart.line !== tagPosEnd.line) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const s = tag.type;
      if (isSemanticToken(tag.type) && !processed.includes(tag)) {
        processed.push(tag);
        let modifier = 0;
        if (tag.missingCloseTag || tag.lonelyCloseTag) {
          modifier = getTokenModifiers(['deprecated']);
        }
        const token = [
          tagPosStart.line - lastLine,
          tagPosStart.line === lastLine
            ? tagPosStart.character - lastColumn
            : tagPosStart.character,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          tag.endIndex! - tag.startIndex!,
          getTokenType(s),
          modifier,
        ];
        tokens.push(token);
        lastLine = tagPosStart.line;
        lastColumn = tagPosStart.character;
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('semantic tokens - error', e);
  }
  return {
    data: tokens.flat(),
  } as SemanticTokens;
}

export default tokenize;
