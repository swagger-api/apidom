import { TextDocument } from 'vscode-languageserver-textdocument';

import { AnyObject } from './context';

let delStart = '\\{{2,3}';
let delEnd = '\\}{2,3}';
let tagRegex = new RegExp(`(${delStart})([#^\\/>=!]?)(.*?)(${delEnd})`, 'g');
let processDelimeter = true;

export function isObjectNode(node: AnyObject | undefined): boolean {
  return node !== undefined && node !== null && typeof node === 'object' && !Array.isArray(node);
}

export function isNotObjectNode(node: AnyObject | undefined): boolean {
  return node !== undefined && node !== null && typeof node !== 'object';
}

export function isArrayNode(node: AnyObject | undefined): boolean {
  return node !== undefined && node !== null && Array.isArray(node);
}
export function isBooleanNode(node: AnyObject | undefined): boolean {
  return node !== undefined && node !== null && typeof node === 'boolean';
}

export function parseMustacheTags(
  documentText: string,
  stack: MustacheTag[],
  rootTags: MustacheTag[],
): MustacheTag[] {
  const tagsToAdjustClose: MustacheTag[] = [];

  const closeOpenSectionsUntilMatch = (
    tagName: string,
    endIndex: number,
    tagSectionClose?: MustacheTag,
  ) => {
    while (stack.length > 0) {
      const section = stack.pop();
      if (section) {
        section.endIndex = endIndex;
        if (stack.length > 0) {
          // @ts-ignore
          stack[stack.length - 1].children.push(section);
          section.parent = stack[stack.length - 1];
        } else {
          rootTags.push(section);
        }
        if (section.tagName === tagName.trim()) {
          if (tagSectionClose) {
            section.sectionCloseTag = tagSectionClose;
          }
          break;
        } else {
          tagsToAdjustClose.push(section);
        }
      }
    }
  };
  let match: RegExpExecArray | null;
  // eslint-disable-next-line no-cond-assign
  while ((match = tagRegex.exec(documentText)) !== null) {
    const [wholeTag, tagStartDelimeter, tagSymbol, tagName, tagEndDelimeter] = match;
    const tagStartDelimeterLength = tagStartDelimeter.length;
    const tagEndDelimeterLength = tagEndDelimeter.length;
    const startIndex = match.index;
    const endIndex = startIndex + wholeTag.length;

    let tagType: TagType = 'variable';
    let delimeterChanged = false;

    // eslint-disable-next-line default-case
    switch (tagSymbol) {
      case '#':
        if (tagName.trim().startsWith('@') || tagName.trim().startsWith('each')) {
          // eslint-disable-next-line no-continue
          continue;
        }
        tagType = 'section';
        break;
      case '^':
        tagType = 'inverted';
        break;
      case '/':
        if (tagName.trim().startsWith('@') || tagName.trim().startsWith('each')) {
          // eslint-disable-next-line no-continue
          continue;
        }
        tagType = 'sectionClose';
        // eslint-disable-next-line no-case-declarations
        const tagSectionClose: MustacheTag = {
          type: 'sectionClose',
          tagName: tagName.trim(),
          startIndex,
          endIndex,
          tagNameStartIndex: startIndex + tagStartDelimeterLength + 1,
          tagNameEndIndex: endIndex - tagEndDelimeterLength,
          children: [],
        };
        closeOpenSectionsUntilMatch(tagName, endIndex, tagSectionClose);
        // eslint-disable-next-line no-continue,no-fallthrough
        continue;
      case '>':
        tagType = 'partial';
        break;
      case '!':
        tagType = 'comment';
        break;
      case '=':
        if (!processDelimeter) {
          // eslint-disable-next-line no-continue
          continue;
        }
        processDelimeter = false;
        // eslint-disable-next-line no-case-declarations
        const regex = /=([^=]*) ([^=]*)=/;
        // eslint-disable-next-line no-case-declarations
        const delMatch = wholeTag.match(regex);

        if (delMatch) {
          // eslint-disable-next-line prefer-destructuring
          delStart = delMatch[1];
          // eslint-disable-next-line prefer-destructuring
          delEnd = delMatch[2];
          tagRegex = new RegExp(`${delStart}([#^\\/>=!]?)(.*?)${delEnd}`, 'g');
          delimeterChanged = true;
        }
        break;
    }
    const tag: MustacheTag = {
      type: tagType,
      tagName: tagName.trim(),
      startIndex,
      endIndex,
      children: [],
    };
    if (tagType === 'variable') {
      tag.tagNameStartIndex = startIndex + tagStartDelimeterLength;
      tag.tagNameEndIndex = endIndex - tagEndDelimeterLength;
    } else {
      tag.tagNameStartIndex = startIndex + tagStartDelimeterLength + 1;
      tag.tagNameEndIndex = endIndex - tagEndDelimeterLength;
    }
    if (tagType === 'section' || tagType === 'inverted') {
      stack.push(tag);
      const tagSectionOpen: MustacheTag = {
        type: 'sectionOpen',
        tagName: tagName.trim(),
        startIndex,
        endIndex,
        tagNameStartIndex: tag.tagNameStartIndex,
        tagNameEndIndex: tag.tagNameEndIndex,
        children: [],
      };
      tag.sectionOpenTag = tagSectionOpen;
    } else {
      // eslint-disable-next-line
      if (stack.length > 0) {
        // @ts-ignore
        stack[stack.length - 1].children.push(tag);
        tag.parent = stack[stack.length - 1];
      } else {
        rootTags.push(tag);
      }
    }
    if (delimeterChanged) {
      return parseMustacheTags(documentText, stack, rootTags);
    }
  }
  if (stack.length > 0) {
    closeOpenSectionsUntilMatch('', documentText.length);
  }
  for (const tag of tagsToAdjustClose) {
    if (tag.parent && tag.parent.sectionCloseTag) {
      tag.endIndex = tag.parent.sectionCloseTag.startIndex;
    }
  }

  return rootTags;
}

