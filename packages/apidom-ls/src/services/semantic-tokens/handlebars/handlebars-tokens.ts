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

function getTokenType(type: string, tokens: string[]): number {
  return tokens.indexOf(type);
}

function getTokenModifiers(modifiers: string[], tokenModifiers: Record<string, number>): number {
  let bit = 0;
  for (const modifier of modifiers) {
    // eslint-disable-next-line no-bitwise
    bit |= tokenModifiers[modifier];
  }
  return bit;
}

function isSemanticToken(token: string, tokens: string[], primitives: string[]): boolean {
  return tokens.indexOf(token) > -1 && !primitives.includes(token);
}
function tokenize(
  textDocument: TextDocument,
  // isSemanticToken: (token: string) => boolean,
  allTokens: string[],
  // getTokenModifiers: (modifiers: string[]) => number,
  tokenModifiers: Record<string, number>,
  // getTokenType: (type: string) => number,
  primitives: string[],
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
      if (isSemanticToken(tag.type, allTokens, primitives) && !processed.includes(tag)) {
        processed.push(tag);
        let modifier = 0;
        if (tag.missingCloseTag) {
          modifier = getTokenModifiers(['deprecated'], tokenModifiers);
        }
        const token = [
          tagPosStart.line - lastLine,
          tagPosStart.line === lastLine
            ? tagPosStart.character - lastColumn
            : tagPosStart.character,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          tag.endIndex! - tag.startIndex!,
          getTokenType(s, allTokens),
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
