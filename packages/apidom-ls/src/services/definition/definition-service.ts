import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element, findAtOffset, ObjectElement, MemberElement } from '@swagger-api/apidom-core';
import { Location, Range } from 'vscode-languageserver-types';
import { DefinitionParams, ReferenceParams } from 'vscode-languageserver-protocol';
import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';
import { dereferenceApiDOM } from '@swagger-api/apidom-reference';

import { LanguageSettings } from '../../apidom-language-types';
import {
  findNamespace,
  getSourceMap,
  getSpecVersion,
  isArray,
  isMember,
  isObject,
  debug,
} from '../../utils/utils';

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
      if (!ref.startsWith('#') && node.parent?.parent) {
        try {
          // TODO full multi files support
          // TODO get media type from initial parsing
          const contentLanguage = await findNamespace(
            textDocument.getText(),
            this.settings?.defaultContentLanguage,
          );
          // TODO atm only support and default to OAS 3.1
          const specVersion =
            contentLanguage.namespace === 'openapi' ? '3.1.0' : getSpecVersion(api);

          const format = contentLanguage.format ? contentLanguage.format.toLowerCase() : 'json';
          const mediaTypePrefix =
            contentLanguage.namespace === 'openapi'
              ? 'application/vnd.oai.openapi+'
              : 'application/vnd.aai.asyncapi+';
          const mediaType = `${mediaTypePrefix}${format};version=${specVersion}`;
          debug(
            'definitionService - go to external ref',
            `mediaType: ${mediaType}`,
            `textDocument.uri: ${textDocument.uri}`,
            `node value: ${JSON.stringify(node.toValue())}`,
            `parent value: ${JSON.stringify(node.parent.parent.toValue())}`,
          );
          const dereferenced = await dereferenceApiDOM(node.parent.parent, {
            parse: { mediaType, parserOpts: { sourceMap: true } },
            resolve: {
              baseURI: textDocument.uri,
              resolverOpts: {
                fileAllowList: ['*'],
              },
            },
          });
          debug(
            'definitionService - go to external ref',
            `dereferenced value: ${dereferenced.toValue()}`,
          );
          const newUri = dereferenced.meta.get('ref-origin').toValue();
          debug('definitionService - go to external ref', `dereferenced file URI: ${newUri}`);
          const nodeSourceMap = getSourceMap(dereferenced);
          const range = Range.create(
            {
              line: nodeSourceMap.line,
              character: nodeSourceMap.column,
            },
            {
              line: nodeSourceMap.endLine || nodeSourceMap.line,
              character: nodeSourceMap.endColumn || nodeSourceMap.column + 1,
            },
          );
          return {
            uri: newUri,
            range,
          };
        } catch (e) {
          return null;
        }
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
