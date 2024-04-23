/* eslint-disable @typescript-eslint/no-use-before-define */
import { TextDocument } from 'vscode-languageserver-textdocument';
import { mergeDeepLeft } from 'ramda';

import { AnyObject } from '../../apidom-language-types';
import { trace } from '../utils';
import { getTree, RenderGraph, RenderGraphWithIndex } from './types';
import { openapi31TypeSchema } from './openapi-3-1-type-schema';

let delStart = '\\{{2,3}';
let delEnd = '\\}{2,3}';
let tagRegex = new RegExp(`(${delStart})([#^@&\\/>=!]?)(.*?)(${delEnd})`, 'g');
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
    if (stack.length > 0) {
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
            // eslint-disable-next-line no-param-reassign
            tagSectionClose.openOrCloseRelatedSection = section;
            section.sectionCloseTag = tagSectionClose;
          }
          // break;
        } else if (tagName === 'each' && section.each) {
          if (tagSectionClose) {
            // eslint-disable-next-line no-param-reassign
            tagSectionClose.tagName = section.tagName;
            // eslint-disable-next-line no-param-reassign
            tagSectionClose.each = true;
            // eslint-disable-next-line no-param-reassign
            tagSectionClose.openOrCloseRelatedSection = section;
            section.sectionCloseTag = tagSectionClose;
          }
          // break;
        } else {
          if (tagSectionClose) {
            // eslint-disable-next-line no-param-reassign
            tagSectionClose.lonelyCloseTag = true;
            section.erroredSectionCloseTag = tagSectionClose;
          }
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
    const trimmed = tagName.trim();
    const keyWord = trimmed.split(' ')[0];
    let tagValue = trimmed;
    if (trimmed.split(' ').length > 1) {
      tagValue = trimmed.substring(trimmed.indexOf(' ') + 1);
    }
    // eslint-disable-next-line default-case
    switch (tagSymbol) {
      case '#':
        if (keyWord === 'if' || keyWord === 'unless' || keyWord === 'with') {
          // unsupported
          // eslint-disable-next-line no-continue
          continue;
        }
        tagType = 'section';
        break;
      case '^':
        tagType = 'inverted';
        break;
      case '&':
        tagType = 'explicitVariable';
        break;
      case '@':
        tagType = 'listKeyword';
        break;
      case '/':
        if (
          trimmed.startsWith('if') ||
          trimmed.startsWith('unless') ||
          trimmed.startsWith('with')
        ) {
          // unsupported
          // eslint-disable-next-line no-continue
          continue;
        }
        tagType = 'sectionClose';
        // eslint-disable-next-line no-case-declarations
        const tagSectionClose: MustacheTag = {
          type: 'sectionClose',
          tagName: tagValue,
          startIndex,
          endIndex,
          tagNameStartIndex: startIndex + tagStartDelimeterLength + 1,
          tagNameEndIndex: endIndex - tagEndDelimeterLength,
          children: [],
        };
        closeOpenSectionsUntilMatch(tagValue, endIndex, tagSectionClose);
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
      tagName: tagValue,
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
        tagName: tagValue,
        startIndex,
        endIndex,
        tagNameStartIndex: tag.tagNameStartIndex,
        tagNameEndIndex: tag.tagNameEndIndex,
        children: [],
      };
      if (keyWord === 'each') {
        tag.each = true;
        tagSectionOpen.each = true;
      }
      // eslint-disable-next-line no-param-reassign
      tagSectionOpen.openOrCloseRelatedSection = tag;
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
    const erroredOpenTag = tag.erroredSectionOpenTag;
    const erroredCloseTag = tag.erroredSectionCloseTag;
    if (tagSectionOpen) {
      allTags.push(tagSectionOpen);
    }
    if (tagSectionClose) {
      allTags.push(tagSectionClose);
    }
    if (erroredOpenTag) {
      allTags.push(erroredOpenTag);
    }
    if (erroredCloseTag) {
      allTags.push(erroredCloseTag);
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
  | 'explicitVariable'
  | 'listKeyword'
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
  erroredSectionCloseTag?: MustacheTag;
  erroredSectionOpenTag?: MustacheTag;
  overlap?: boolean;
  missingCloseTag?: boolean;
  lonelyCloseTag?: boolean;
  each?: boolean;
  openOrCloseRelatedSection?: MustacheTag;
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
    const { sectionOpenTag } = tag;
    if (sectionOpenTag) {
      posStart = textDoc.positionAt(sectionOpenTag.startIndex || 0);
      posEnd = textDoc.positionAt(sectionOpenTag.endIndex || 0);
      posTagStart = textDoc.positionAt(sectionOpenTag.tagNameStartIndex || 0);
      posTagEnd = textDoc.positionAt(sectionOpenTag.tagNameEndIndex || 0);
      msg += `, open: ${sectionOpenTag.tagName}, ${posStart.line}:${posStart.character}-${posEnd.line}:${posEnd.character}, ${posTagStart.line}:${posTagStart.character}-${posTagEnd.line}:${posTagEnd.character}`;
    }
    const { sectionCloseTag } = tag;
    if (sectionCloseTag) {
      posStart = textDoc.positionAt(sectionCloseTag.startIndex || 0);
      posEnd = textDoc.positionAt(sectionCloseTag.endIndex || 0);
      posTagStart = textDoc.positionAt(sectionCloseTag.tagNameStartIndex || 0);
      posTagEnd = textDoc.positionAt(sectionCloseTag.tagNameEndIndex || 0);
      msg += `, close: ${sectionCloseTag.tagName}, ${posStart.line}:${posStart.character}-${posEnd.line}:${posEnd.character}, ${posTagStart.line}:${posTagStart.character}-${posTagEnd.line}:${posTagEnd.character}`;
    }
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

export function deepMergeValues(objNode: object): object {
  let result: object | null = null;
  const keys = Object.keys(objNode);
  if (keys.length < 2) {
    return objNode;
  }
  let previousKey = keys[0];
  trace('deepMergeValues - keys', keys);
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < keys.length; i++) {
    const objKey = keys[i];
    // @ts-ignore
    trace('deepMergeValues - objKey', objKey, objNode[objKey], objNode[previousKey]);
    // @ts-ignore
    const keyNode = objNode[objKey];
    // @ts-ignore
    const previousNode = objNode[previousKey];
    if (typeof keyNode === 'object' && typeof previousNode === 'object') {
      if (!result) {
        result = mergeDeepLeft(keyNode, previousNode);
      } else {
        result = mergeDeepLeft(result, mergeDeepLeft(keyNode, previousNode));
      }
    }
    previousKey = objKey;
  }
  trace('deepMergeValues - result', result);
  return result!;
}

export function findNestedPropertyKeys(bundle: AnyObject, path: string[]): string[] | string {
  let currentNode: AnyObject | undefined = bundle;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < path.length - 1; i++) {
    let key = path[i];
    trace('findNestedPropertyKeys - key', key);
    let inEach = false;
    if (key.split(' ').length > 1) {
      // eslint-disable-next-line prefer-destructuring
      key = key.split(' ')[1];
      inEach = true;
    }
    trace('findNestedPropertyKeys - inEach', inEach);
    // If current node is an array, use the first element
    if (Array.isArray(currentNode)) {
      currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
    }
    // Check if the key exists in the current node
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (isObjectNode(currentNode) && key in currentNode!) {
      trace('findNestedPropertyKeys - key in current node');
      if (typeof currentNode![key] !== 'boolean') {
        currentNode = currentNode![key];
        if (inEach) {
          trace('findNestedPropertyKeys - key in current node with each');
          // deepMerge all properties of each key of currentNode
          // @ts-ignore
          currentNode = deepMergeValues(currentNode);
        }
      }
    } else {
      // If the key doesn't exist, search in ancestors
      let ancestor = bundle;
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < i; j++) {
        let ancestorKey = path[j];
        let ancestorInEach = false;
        if (ancestorKey.split(' ').length > 1) {
          // eslint-disable-next-line prefer-destructuring
          ancestorKey = ancestorKey.split(' ')[1];
          ancestorInEach = true;
        }
        if (isObjectNode(ancestor) && ancestorKey in ancestor) {
          ancestor = ancestor[ancestorKey];
          if (Array.isArray(ancestor)) {
            ancestor = ancestor.length > 0 ? ancestor[0] : undefined;
          }
          if (isObjectNode(ancestor) && key in ancestor) {
            if (typeof ancestor![key] !== 'boolean') {
              currentNode = ancestor[key];
              if (ancestorInEach) {
                // deepMerge all properties of each key of currentNode
                // @ts-ignore
                currentNode = deepMergeValues(currentNode);
              }
            }
            break;
          }
        }
      }
      // If the key is not found in any ancestor, return "not object"
      if (!isObjectNode(ancestor) || !(key in ancestor)) {
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

export function findNode(bundle: AnyObject, path: string[]): AnyObject | AnyObject[] {
  let currentNode: AnyObject | undefined = bundle;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < path.length - 1; i++) {
    let key = path[i];
    trace('findNode - key', key);
    let inEach = false;
    if (key.split(' ').length > 1) {
      // eslint-disable-next-line prefer-destructuring
      key = key.split(' ')[1];
      inEach = true;
    }
    trace('findNode - inEach', inEach);
    // If current node is an array, use the first element
    if (Array.isArray(currentNode)) {
      currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
    }
    // Check if the key exists in the current node
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (isObjectNode(currentNode) && key in currentNode!) {
      trace('findNode - key in current node');
      if (Array.isArray(currentNode) || typeof currentNode![key] === 'object') {
        currentNode = currentNode![key];
        if (inEach) {
          trace('findNode - key in current node with each');
          // deepMerge all properties of each key of currentNode
          // @ts-ignore
          currentNode = deepMergeValues(currentNode);
        }
      }
    } else {
      // If the key doesn't exist, search in ancestors
      let ancestor = bundle;
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < i; j++) {
        let ancestorKey = path[j];
        let ancestorInEach = false;
        if (ancestorKey.split(' ').length > 1) {
          // eslint-disable-next-line prefer-destructuring
          ancestorKey = ancestorKey.split(' ')[1];
          ancestorInEach = true;
        }
        if (isObjectNode(ancestor) && ancestorKey in ancestor) {
          ancestor = ancestor[ancestorKey];
          if (Array.isArray(ancestor)) {
            ancestor = ancestor.length > 0 ? ancestor[0] : undefined;
          }
          if (isObjectNode(ancestor) && key in ancestor) {
            if (typeof ancestor![key] !== 'boolean') {
              currentNode = ancestor[key];
              if (ancestorInEach) {
                // deepMerge all properties of each key of currentNode
                // @ts-ignore
                currentNode = deepMergeValues(currentNode);
              }
            }
            break;
          }
        }
      }
      // If the key is not found in any ancestor, return "not object"
      if (!isObjectNode(ancestor) || !(key in ancestor)) {
        return {};
      }
    }
  }
  // If the final node is an array, use the first element
  if (Array.isArray(currentNode)) {
    currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
  }

  // Check if the final node is an object and return its keys
  trace('findNode', path[path.length - 1], currentNode);
  if (
    currentNode &&
    typeof currentNode === 'object' &&
    currentNode[path[path.length - 1]] !== undefined
  ) {
    trace('findNode returning', path[path.length - 1], currentNode[path[path.length - 1]]);
    return currentNode[path[path.length - 1]];
  }
  return {};
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

/**
 * Null safe way of checking whether or not an object,
 * including its prototype, has a given property
 */
function hasProperty(obj: unknown, propName: string) {
  return obj != null && typeof obj === 'object' && propName in obj;
}

/**
 * Safe way of detecting whether or not the given thing is a primitive and
 * whether it has the given property
 */
function primitiveHasOwnProperty(primitive: unknown, propName: string) {
  return (
    primitive != null &&
    typeof primitive !== 'object' &&
    primitive.hasOwnProperty &&
    Object.prototype.hasOwnProperty.call(primitive, propName)
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Context {
  public view: AnyObject;

  public cache: Record<string, AnyObject>;

  public parentContext: Context | undefined = undefined;

  constructor(contextView: AnyObject, parent: Context | undefined) {
    this.view = contextView;
    this.parentContext = parent;
    this.cache = { '.': this.view };
  }

  public lookup(name: string): AnyObject {
    const { cache } = this;
    let value;
    if (Object.prototype.hasOwnProperty.call(cache, name)) {
      value = cache[name];
    } else {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let context: Context | undefined = this;
      let intermediateValue;
      let names;
      let index;
      let lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          intermediateValue = context.view;
          names = name.split('.');
          index = 0;

          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1) {
              lookupHit =
                hasProperty(intermediateValue, names[index]) ||
                primitiveHasOwnProperty(intermediateValue, names[index]);
            }
            // eslint-disable-next-line no-plusplus
            intermediateValue = intermediateValue[names[index++]];
            if (isArrayNode(intermediateValue)) {
              // eslint-disable-next-line prefer-destructuring
              intermediateValue = intermediateValue[0];
            }
          }
        } else {
          intermediateValue = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) {
          value = intermediateValue;
          break;
        }

        context = context.parentContext;
      }

      cache[name] = value;
    }
    return value;
  }

  public push(value: AnyObject): Context {
    return new Context(value, this);
  }
}