export function getAllMustacheTags(tags: MustacheTag[], allTags: MustacheTag[]): void {
  // const allTags: MustacheTag[] = [];
  for (const tag of tags) {
    if (tag.type !== 'section' && tag.type !== 'inverted') {
      allTags.push(tag);
    }
    const tagSectionOpen = tag.sectionOpenTag;
    const tagSectionClose = tag.sectionCloseTag;
    if (tagSectionOpen) {
      allTags.push(tagSectionOpen);
    }
    if (tagSectionClose) {
      allTags.push(tagSectionClose);
    }
    if (tagSectionOpen && !tagSectionClose) {
      tagSectionOpen!.missingCloseTag = true;
    }
    if (tag.children && tag.children.length > 0) {
      getAllMustacheTags(tag.children, allTags);
    }
  }
}

export function getMustacheTagInfoAtPosition(
  tags: MustacheTag[],
  position: number,
): MustacheTag | null {
  for (const tag of tags) {
    // @ts-ignore
    if (position >= tag.startIndex && position <= tag.endIndex) {
      // @ts-ignore
      if (tag.children.length > 0) {
        // @ts-ignore
        const childTagInfo = getMustacheTagInfoAtPosition(tag.children, position);
        if (childTagInfo) {
          return childTagInfo;
        }
      }
      return tag;
      // return {type: tag.type, tagName: tag.tagName};
    }
  }
  return null;
}

export function getMustacheStrictTagInfoAtPosition(
  tags: MustacheTag[],
  position: number,
): MustacheTag | null {
  const allTags: MustacheTag[] = [];
  getAllMustacheTags(tags, allTags);
  let currentTag: MustacheTag | null = null;
  for (const tag of allTags) {
    // @ts-ignore
    if (position >= tag.startIndex && position <= tag.endIndex) {
      if (!currentTag) {
        currentTag = tag;
        // eslint-disable-next-line no-continue
        continue;
      }
      if (currentTag.startIndex! <= tag.startIndex! || currentTag.endIndex! >= tag.endIndex!) {
        currentTag = tag;
      }
    }
  }
  return currentTag;
}

export type TagType =
  | 'variable'
  | 'section'
  | 'inverted'
  | 'comment'
  | 'partial'
  | 'none'
  | 'sectionOpen'
  | 'sectionClose';
