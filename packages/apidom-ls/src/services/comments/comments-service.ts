import { TextDocument } from 'vscode-languageserver-textdocument';
import { findAtOffset, ObjectElement, MemberElement, Element } from '@swagger-api/apidom-core';
// eslint-disable-next-line import/order
import { Position, Range } from 'vscode-languageserver-types';
// import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';

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

  configure(settings?: LanguageSettings): void;

  // registerProvider(provider: CommentsProvider): void;
}

export class DefaultCommentsService implements CommentsService {
  private settings: LanguageSettings | undefined;

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

  // TODO add range to saved comments, handle special chars
  // TODO load and cache, load once
  // TODO handle range change
  // TODO handle also URI of doc to identify comments, or other means like API/DOmain..
  // eslint-disable-next-line class-methods-use-this
  public loadCommentsSync(textDocument: TextDocument): Map<string, Comments> {
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

  // eslint-disable-next-line class-methods-use-this
  public async getNodeComments(textDocument: TextDocument, position: Position): Promise<Comments> {
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

  public hasNodeComments(node: Element, textDocument: TextDocument): boolean {
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
  public async addNodeComment(
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
}
