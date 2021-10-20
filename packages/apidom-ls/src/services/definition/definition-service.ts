import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element, findAtOffset, ObjectElement, MemberElement } from '@swagger-api/apidom-core';
import { Location, Range } from 'vscode-languageserver-types';
import { DefinitionParams, ReferenceParams } from 'vscode-languageserver-protocol';
// @ts-ignore
import { jsonPointerEvaluate } from '@swagger-api/apidom-reference';

import { LanguageSettings } from '../../apidom-language-types';
import { getSourceMap, isArray, isMember, isObject } from '../../utils/utils';

export interface DefinitionService {
  doProvideDefinition(
    textDocument: TextDocument,
    definitionParams: DefinitionParams,
  ): Promise<Location | null>;

  doProvideReferences(
    textDocument: TextDocument,
    referenceParams: ReferenceParams,
  ): Promise<Location[] | null>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultDefinitionService implements DefinitionService {
  private settings: LanguageSettings | undefined;

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  public async doProvideDefinition(
    textDocument: TextDocument,
    definitionParams: DefinitionParams,
  ): Promise<Location | null> {
    const offset = textDocument.offsetAt(definitionParams.position);

    const result = await this.settings!.documentCache?.get(textDocument);
    if (!result) return null;
    const api: ObjectElement = <ObjectElement>result.api;

    // no API document has been parsed
    if (api === undefined) return null;

    // TODO (francesco.tumanischvili@smartbear.com): handle by predicates and adapters, look for
    // refElements and/or metadata, replace current shaky handling by `$ref` key lookup
    const node = findAtOffset({ offset, includeRightBound: true }, api);
    if (node && node.parent && isMember(node.parent)) {
      let el: Element;
      if (!isObject(node) && isArray(node)) {
        el = node;
      } else {
        el = (<MemberElement>node.parent).key as ObjectElement;
      }
      if (el?.toValue() !== '$ref') {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ref = node.toValue();
      // TODO (francesco.tumanischvili@smartbear.com): handle by URL parsing
      if (!ref.startsWith('#')) {
        return null;
      }
      // TODO (francesco.tumanischvili@smartbear.com): replace with fragment deref
      const refTarget = jsonPointerEvaluate(ref.substring(1, ref.length), api);
      const nodeSourceMap = getSourceMap(refTarget);
      const range = Range.create(
        textDocument.positionAt(nodeSourceMap.offset),
        textDocument.positionAt(nodeSourceMap.endOffset || nodeSourceMap.offset + 1),
      );
      return {
        uri: textDocument.uri,
        range,
      };
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  public async doProvideReferences(
    textDocument: TextDocument,
    referenceParams: ReferenceParams,
  ): Promise<Location[] | null> {
    // const asyncapi: boolean = isAsyncDoc(textDocument);
    const offset = textDocument.offsetAt(referenceParams.position);

    const result = await this.settings!.documentCache?.get(textDocument);
    if (!result) return null;
    const api: ObjectElement = <ObjectElement>result.api;

    // no API document has been parsed
    if (api === undefined) return null;

    // TODO(francesco.tumanischvili@smartbear.com): handle by predicates and adapters, look for
    // refElements and/or metadata, replace current shaky handling by `$ref` key lookup
    const node = findAtOffset({ offset, includeRightBound: true }, api);
    if (node && node.parent && isMember(node.parent)) {
      let el: Element;
      if (!isObject(node) && isArray(node)) {
        el = node;
      } else {
        el = (<MemberElement>node.parent).key as ObjectElement;
      }
      if (el?.toValue() !== '$ref') {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ref = node.toValue();
      // TODO (francesco.tumanischvili@smartbear.com): handle by URL parsing
      if (!ref.startsWith('#')) {
        return null;
      }
      // TODO (francesco.tumanischvili@smartbear.com): replace with fragment deref
      const refTarget = jsonPointerEvaluate(ref.substring(1, ref.length), api);
      const nodeSourceMap = getSourceMap(refTarget);
      const range = Range.create(
        textDocument.positionAt(nodeSourceMap.offset),
        textDocument.positionAt(nodeSourceMap.endOffset || nodeSourceMap.offset + 1),
      );
      return [
        {
          uri: textDocument.uri,
          range,
        },
      ];
    }
    return null;
  }
}
