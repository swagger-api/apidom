import { MarkupContent, Position, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Hover } from 'vscode-languageserver-protocol';

import {
  getMustacheStrictTagInfoAtPosition,
  getMustacheTagInfoAtPosition,
  MustacheTag,
  parseMustacheTags,
} from '../../../utils/handlebars/utils';
import { debug, trace } from '../../../utils/utils';

async function hoverHandlebars(
  textDocument: TextDocument,
  position: Position,
): Promise<Hover | undefined> {
  const text: string = textDocument.getText();
  const hover: Hover = {
    contents: { kind: 'markdown', value: '' },
  };
  const offset = textDocument.offsetAt(position);
  debug('hover - position and offset', position, offset);
  trace('hover - text', text);

  const theStack: MustacheTag[] = [];
  const theRootTags: MustacheTag[] = [];
  const tags = parseMustacheTags(text, theStack, theRootTags);

  const tagInfo = getMustacheTagInfoAtPosition(tags, offset);
  const tagInfoStrict = getMustacheStrictTagInfoAtPosition(tags, offset);
  if (!tagInfo || !tagInfoStrict) {
    return hover;
  }
  // const word = getCurrentWord(textDocument, offset);
  const word = tagInfoStrict.tagName.trim();
  // let pointer = tagInfo.tagName;
  const pointer = [];
  const isComplex = word && word.indexOf('.') > -1;
  if (isComplex) {
    const props = word.split('.');
    pointer.push(...props);
  } else {
    pointer.push(tagInfo.tagName);
  }
  let tagParent = tagInfo.parent;
  while (tagParent) {
    const isComplexTagName = tagParent.tagName && tagParent.tagName.indexOf('.') > -1;
    if (isComplexTagName) {
      const props = tagParent.tagName.split('.');
      pointer.unshift(props[props.length - 1]); // "simple" tag name
      pointer.unshift(...props.slice(0, props.length - 1)); //
    } else {
      // eslint-disable-next-line no-lonely-if
      if (tagParent.each) {
        pointer.unshift(`each ${tagParent.tagName}`);
      } else {
        pointer.unshift(tagParent.tagName);
      }
    }
    tagParent = tagParent.parent;
  }
  trace('hover - pointer', pointer);
  console.log('hover - pointer', pointer);
  const contents: string[] = [];
  let hoverLine = `***${tagInfoStrict.tagName}***: ${tagInfoStrict.type}`;
  if (tagInfo.each) {
    hoverLine = `${hoverLine}(each)`;
  }
  contents.push(hoverLine);
  contents.push(`\n**Path**: ${pointer.join('.')}`);
  (<MarkupContent>hover.contents).value = contents.join('\n');
  hover.range = Range.create(
    textDocument.positionAt(tagInfoStrict.startIndex || 0),
    textDocument.positionAt(tagInfoStrict.endIndex || 0),
  );
  return hover;
}

export default hoverHandlebars;