export function findTypeSchemaPropertyKeys(
  tree: RenderGraphWithIndex,
  path: string[],
): string[] | string {
  let currentNode: RenderGraph | undefined = tree.node;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < path.length - 1; i++) {
    let key = path[i];
    trace('findNestedPropertyKeys - key', key);
    let inEach = false;
    if (key.split(' ').length > 1) {
      // eslint-disable-next-line prefer-destructuring
      key = key.split(' ')[1];
      inEach = true;
    }
    trace('findNestedPropertyKeys - inEach', inEach);
    // If current node is an array, use the first element
    // if (isCollectionSchemaNode(currentNode)) {
    // currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
    // }
    // Check if the key exists in the current node
    if (keyExistInSchemaNode(currentNode, key)) {
      const childSchemaNode = getChildSchemaNode(currentNode!, key);
      trace('findNestedPropertyKeys - key in current node');
      if (!isBooleanSchemaNode(childSchemaNode)) {
        currentNode = childSchemaNode;
        if (inEach && !isCollectionSchemaNode(currentNode)) {
          trace('findNestedPropertyKeys - key in current node with each');
          // deepMerge all properties of each key of currentNode
          // @ts-ignore
          if (currentNode.children.length > 0) {
            // eslint-disable-next-line prefer-destructuring
            currentNode = currentNode!.children[0];
          }
        }
      }
    } else {
      // If the key doesn't exist, search in ancestors
      let ancestor = tree.node;
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < i; j++) {
        let ancestorKey = path[j];
        let ancestorInEach = false;
        if (ancestorKey.split(' ').length > 1) {
          // eslint-disable-next-line prefer-destructuring
          ancestorKey = ancestorKey.split(' ')[1];
          ancestorInEach = true;
        }
        if (keyExistInSchemaNode(ancestor, ancestorKey)) {
          ancestor = getChildSchemaNode(ancestor!, ancestorKey);
          // if (Array.isArray(ancestor)) {
          // ancestor = ancestor.length > 0 ? ancestor[0] : undefined;
          // }
          if (keyExistInSchemaNode(ancestor, key)) {
            const childSchemaNode = getChildSchemaNode(ancestor!, key);
            if (!isBooleanSchemaNode(childSchemaNode)) {
              currentNode = childSchemaNode;
              if (ancestorInEach && !isCollectionSchemaNode(currentNode)) {
                // deepMerge all properties of each key of currentNode
                // @ts-ignore
                if (currentNode.children.length > 0) {
                  // eslint-disable-next-line prefer-destructuring
                  currentNode = currentNode!.children[0];
                }
              }
            }
            break;
          }
        }
      }
      // If the key is not found in any ancestor, return "not object"
      if (!keyExistInSchemaNode(ancestor, key)) {
        return 'not object';
      }
    }
  }
  // If the final node is an array, use the first element
  // if (Array.isArray(currentNode)) {
  // currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
  // }

  // Check if the final node is an object and return its keys
  if (currentNode) {
    // return currentNode.name;
    if (currentNode!.children.length === 1 && currentNode!.children[0].attributes.isPatternField) {
      return ['replace_with_key'];
    }
    return Object.keys(currentNode!.childrenMap);
  }
  return 'not object';
}

