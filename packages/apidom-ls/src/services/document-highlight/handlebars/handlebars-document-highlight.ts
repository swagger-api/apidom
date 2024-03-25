import { Position, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DocumentHighlight } from 'vscode-languageserver-protocol';

import {
  getMustacheStrictTagInfoAtPosition,
  getMustacheTagInfoAtPosition,
  MustacheTag,
  parseMustacheTags,
} from '../../../utils/handlebars/utils';
import { debug, trace } from '../../../utils/utils';

async function highlightDocumentHandlebars(
  textDocument: TextDocument,
  position: Position,
): Promise<DocumentHighlight[] | undefined> {
  const text: string = textDocument.getText();
  const offset = textDocument.offsetAt(position);
  debug('highlightDocumentHandlebars - position and offset', position, offset);
  trace('highlightDocumentHandlebars - text', text);

  const theStack: MustacheTag[] = [];
  const theRootTags: MustacheTag[] = [];
  const tags = parseMustacheTags(text, theStack, theRootTags);

  const tagInfo = getMustacheTagInfoAtPosition(tags, offset);
  const tagInfoStrict = getMustacheStrictTagInfoAtPosition(tags, offset);
  if (!tagInfo || !tagInfoStrict) {
    return undefined;
  }
  debug('highlightDocumentHandlebars - tagInfo', tagInfoStrict.tagName, tagInfoStrict.type);
  let matchingTag;
  if (tagInfoStrict.type === 'sectionOpen') {
    matchingTag = tagInfoStrict.openOrCloseRelatedSection?.sectionCloseTag;
  } else if (tagInfoStrict.type === 'sectionClose') {
    matchingTag = tagInfoStrict.openOrCloseRelatedSection?.sectionOpenTag;
  }
  debug('highlightDocumentHandlebars - matchingTag', matchingTag?.tagName, matchingTag?.type);
  if (matchingTag) {
    return [
      {
        kind: 2,
        range: Range.create(
          textDocument.positionAt(tagInfoStrict.startIndex || 0),
          textDocument.positionAt(tagInfoStrict.endIndex || 0),
        ),
      },
      {
        kind: 2,
        range: Range.create(
          textDocument.positionAt(matchingTag.startIndex || 0),
          textDocument.positionAt(matchingTag.endIndex || 0),
        ),
      },
    ];
  }
  return undefined;
}

export default highlightDocumentHandlebars;
