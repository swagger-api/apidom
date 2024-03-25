import { MarkupContent, Position, Range } from 'vscode-languageserver-types';
import YAML from 'js-yaml';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Hover } from 'vscode-languageserver-protocol';

import {
  getMustacheStrictTagInfoAtPosition,
  getMustacheTagInfoAtPosition,
  MustacheTag,
  parseMustacheTags,
  findNode,
} from '../../../utils/handlebars/utils';
import { debug, trace } from '../../../utils/utils';
import { getContext } from '../../../utils/handlebars/context';

function getContextPointer(
  tagInfo: MustacheTag,
  tagInfoStrict: MustacheTag,
  word: string,
): string[] {
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
    if (tagParent.tagName.trim() === '@first' || tagParent.tagName.trim() === '@last') {
      tagParent = tagParent.parent;
      // eslint-disable-next-line no-continue
      continue;
    }
    const isComplexTagName = tagParent.tagName && tagParent.tagName.indexOf('.') > -1;
    if (isComplexTagName) {
      const props = tagParent.tagName.split('.');
      if (tagParent.each) {
        pointer.unshift(`each ${props[props.length - 1]}`); // "simple" tag name with each
      } else {
        pointer.unshift(props[props.length - 1]); // "simple" tag name
      }
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
  return pointer;
}

function getFullPointer(tagInfo: MustacheTag, tagInfoStrict: MustacheTag, word: string): string[] {
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
  return pointer;
}

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
  const fullPointer = getFullPointer(tagInfo, tagInfoStrict, word);
  trace('hover - fullPointer', fullPointer);
  const contextPointer = getContextPointer(tagInfo, tagInfoStrict, word);
  trace('hover - contextPointer', contextPointer);
  const templateContext = getContext(true);
  const node = findNode(templateContext, contextPointer);
  let nodeType = null;
  trace('hover - typeof node', typeof node);
  if (Array.isArray(node)) {
    nodeType = 'array';
    // node = node.length > 0 ? node[0] : undefined;
  } else if (typeof node === 'object') {
    nodeType = 'object';
  } else if (typeof node === 'string') {
    nodeType = 'string';
  } else if (typeof node === 'boolean') {
    nodeType = 'boolean';
  } else if (typeof node === 'number') {
    nodeType = 'number';
  }
  trace('hover - nodeType', nodeType);
  const contents: string[] = [];
  const addTagDetails =
    tagInfoStrict?.type !== 'sectionClose' &&
    tagInfoStrict?.type !== 'listKeyword' &&
    tagInfoStrict?.type !== 'comment';
  trace('hover - addTagDetails', addTagDetails, tagInfoStrict !== undefined, tagInfoStrict?.type);
  let hoverLine = `***${tagInfoStrict.tagName}***: ${tagInfoStrict.type}`;
  if (nodeType !== '' && addTagDetails) {
    hoverLine = `${hoverLine} (${nodeType})`;
  }
  if (tagInfo.each) {
    hoverLine = `${hoverLine}(each)`;
  }
  contents.push(hoverLine);
  contents.push(`\n**Path**: ${fullPointer.join(' > ')}`);
  if (node && JSON.stringify(node) !== '{}' && addTagDetails) {
    const nodeContent = `\`\`\`\n\n${YAML.dump(node).substring(0, 1000)}\n\n\`\`\``;
    trace('hover - nodeContent', nodeContent);
    // nodeContent = JSON.stringify(node, null, 2).substring(0, 1000);
    contents.push('\n----');
    contents.push('\n');
    contents.push(nodeContent);
    contents.push('\n');
  }
  (<MarkupContent>hover.contents).value = contents.join('\n');
  hover.range = Range.create(
    textDocument.positionAt(tagInfoStrict.startIndex || 0),
    textDocument.positionAt(tagInfoStrict.endIndex || 0),
  );
  return hover;
  trace('hover - hover', JSON.stringify(hover, null, 2));
}

export default hoverHandlebars;
