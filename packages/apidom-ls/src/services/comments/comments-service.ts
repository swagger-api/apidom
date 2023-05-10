import { TextDocument } from 'vscode-languageserver-textdocument';
import { findAtOffset, ObjectElement, MemberElement, Element } from '@swagger-api/apidom-core';
// eslint-disable-next-line import/order
import { Position, Range } from 'vscode-languageserver-types';

import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';
import store from 'store';
import axios from 'axios';

import { LanguageSettings, Comments, Comment } from '../../apidom-language-types';
import {
  getSourceMap,
  isMember,
  isObject,
  isArray,
  correctPartialKeys,
  isJsonDoc,
  SourceMap,
  buildJsonPointer,
} from '../../utils/utils';

// const CONTROL_CODES = '\\u0000-\\u0020\\u007f-\\u009f';
/*
const WEB_LINK_REGEX = new RegExp(
  `(?:[a-zA-Z][a-zA-Z0-9+.-]{2,}:\\/\\/|data:|www\\.)[^\\s${CONTROL_CODES}"]{2,}[^\\s${CONTROL_CODES}"')}\\],:;.!?]`,
  'ug',
);
*/

export interface CommentsService {
  addNodeComment(textDocument: TextDocument, position: Position, value: string): Promise<void>;
  loadComments(textDocument: TextDocument): Promise<Map<string, Comments>>;
  loadCommentsSync(textDocument: TextDocument): Map<string, Comments>;
  getNodeComments(textDocument: TextDocument, position: Position): Promise<Comments>;
  hasNodeComments(node: Element, textDocument: TextDocument): boolean;
  testSync(textDocument: TextDocument, textDocumentNew: TextDocument): Promise<void>;
  syncComments(textDocument: TextDocument, event: unknown): Promise<void>;

  configure(settings?: LanguageSettings): void;

  getNodeCommentsNode(textDocument: TextDocument, node: Element): Promise<Comments>;
  // registerProvider(provider: CommentsProvider): void;
}

export class DefaultCommentsService implements CommentsService {
  private settings: LanguageSettings | undefined;

  private lastDoc: TextDocument | undefined;

  private currentDoc: TextDocument | undefined;