export interface MustacheTag {
  type: TagType;
  tagName: string;
  startIndex?: number;
  endIndex?: number;
  tagNameStartIndex?: number;
  tagNameEndIndex?: number;
  children?: MustacheTag[];
  parent?: MustacheTag;
  sectionOpenTag?: MustacheTag;
  sectionCloseTag?: MustacheTag;
  overlap?: boolean;
  missingCloseTag?: boolean;
}

export function logTagDetails(tags: MustacheTag[], textDoc: TextDocument): void {
  function logDetails(tag: MustacheTag, parent?: MustacheTag): void {
    // eslint-disable-next-line
    let posStart = textDoc.positionAt(tag.startIndex || 0);
    // eslint-disable-next-line
    let posEnd = textDoc.positionAt(tag.endIndex || 0);
    // eslint-disable-next-line
    let posTagStart = textDoc.positionAt(tag.tagNameStartIndex || 0);
    // eslint-disable-next-line
    let posTagEnd = textDoc.positionAt(tag.tagNameEndIndex || 0);
    let msg = `${tag.type}: ${tag.tagName}, ${posStart.line}:${posStart.character}-${posEnd.line}:${posEnd.character}, ${posTagStart.line}:${posTagStart.character}-${posTagEnd.line}:${posTagEnd.character} `;
    // If parent is available, log its details
    if (parent) {
      msg += `, Parent:: ${parent.type}: ${parent.tagName}, ${parent.startIndex}-${parent.endIndex}`;
    }
    /*        const sectionOpenTag = tag.sectionOpenTag;
            if (sectionOpenTag) {
                posStart = textDoc.positionAt(sectionOpenTag.startIndex || 0);
                posEnd = textDoc.positionAt(sectionOpenTag.endIndex || 0);
                posTagStart = textDoc.positionAt(sectionOpenTag.tagNameStartIndex || 0);
                posTagEnd = textDoc.positionAt(sectionOpenTag.tagNameEndIndex || 0)
                msg += `, open: ${sectionOpenTag.tagName}, ${posStart.line}:${posStart.character}-${posEnd.line}:${posEnd.character}, ${posTagStart.line}:${posTagStart.character}-${posTagEnd.line}:${posTagEnd.character}`;
            }
            const sectionCloseTag = tag.sectionCloseTag;
            if (sectionCloseTag) {
                posStart = textDoc.positionAt(sectionCloseTag.startIndex || 0);
                posEnd = textDoc.positionAt(sectionCloseTag.endIndex || 0);
                posTagStart = textDoc.positionAt(sectionCloseTag.tagNameStartIndex || 0);
                posTagEnd = textDoc.positionAt(sectionCloseTag.tagNameEndIndex || 0)
                msg += `, close: ${sectionCloseTag.tagName}, ${posStart.line}:${posStart.character}-${posEnd.line}:${posEnd.character}, ${posTagStart.line}:${posTagStart.character}-${posTagEnd.line}:${posTagEnd.character}`;
            } */
    // eslint-disable-next-line
    console.log(msg);
    // If the tag has children, recursively log their details
    if (tag.children) {
      tag.children.forEach((child) => logDetails(child, tag));
    }
  }

  // Start the recursive logging for each tag in the array
  tags.forEach((tag) => logDetails(tag));
}

export function findNestedPropertyKeys(bundle: AnyObject, path: string[]): string[] | string {
  let currentNode: AnyObject | undefined = bundle;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    // If current node is an array, use the first element
    if (Array.isArray(currentNode)) {
      currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
    }
    // Check if the key exists in the current node
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (isObjectNode(currentNode) && key in currentNode!) {
      if (typeof currentNode![key] !== 'boolean') {
        currentNode = currentNode![key];
      }
    } else {
      // If the key doesn't exist, search in ancestors
      let ancestor = bundle;
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < i; j++) {
        const ancestorKey = path[j];
        if (ancestorKey in ancestor) {
          ancestor = ancestor[ancestorKey];
          if (Array.isArray(ancestor)) {
            ancestor = ancestor.length > 0 ? ancestor[0] : undefined;
          }
          if (isObjectNode(ancestor) && key in ancestor) {
            if (typeof ancestor![key] !== 'boolean') {
              currentNode = ancestor[key];
            }
            break;
          }
        }
      }
      // If the key is not found in any ancestor, return "not object"
      if (!(key in ancestor)) {
        return 'not object';
      }
    }
  }
  // If the final node is an array, use the first element
  if (Array.isArray(currentNode)) {
    currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
  }

  // Check if the final node is an object and return its keys
  if (currentNode && typeof currentNode === 'object') {
    return Object.keys(currentNode);
  }
  return 'not object';
}