export function getSchema(): AnyObject | string {
  const path = ['components', 'each schemas', 'each properties', ''];
  const tree = getTree(openapi31TypeSchema);
  // tree.node.children
  // console.log(tree.index, tree.exploreDefinition);

  /*  tree.node.children.forEach((child) => {
    console.log(child.name, child.attributes, child.types, child.parent?.name);
  });
  console.log(
    tree.node.childrenMap.components.childrenMap.parameters.childrenMap.name.childrenMap.deprecated,
  );
  return {};
  */
  let currentNode: RenderGraph | undefined = tree.node;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < path.length - 1; i++) {
    let key = path[i];
    trace('findNestedPropertyKeys - key', key);
    let inEach = false;
    if (key.split(' ').length > 1) {
      // eslint-disable-next-line prefer-destructuring
      key = key.split(' ')[1];
      inEach = true;
    }
    trace('findNestedPropertyKeys - inEach', inEach);
    // If current node is an array, use the first element
    // if (isCollectionSchemaNode(currentNode)) {
    // currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
    // }
    // Check if the key exists in the current node
    if (keyExistInSchemaNode(currentNode, key)) {
      const childSchemaNode = getChildSchemaNode(currentNode!, key);
      trace('findNestedPropertyKeys - key in current node');
      if (!isBooleanSchemaNode(childSchemaNode)) {
        currentNode = childSchemaNode;
        if (inEach && !isCollectionSchemaNode(currentNode)) {
          trace('findNestedPropertyKeys - key in current node with each');
          // deepMerge all properties of each key of currentNode
          // @ts-ignore
          if (currentNode.children.length > 0) {
            // eslint-disable-next-line prefer-destructuring
            currentNode = currentNode!.children[0];
          }
        }
      }
    } else {
      // If the key doesn't exist, search in ancestors
      let ancestor = tree.node;
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < i; j++) {
        let ancestorKey = path[j];
        let ancestorInEach = false;
        if (ancestorKey.split(' ').length > 1) {
          // eslint-disable-next-line prefer-destructuring
          ancestorKey = ancestorKey.split(' ')[1];
          ancestorInEach = true;
        }
        if (keyExistInSchemaNode(ancestor, ancestorKey)) {
          ancestor = getChildSchemaNode(ancestor!, ancestorKey);
          // if (Array.isArray(ancestor)) {
          // ancestor = ancestor.length > 0 ? ancestor[0] : undefined;
          // }
          if (keyExistInSchemaNode(ancestor, key)) {
            const childSchemaNode = getChildSchemaNode(ancestor!, key);
            if (!isBooleanSchemaNode(childSchemaNode)) {
              currentNode = childSchemaNode;
              if (ancestorInEach && !isCollectionSchemaNode(currentNode)) {
                // deepMerge all properties of each key of currentNode
                // @ts-ignore
                if (currentNode.children.length > 0) {
                  // eslint-disable-next-line prefer-destructuring
                  currentNode = currentNode!.children[0];
                }
              }
            }
            break;
          }
        }
      }
      // If the key is not found in any ancestor, return "not object"
      if (!keyExistInSchemaNode(ancestor, key)) {
        return 'not object';
      }
    }
  }
  // If the final node is an array, use the first element
  // if (Array.isArray(currentNode)) {
  // currentNode = currentNode.length > 0 ? currentNode[0] : undefined;
  // }

  // Check if the final node is an object and return its keys
  if (currentNode) {
    // return currentNode.name;
    if (currentNode!.children.length === 1 && currentNode!.children[0].attributes.isPatternField) {
      return ['replace_with_key'];
    }
    return Object.keys(currentNode!.childrenMap);
  }
  return 'not object';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isCollectionSchemaNode(node: RenderGraph | undefined): boolean {
  return node?.attributes?.collection !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function keyExistInSchemaNode(node: RenderGraph | undefined, key: string): boolean {
  return node?.childrenMap[key] !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getChildSchemaNode(node: RenderGraph, key: string): RenderGraph {
  return node.childrenMap[key];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isBooleanSchemaNode(node: RenderGraph): boolean {
  return node.types.includes('boolean') && node.types.length === 1;
}