  private async parseDoc(textDocument: TextDocument): Promise<Element | null> {
    const isJson = await isJsonDoc(textDocument);
    let processedText;
    let result = await this.settings!.documentCache?.get(
      textDocument,
      undefined,
      'computeComments-parse-first',
    );
    if (!result) return null;

    if (result.annotations && !isJson) {
      processedText = correctPartialKeys(result, textDocument, isJson);
    }
    if (processedText) {
      result = await this.settings!.documentCache?.get(
        textDocument,
        processedText,
        'computeComments-parse-second',
      );
    }
    if (!result) return null;
    const { api } = result;
    // no API document has been parsed
    if (api === undefined) return null;
    // const docNs: string = (await findNamespace(text, this.settings?.defaultContentLanguage)).namespace;
    // const specVersion = getSpecVersion(api);

    api.freeze(); // !! freeze and add parent !!
    return api;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public async syncComments(textDocument: TextDocument, event: unknown): Promise<void> {
    console.log('syncComments');
    // return this.syncCommentsJsonPointer(textDocument, event);
    return this.syncCommentsNode(textDocument, event);
  }

  public async syncCommentsJsonPointer(textDocument: TextDocument, event: unknown): Promise<void> {
    console.log('syncComments', JSON.stringify(event));
    this.lastDoc = this.currentDoc;
    if (!this.lastDoc) {
      this.lastDoc = textDocument;
    }
    this.currentDoc = textDocument;
    // const pos = Position.create(5, 14);
    // await this.addNodeComment(this.lastDoc, pos, 'test1');
    // const comments = await this.getNodeComments(this.lastDoc, pos);
    const allComments = this.loadCommentsSync(this.lastDoc);
    if (!allComments) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    allComments.forEach(async (comments, key) => {
      const { jsonPointer } = comments;
      console.log('jsonPointer', jsonPointer);
      // const offset = textDocumentOld.offsetAt(pos);
      // console.log('offset', offset);
      const apiOld = await this.parseDoc(this.lastDoc!);
      const apiNew = await this.parseDoc(this.currentDoc!);

      let existingCommentPointerEl = jsonPointerEvaluate(jsonPointer, apiOld!);
      if (
        existingCommentPointerEl &&
        existingCommentPointerEl.parent &&
        isMember(existingCommentPointerEl.parent)
      ) {
        existingCommentPointerEl = existingCommentPointerEl.parent.key as Element;
      }

      if (!event) {
        return;
      }
      const nodeChangeStart = findAtOffset(
        // @ts-ignore
        { offset: event.changes[0].rangeOffset, includeRightBound: true },
        apiOld!,
      );
      const nodeChangeEnd = findAtOffset(
        {
          // @ts-ignore
          offset: event.changes[0].rangeOffset + event.changes[0].rangeLength,
          includeRightBound: true,
        },
        apiOld!,
      );

      const nodeChangeStartNew = findAtOffset(
        // @ts-ignore
        { offset: event.changes[0].rangeOffset, includeRightBound: true },
        apiNew!,
      );

      if (nodeChangeStart !== nodeChangeEnd) {
        console.log('start and end different');
        console.log(nodeChangeStart!.toValue());
        console.log(nodeChangeEnd!.toValue());
        return;
      }
      if (nodeChangeStart !== existingCommentPointerEl) {
        console.log('comment and change different');
        console.log('nodeChangeStart', nodeChangeStart!.toValue());
        console.log('nodeChangeEnd', nodeChangeEnd!.toValue());
        console.log('existingCommentPointerEl', existingCommentPointerEl!.toValue());
        const oldNodePath: string[] = [];
        DefaultCommentsService.buildPointer(nodeChangeStart!, oldNodePath);
        const oldPath = buildJsonPointer(oldNodePath, '');
        console.log('oldPath', oldPath);

        const nodePath: string[] = [];
        DefaultCommentsService.buildPointer(nodeChangeStartNew!, nodePath);
        const path = buildJsonPointer(nodePath, '');
        console.log('path', path);
        if (jsonPointer.includes(oldPath)) {
          console.log('JSONPOINTER INCLUDES OLD PATH');
          // eslint-disable-next-line no-param-reassign
          comments.jsonPointer = jsonPointer.replace(oldPath, path);
          const storedComments = DefaultCommentsService.localStorage_getItem(
            `apidomComments-${jsonPointer}`,
          );
          console.log('storedComments', storedComments);
          DefaultCommentsService.localStorage_setItem(
            `apidomComments-${comments.jsonPointer}`,
            storedComments!,
          ); // TODO not updating range
          DefaultCommentsService.localStorage_deleteItem(`apidomComments-${jsonPointer}`);
        }
      } else {
        console.log('same comment and change');
        const nodePath: string[] = [];
        DefaultCommentsService.buildPointer(nodeChangeStartNew!, nodePath);
        const path = buildJsonPointer(nodePath, '');
        console.log('path', path);
        // eslint-disable-next-line no-param-reassign
        comments.jsonPointer = path;
        const storedComments = DefaultCommentsService.localStorage_getItem(
          `apidomComments-${jsonPointer}`,
        );
        console.log('storedComments', storedComments);
        DefaultCommentsService.localStorage_setItem(`apidomComments-${path}`, storedComments!); // TODO not updating range
        DefaultCommentsService.localStorage_deleteItem(`apidomComments-${jsonPointer}`);
      }
    });
  }

  public async syncCommentsNode(textDocument: TextDocument, event: unknown): Promise<void> {
    console.log('syncCommentsNode', JSON.stringify(event));
    this.lastDoc = this.currentDoc;
    if (!this.lastDoc) {
      this.lastDoc = textDocument;
    }
    this.currentDoc = textDocument;
    // const pos = Position.create(5, 14);
    // await this.addNodeComment(this.lastDoc, pos, 'test1');
    // const comments = await this.getNodeComments(this.lastDoc, pos);
    const allComments = this.loadCommentsSync(this.lastDoc);
    if (!allComments) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    allComments.forEach(async (comments, key) => {
      const offset = Number(key);
      console.log('syncCommentsNode offset', offset);
      if (!event) {
        return;
      }
      // @ts-ignore
      const rangeStart = event.changes[0].rangeOffset;
      // @ts-ignore
      const { rangeLength } = event.changes[0];
      const rangeEnd = rangeStart + rangeLength;
      // @ts-ignore
      const textLength = event.changes[0].text.length;

      if (rangeStart <= offset) {
        console.log('range start before comment offset');
        if (rangeEnd <= offset) {
          console.log('range end before comment offset');
          const newOffset = offset - rangeLength + textLength;
          console.log('newOffset', newOffset);
          const storedComments = DefaultCommentsService.localStorage_getItem(
            `apidomCommentsNode-${offset}`,
          );
          console.log('storedComments', storedComments);
          DefaultCommentsService.localStorage_setItem(
            `apidomCommentsNode-${newOffset}`,
            storedComments!,
          ); // TODO not updating range
          DefaultCommentsService.localStorage_deleteItem(`apidomCommentsNode-${offset}`);
        } else {
          console.log('range end after comment offset');
        }
      } else {
        console.log('range start after comment offset');
      }
    });
  }

  private static _initialize: void = ((): void => {})();

  private static _localStorage: Map<string, string> = new Map();

  public static async getValue(appkey: string, itemkey: string): Promise<string> {
    const data = await axios.get(
      `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appkey}/${itemkey}`,
    );
    return data.data;
  }

  public static async updateValue(appkey: string, itemkey: string, itemval: string) {
    await axios({
      method: 'post',
      url: `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appkey}/${itemkey}/${itemval}`,
    });
  }

  // private commentsProviders: CommentsProvider[] = [];

  // TODO move to utils! merge with existing functions

  private static buildPointer(traverseNode: Element, nodePath: string[]) {
    if (!traverseNode) return;
    if (traverseNode.parent && isMember(traverseNode.parent)) {
      nodePath.unshift((traverseNode.parent.key as Element).toValue());
      DefaultCommentsService.buildPointer(traverseNode.parent?.parent, nodePath);
    } else if (traverseNode.parent && isArray(traverseNode.parent)) {
      // eslint-disable-next-line no-unused-vars
      traverseNode.parent.forEach((value, index) => {
        if (value === traverseNode) {
          // nodePath.unshift(`[${index.toValue()}]`);
          // @ts-ignore
          nodePath.unshift(`${index.toValue()}`);
          DefaultCommentsService.buildPointer(traverseNode.parent, nodePath);
        }
      });
    }
  }

  public configure(settings?: LanguageSettings): void {
    /*    store.set(
      'apidomComments-/servers/scram-connections/protocol',
      'Comment to /servers/scram-connections/protocol 1#value#549-12|Comment to /servers/scram-connections/protocol 2#value#549-12',
    );
    store.set(
      'apidomComments-/servers/scram-connections/url',
      'Comment to /servers/scram-connections/url 1#value#549-12|Comment to /servers/scram-connections/url 2#value#549-12',
    ); */
    this.settings = settings;
    if (settings) {
      /*      if (settings.commentsProviders) {
        this.commentsProviders = settings.commentsProviders;
      }
      for (const provider of this.commentsProviders) {
        if (provider.configure) {
          provider.configure(settings);
        }
      } */
    }
  }

  /* public registerProvider(provider: CommentsProvider): void {
    this.commentsProviders.push(provider);
    if (this.settings) {
      if (provider.configure) {
        provider.configure(this.settings);
      }
    }
  } */

  public static localStorage_getItem(key: string): string | undefined | null {
    // eslint-disable-next-line no-underscore-dangle
    // return DefaultCommentsService._localStorage.get(key);
    return store.get(key);
    // return localStorage.getItem(key);
  }

  public static localStorage_setItem(key: string, value: string): void {
    // eslint-disable-next-line no-underscore-dangle
    // DefaultCommentsService._localStorage.set(key, value);
    store.set(key, value);
    // localStorage.setItem(key, value);
  }

  public static localStorage_deleteItem(key: string): void {
    // eslint-disable-next-line no-underscore-dangle
    // DefaultCommentsService._localStorage.set(key, value);
    store.remove(key);
    // localStorage.setItem(key, value);
  }

  public static localStorage_items(): Map<string, string> {
    // eslint-disable-next-line no-underscore-dangle
    // return DefaultCommentsService._localStorage;
    const map = new Map<string, string>();
    store.each((val, key) => {
      map.set(key, val);
    });
    // eslint-disable-next-line no-plusplus
    /*    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      map.set(key, localStorage.getItem(key)!);
    } */
    return map;
  }

  public async loadComments(textDocument: TextDocument): Promise<Map<string, Comments>> {
    return this.loadCommentsSync(textDocument);
  }

  public loadCommentsSync(textDocument: TextDocument): Map<string, Comments> {
    // return this.loadCommentsSyncJsonPointer(textDocument);
    return this.loadCommentsSyncNode(textDocument);
  }

  // TODO add range to saved comments, handle special chars
  // TODO load and cache, load once
  // TODO handle range change
  // TODO handle also URI of doc to identify comments, or other means like API/DOmain..
  // eslint-disable-next-line class-methods-use-this
  public loadCommentsSyncJsonPointer(textDocument: TextDocument): Map<string, Comments> {
    const map = new Map<string, Comments>();
    // eslint-disable-next-line no-underscore-dangle
    const items = DefaultCommentsService.localStorage_items();
    items.forEach((val, key) => {
      if (key.startsWith('apidomComments-')) {
        const jsonPointer = key.substring('apidomComments-'.length);
        if (val) {
          const lines = val!.split('|');
          const keyCommentEntries: Comment[] = [];
          const valueCommentEntries: Comment[] = [];
          for (const line of lines) {
            const data = line.split('#');
            const dataText = data[0];
            const dataType = data[1];
            const dataRange = data[2];
            const range = Range.create(
              textDocument.positionAt(+dataRange.split('-')[0]),
              textDocument.positionAt(+dataRange.split('-')[0] + +dataRange.split('-')[1]),
            );
            const comment: Comment = {
              value: dataText,
              jsonPointer,
              range,
            };
            if (dataType === 'key') {
              keyCommentEntries.push(comment);
            } else {
              valueCommentEntries.push(comment);
            }
          }
          const comments: Comments = {
            jsonPointer,
            keyComments: keyCommentEntries,
            valueComments: valueCommentEntries,
          };
          map.set(jsonPointer, comments);
        }
      }
    });
    return map;
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  public loadCommentsSyncNode(textDocument: TextDocument): Map<string, Comments> {
    const map = new Map<string, Comments>();
    console.log('loadCommentsSyncNode');
    // eslint-disable-next-line no-underscore-dangle
    const items = DefaultCommentsService.localStorage_items();
    console.log('loadCommentsSyncNode items', JSON.stringify(items));
    items.forEach((val, key) => {
      console.log('loadCommentsSyncNode item', key);
      if (key.startsWith('apidomCommentsNode-')) {
        const offset = key.substring('apidomCommentsNode-'.length);
        console.log('loadCommentsSyncNode offset', offset);
        if (val) {
          const lines = val!.split('|');
          console.log('loadCommentsSyncNode lines', lines);
          const keyCommentEntries: Comment[] = [];
          const valueCommentEntries: Comment[] = [];
          for (const line of lines) {
            const data = line.split('#');
            const dataText = data[0];
            console.log('loadCommentsSyncNode data', dataText);
            /*            const dataOffset = Number(data[2]);
            const range = Range.create(
              textDocument.positionAt(+dataRange.split('-')[0]),
              textDocument.positionAt(+dataRange.split('-')[0] + +dataRange.split('-')[1]),
            ); */
            const comment: Comment = {
              value: dataText,
              jsonPointer: 'none',
            };
            keyCommentEntries.push(comment);
          }
          const comments: Comments = {
            jsonPointer: 'none',
            keyComments: keyCommentEntries,
            valueComments: valueCommentEntries,
            offset: Number(offset),
          };
          map.set(offset, comments);
        }
      }
    });
    return map;
  }

  public async getNodeComments(textDocument: TextDocument, position: Position): Promise<Comments> {
    return this.getNodeCommentsJsonPointer(textDocument, position);
  }

  // eslint-disable-next-line class-methods-use-this
  public async getNodeCommentsJsonPointer(
    textDocument: TextDocument,
    position: Position,
  ): Promise<Comments> {
    const errorComments: Comments = {
      jsonPointer: '',
      nodeType: 'unknown',
    };
    // const text: string = textDocument.getText();
    const offset = textDocument.offsetAt(position);
    const allComments = await this.loadComments(textDocument);
    const isJson = await isJsonDoc(textDocument);
    let processedText;

    let result = await this.settings!.documentCache?.get(
      textDocument,
      undefined,
      'computeComments-parse-first',
    );
    if (!result) return errorComments;

    if (result.annotations && !isJson) {
      processedText = correctPartialKeys(result, textDocument, isJson);
    }
    if (processedText) {
      result = await this.settings!.documentCache?.get(
        textDocument,
        processedText,
        'computeComments-parse-second',
      );
    }
    if (!result) return errorComments;
    const { api } = result;
    // no API document has been parsed
    if (api === undefined) return errorComments;
    // const docNs: string = (await findNamespace(text, this.settings?.defaultContentLanguage)).namespace;
    // const specVersion = getSpecVersion(api);

    api.freeze(); // !! freeze and add parent !!
    const node = findAtOffset({ offset, includeRightBound: true }, api);
    if (!node) {
      return errorComments;
    }
    let nodeType: 'key' | 'value' | 'unknown' = 'value';
    let sm: SourceMap | undefined;
    if (node) {
      sm = getSourceMap(node);
    }
    let range: Range | undefined;
    if (sm) {
      range = Range.create(
        textDocument.positionAt(sm.offset),
        textDocument.positionAt(sm.offset + sm.length),
      );
    }
    if (node && node.parent && isMember(node.parent)) {
      if (node.parent.value !== node) {
        nodeType = 'key';
      }
    }
    let el: Element = node!;
    if (node && node.parent && isMember(node.parent)) {
      if (!isObject(node) && isArray(node)) {
        el = node;
      } else {
        el = (<MemberElement>node.parent).value as ObjectElement;
      }
    }
    const nodePath: string[] = [];
    DefaultCommentsService.buildPointer(el, nodePath);
    const path = buildJsonPointer(nodePath, '');
    let storedComments = allComments.get(path);
    if (!storedComments) {
      storedComments = {
        jsonPointer: path,
      };
    }
    storedComments.nodeType = nodeType;
    storedComments.range = range;
    return storedComments;
    // let elementValue = el.element;

    /*      try {
        for (const provider of this.commentsProviders) {
          if (
            provider
              .namespaces()
              .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
            provider.doHover &&
            (!provider.providerMode || provider.providerMode() === ProviderMode.FULL)
          ) {
            // eslint-disable-next-line no-await-in-loop
            const commentsProviderResult = await provider.doHover(
              textDocument,
              position,
              node,
              api,
              contents,
            );
            switch (commentsProviderResult.mergeStrategy) {
              case MergeStrategy.APPEND:
                contents.push(...commentsProviderResult.commentsContent);
                break;
              case MergeStrategy.PREPEND:
                contents.unshift(...commentsProviderResult.commentsContent);
                break;
              case MergeStrategy.REPLACE:
                contents.splice(0, contents.length, ...commentsProviderResult.commentsContent);
                break;
              case MergeStrategy.IGNORE:
                break;
              default:
                contents.push(...commentsProviderResult.commentsContent);
            }
            if (provider.break()) {
              break;
            }
          }
        }
      } catch (e) {
        console.log('error in comments provider');
      } */
  }

  // eslint-disable-next-line class-methods-use-this
  public async getNodeCommentsNode(textDocument: TextDocument, node: Element): Promise<Comments> {
    const errorComments: Comments = {
      jsonPointer: '',
      nodeType: 'unknown',
    };
    const allComments = await this.loadComments(textDocument);
    if (!node) {
      return errorComments;
    }

    let valNode = node;
    let keyNode = node;
    if (node && node.parent && isMember(node.parent)) {
      if (node.parent.value === node) {
        keyNode = node.parent.key as Element;
      } else {
        valNode = node.parent.value as Element;
      }
    }
    console.log('getNodeCommentsNode key/val node', keyNode.toValue(), valNode.toValue());
    const nodeStart = getSourceMap(keyNode)!.offset;
    const nodeEnd = getSourceMap(valNode)!.offset + getSourceMap(valNode)!.length;
    console.log('getNodeCommentsNode nodeStart', nodeStart, nodeEnd);
    const returnedComments: Comments = {
      jsonPointer: 'none',
      offset: nodeStart,
      keyComments: [],
    };
    allComments.forEach((value, key) => {
      console.log('getNodeCommentsNode loop', key);
      if (Number(key) >= nodeStart && Number(key) <= nodeEnd) {
        console.log('getNodeCommentsNode loop TRUE', key);
        returnedComments.keyComments!.push(...value.keyComments!);
      }
    });

    return returnedComments;
  }

  public hasNodeComments(node: Element, textDocument: TextDocument): boolean {
    // return this.hasNodeCommentsJsonPointer(node, textDocument);
    return this.hasNodeCommentsNode(node, textDocument);
  }

  public hasNodeCommentsJsonPointer(node: Element, textDocument: TextDocument): boolean {
    if (!node) {
      return false;
    }
    const allComments = this.loadCommentsSync(textDocument);
    let el: Element = node!;
    if (node && node.parent && isMember(node.parent)) {
      if (!isObject(node) && isArray(node)) {
        el = node;
      } else {
        el = (<MemberElement>node.parent).value as ObjectElement;
      }
    }
    const nodePath: string[] = [];
    DefaultCommentsService.buildPointer(el, nodePath);
    const path = buildJsonPointer(nodePath, '');
    const storedComments = allComments.get(path);
    if (!storedComments) {
      return false;
    }
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  public hasNodeCommentsNode(node: Element, textDocument: TextDocument): boolean {
    const allComments = this.loadCommentsSyncNode(textDocument);
    if (!node) {
      return false;
    }

    let valNode = node;
    let keyNode = node;
    if (node && node.parent && isMember(node.parent)) {
      if (node.parent.value === node) {
        keyNode = node.parent.key as Element;
      } else {
        valNode = node.parent.key as Element;
      }
    }
    console.log('hasNodeCommentsNode key/val node', keyNode.toValue(), valNode.toValue());
    const nodeStart = getSourceMap(keyNode)!.offset;
    const nodeEnd = getSourceMap(valNode)!.offset + getSourceMap(valNode)!.length;
    console.log('hasNodeCommentsNode nodeStart', nodeStart, nodeEnd);
    let result = false;
    allComments.forEach((value, key) => {
      console.log('hasNodeCommentsNode loop', key);
      if (Number(key) >= nodeStart && Number(key) <= nodeEnd) {
        console.log('hasNodeCommentsNode loop TRUE', key);
        result = true;
      }
    });

    return result;
  }

  public async addNodeComment(
    textDocument: TextDocument,
    position: Position,
    value: string,
  ): Promise<void> {
    // return this.addNodeCommentJsonPointer(textDocument, position, value);
    return this.addNodeCommentNode(textDocument, position, value);
  }

  // eslint-disable-next-line class-methods-use-this
  public async addNodeCommentJsonPointer(
    textDocument: TextDocument,
    position: Position,
    value: string,
  ): Promise<void> {
    // const text: string = textDocument.getText();
    const offset = textDocument.offsetAt(position);

    const isJson = await isJsonDoc(textDocument);
    let processedText;

    let result = await this.settings!.documentCache?.get(
      textDocument,
      undefined,
      'addNodeComment-parse-first',
    );
    if (!result) return;

    if (result.annotations && !isJson) {
      processedText = correctPartialKeys(result, textDocument, isJson);
    }
    if (processedText) {
      result = await this.settings!.documentCache?.get(
        textDocument,
        processedText,
        'addNodeComment-parse-second',
      );
    }
    if (!result) return;
    const { api } = result;
    // no API document has been parsed
    if (api === undefined) return;
    // const docNs: string = (await findNamespace(text, this.settings?.defaultContentLanguage)).namespace;
    // const specVersion = getSpecVersion(api);

    api.freeze(); // !! freeze and add parent !!

    const node = findAtOffset({ offset, includeRightBound: true }, api);
    if (!node) {
      return;
    }
    let nodeType: 'key' | 'value' | 'unknown' = 'value';
    let sm: SourceMap | undefined;
    if (node) {
      sm = getSourceMap(node);
    }
    let range: Range | undefined;
    if (sm) {
      range = Range.create(
        textDocument.positionAt(sm.offset),
        textDocument.positionAt(sm.offset + sm.length),
      );
    }

    if (node && node.parent && isMember(node.parent)) {
      if (node.parent.value !== node) {
        nodeType = 'key';
      }
    }
    let el: Element = node!;
    if (node && node.parent && isMember(node.parent)) {
      if (!isObject(node) && isArray(node)) {
        el = node;
      } else {
        el = (<MemberElement>node.parent).value as ObjectElement;
      }
    }
    const nodePath: string[] = [];
    DefaultCommentsService.buildPointer(el, nodePath);
    const path = buildJsonPointer(nodePath, '');
    const rangeOffsetStart = textDocument.offsetAt(range!.start);
    const rangeOffsetEnd = textDocument.offsetAt(range!.end);
    let commentEntry = `${value}#${nodeType}#${rangeOffsetStart}-${
      rangeOffsetEnd - rangeOffsetStart
    }`;
    // const storedComments = localStorage.getItem(`apidomComments-${path}`);
    const storedComments = DefaultCommentsService.localStorage_getItem(`apidomComments-${path}`);
    if (storedComments) {
      commentEntry = `${storedComments}|${commentEntry}`;
    }
    console.log('adding comment ', `apidomComments-${path}`, commentEntry);
    DefaultCommentsService.localStorage_setItem(`apidomComments-${path}`, commentEntry);
    // let elementValue = el.element;

    /*      try {
        for (const provider of this.commentsProviders) {
          if (
            provider
              .namespaces()
              .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
            provider.doHover &&
            (!provider.providerMode || provider.providerMode() === ProviderMode.FULL)
          ) {
            // eslint-disable-next-line no-await-in-loop
            const commentsProviderResult = await provider.doHover(
              textDocument,
              position,
              node,
              api,
              contents,
            );
            switch (commentsProviderResult.mergeStrategy) {
              case MergeStrategy.APPEND:
                contents.push(...commentsProviderResult.commentsContent);
                break;
              case MergeStrategy.PREPEND:
                contents.unshift(...commentsProviderResult.commentsContent);
                break;
              case MergeStrategy.REPLACE:
                contents.splice(0, contents.length, ...commentsProviderResult.commentsContent);
                break;
              case MergeStrategy.IGNORE:
                break;
              default:
                contents.push(...commentsProviderResult.commentsContent);
            }
            if (provider.break()) {
              break;
            }
          }
        }
      } catch (e) {
        console.log('error in comments provider');
      } */
  }

  // eslint-disable-next-line class-methods-use-this
  public async addNodeCommentNode(
    textDocument: TextDocument,
    position: Position,
    value: string,
  ): Promise<void> {
    // const text: string = textDocument.getText();
    const offset = textDocument.offsetAt(position);
    let commentEntry = `${value}#${offset}`;
    // const storedComments = localStorage.getItem(`apidomComments-${path}`);
    const storedComments = DefaultCommentsService.localStorage_getItem(
      `apidomCommentsNode-${offset}`,
    );
    if (storedComments) {
      commentEntry = `${storedComments}|${commentEntry}`;
    }
    console.log('adding comment ', `apidomCommentsNode-${offset}`, commentEntry);
    DefaultCommentsService.localStorage_setItem(`apidomCommentsNode-${offset}`, commentEntry);
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  public async testSync(
    textDocumentOld: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocumentNew: TextDocument,
  ): Promise<void> {
    console.log('sync');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const eventOld = {
      changes: [
        {
          range: { startLineNumber: 6, startColumn: 6, endLineNumber: 6, endColumn: 6 },
          rangeLength: 0,
          text: 's',
          rangeOffset: 143,
          forceMoveMarkers: false,
        },
      ],
      eol: '\n',
      versionId: 3,
      isUndoing: false,
      isRedoing: false,
      isFlush: false,
    };

    const event = {
      changes: [
        {
          range: { startLineNumber: 6, startColumn: 6, endLineNumber: 6, endColumn: 15 },
          rangeLength: 9,
          text: 's',
          rangeOffset: 143,
          forceMoveMarkers: false,
        },
      ],
      eol: '\n',
      versionId: 3,
      isUndoing: false,
      isRedoing: false,
      isFlush: false,
    };

    // const changes
    const pos = Position.create(5, 14);
    await this.addNodeComment(textDocumentOld, pos, 'test1');
    const comments = await this.getNodeComments(textDocumentOld, pos);
    const { jsonPointer } = comments;
    console.log('jsonPointer', jsonPointer);
    // const offset = textDocumentOld.offsetAt(pos);
    // console.log('offset', offset);
    const apiOld = await this.parseDoc(textDocumentOld);

    let existingCommentPointerEl = jsonPointerEvaluate(jsonPointer, apiOld!);
    if (
      existingCommentPointerEl &&
      existingCommentPointerEl.parent &&
      isMember(existingCommentPointerEl.parent)
    ) {
      existingCommentPointerEl = existingCommentPointerEl.parent.key as Element;
    }

    const nodeChangeStart = findAtOffset(
      { offset: event.changes[0].rangeOffset, includeRightBound: true },
      apiOld!,
    );
    const nodeChangeEnd = findAtOffset(
      {
        offset: event.changes[0].rangeOffset + event.changes[0].rangeLength,
        includeRightBound: true,
      },
      apiOld!,
    );
    if (nodeChangeStart !== nodeChangeEnd) {
      console.log('start and end different');
      console.log(nodeChangeStart!.toValue());
      console.log(nodeChangeEnd!.toValue());
      return;
    }
    if (nodeChangeStart !== existingCommentPointerEl) {
      console.log('comment and change different');
      console.log('nodeChangeStart', nodeChangeStart!.toValue());
      console.log('nodeChangeEnd', nodeChangeEnd!.toValue());
      console.log('existingCommentPointerEl', existingCommentPointerEl!.toValue());
      const apiNew = await this.parseDoc(textDocumentNew);
      const nodeChangeStartNew = findAtOffset(
        { offset: event.changes[0].rangeOffset, includeRightBound: true },
        apiNew!,
      );
      const nodePath: string[] = [];
      DefaultCommentsService.buildPointer(nodeChangeStartNew!, nodePath);
      const path = buildJsonPointer(nodePath, '');
      console.log('path', path);
      comments.jsonPointer = path;
      const storedComments = DefaultCommentsService.localStorage_getItem(
        `apidomComments-${jsonPointer}`,
      );
      console.log('storedComments', storedComments);
      DefaultCommentsService.localStorage_setItem(`apidomComments-${path}`, storedComments!); // TODO not updating range
      DefaultCommentsService.localStorage_deleteItem(`apidomComments-${jsonPointer}`);
    } else {
      console.log('same comment and change');
      const apiNew = await this.parseDoc(textDocumentNew);
      const nodeChangeStartNew = findAtOffset(
        { offset: event.changes[0].rangeOffset, includeRightBound: true },
        apiNew!,
      );
      const nodePath: string[] = [];
      DefaultCommentsService.buildPointer(nodeChangeStartNew!, nodePath);
      const path = buildJsonPointer(nodePath, '');
      console.log('path', path);
      comments.jsonPointer = path;
      const storedComments = DefaultCommentsService.localStorage_getItem(
        `apidomComments-${jsonPointer}`,
      );
      console.log('storedComments', storedComments);
      DefaultCommentsService.localStorage_setItem(`apidomComments-${path}`, storedComments!); // TODO not updating range
      DefaultCommentsService.localStorage_deleteItem(`apidomComments-${jsonPointer}`);
    }

    // const nodePath: string[] = [];
    // DefaultCommentsService.buildPointer(el, nodePath);
    // const path = buildJsonPointer(nodePath, '');
  }
}