export function sortTags(tags: MustacheTag[]): MustacheTag[] {
  return tags.sort((a, b) => {
    if (a.startIndex !== b.startIndex) {
      return (a.startIndex ?? 0) - (b.startIndex ?? 0);
    }
    return (a.endIndex ?? 0) - (b.endIndex ?? 0);
  });
}

export function markOverlappingTags(tags: MustacheTag[]): void {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < tags.length - 2; i++) {
    // @ts-ignore
    if (tags[i].endIndex > tags[i + 1].startIndex) {
      // eslint-disable-next-line no-param-reassign
      tags[i].overlap = true;
    }
  }
}

export function pathExists(bundle: AnyObject, path: string[]): boolean {
  let currentNode: AnyObject | undefined = bundle;
  if (path.length === 1) {
    return path[0] in currentNode;
  }
  const lastKey = path[path.length - 1];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    // If current node is an array, use the first element
    while (Array.isArray(currentNode)) {
      currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
    }
    // Check if the key exists in the current node
    if (
      currentNode !== undefined &&
      currentNode !== null &&
      typeof currentNode === 'object' &&
      key in currentNode
    ) {
      if (typeof currentNode[key] !== 'boolean') {
        currentNode = currentNode[key];
      }
    } else if (
      currentNode !== undefined &&
      currentNode !== null &&
      typeof currentNode === 'object' &&
      !(key in currentNode)
    ) {
      // look if there is a boolean key in the ancestors
      let ancestor = bundle;
      let foundBooleanNodeInAncestors = false;
      if (isObjectNode(ancestor) && key in ancestor && typeof ancestor[key] === 'boolean') {
        foundBooleanNodeInAncestors = true;
      } else if (isObjectNode(ancestor) && key in ancestor && typeof ancestor[key] !== 'boolean') {
        ancestor = ancestor[key];
      }
      if (!foundBooleanNodeInAncestors) {
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < i; j++) {
          const ancestorKey = path[j];
          while (Array.isArray(ancestor)) {
            ancestor = ancestor.length > 0 ? ancestor[0] : undefined;
          }
          if (
            ancestor !== undefined &&
            ancestor !== null &&
            typeof ancestor === 'object' &&
            ancestorKey in ancestor
          ) {
            if (typeof ancestor[ancestorKey] !== 'boolean') {
              ancestor = ancestor[ancestorKey];
            }
            while (Array.isArray(ancestor)) {
              ancestor = ancestor.length > 0 ? ancestor[0] : undefined;
            }
            // if (isObjectNode(ancestor) && key in ancestor && typeof ancestor[key] === 'boolean') {
            if (isObjectNode(ancestor) && key in ancestor) {
              foundBooleanNodeInAncestors = true;
              break;
            }
          }
        }
      }
      if (!foundBooleanNodeInAncestors) {
        return false;
      }
    }
  }
  if (currentNode === undefined || currentNode === null) {
    return false;
  }
  if (
    currentNode !== undefined &&
    currentNode !== null &&
    typeof currentNode === 'object' &&
    lastKey in currentNode
  ) {
    return true;
  }

  currentNode = bundle;
  if (
    currentNode !== undefined &&
    currentNode !== null &&
    typeof currentNode === 'object' &&
    lastKey in currentNode
  ) {
    return true;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    // Check if the key exists in the current node
    if (
      currentNode !== undefined &&
      currentNode !== null &&
      typeof currentNode === 'object' &&
      key in currentNode
    ) {
      // currentNode = currentNode[key];
      if (typeof currentNode[key] !== 'boolean') {
        currentNode = currentNode[key];
      }
    }
    while (Array.isArray(currentNode)) {
      currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
    }
    if (
      currentNode !== undefined &&
      currentNode !== null &&
      typeof currentNode === 'object' &&
      lastKey in currentNode
    ) {
      return true;
    }
  }
  return false;
}
