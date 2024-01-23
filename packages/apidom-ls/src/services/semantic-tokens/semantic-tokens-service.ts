/* eslint-disable no-plusplus */
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  SemanticTokens,
  SemanticTokensLegend,
  SemanticTokenModifiers,
} from 'vscode-languageserver-protocol';

import { LanguageSettings } from '../../apidom-language-types';
import {
  perfEnd,
  perfStart,
  // isJsonDoc,
} from '../../utils/utils';
import {
  MustacheTag,
  parseMustacheTags,
  getAllMustacheTags,
  markOverlappingTags,
  sortTags,
} from '../completion/utils';
import { SemanticTokensService } from './semantic-tokens-service-apidom';

enum PerfLabels {
  START = 'computeSemanticTokens',
}

// eslint-disable-next-line import/prefer-default-export
export class DefaultSemanticTokensService implements SemanticTokensService {
  private settings: LanguageSettings | undefined;

  private primitives: string[] = ['value', 'string', 'number', 'key'];

  private isSemanticToken(token: string): boolean {
    return this.tokens.indexOf(token) > -1 && !this.primitives.includes(token);
  }

  private legend: SemanticTokensLegend = {
    tokenTypes: [],
    tokenModifiers: [],
  };

  private tokenModifiers: Record<string, number> = {};

  private tokens: string[] = [];

  private getTokenType(type: string): number {
    return this.tokens.indexOf(type);
  }

  private getTokenModifiers(modifiers: string[]): number {
    let bit = 0;
    for (const modifier of modifiers) {
      // eslint-disable-next-line no-bitwise
      bit |= this.tokenModifiers[modifier];
    }
    return bit;
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
    if (settings?.metadata?.tokens) {
      this.tokens = settings?.metadata?.tokens;
    }

    this.tokenModifiers[SemanticTokenModifiers.declaration] = 1;
    this.tokenModifiers[SemanticTokenModifiers.definition] = 2;
    this.tokenModifiers[SemanticTokenModifiers.deprecated] = 4;
    this.tokenModifiers.reference = 8;
    this.tokenModifiers['httpMethod-GET'] = 16;
    this.tokenModifiers['httpMethod-POST'] = 32;
    this.tokenModifiers.string = 64;
    this.tokenModifiers.number = 128;

    const legendTokenModifiers = Object.keys(this.tokenModifiers);

    this.legend = {
      tokenTypes: this.tokens,
      tokenModifiers: legendTokenModifiers,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  public getLegend(): SemanticTokensLegend {
    return this.legend;
  }

  // eslint-disable-next-line class-methods-use-this
  public async computeSemanticTokens(textDocument: TextDocument): Promise<SemanticTokens> {
    perfStart(PerfLabels.START);
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

    for (const tag of allTags) {
      const tagPosStart = textDocument.positionAt(tag.startIndex!);
      const tagPosEnd = textDocument.positionAt(tag.endIndex!);
      if (tagPosStart.line !== tagPosEnd.line) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const s = tag.type;
      if (this.isSemanticToken(tag.type) && !processed.includes(tag)) {
        processed.push(tag);
        let modifier = 0;
        if (tag.missingCloseTag) {
          modifier = this.getTokenModifiers(['deprecated']);
        }
        const token = [
          tagPosStart.line - lastLine,
          tagPosStart.line === lastLine
            ? tagPosStart.character - lastColumn
            : tagPosStart.character,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          tag.endIndex! - tag.startIndex!,
          this.getTokenType(s),
          modifier,
        ];
        tokens.push(token);
        lastLine = tagPosStart.line;
        lastColumn = tagPosStart.character;
      }
    }
    perfEnd(PerfLabels.START);
    return {
      data: tokens.flat(),
    } as SemanticTokens;
  }
}
