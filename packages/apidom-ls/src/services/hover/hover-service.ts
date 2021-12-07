import { TextDocument } from 'vscode-languageserver-textdocument';
import { Hover } from 'vscode-languageserver-protocol';
import { findAtOffset, ObjectElement, MemberElement, Element } from '@swagger-api/apidom-core';
import { MarkupContent, Position, Range } from 'vscode-languageserver-types';

import { DocumentationMeta, LanguageSettings, MetadataMap } from '../../apidom-language-types';
import {
  getSourceMap,
  isMember,
  isObject,
  isArray,
  getSpecVersion,
  correctPartialKeys,
} from '../../utils/utils';
import { isAsyncDoc, isJsonDoc } from '../../parser-factory';

export interface HoverService {
  computeHover(textDocument: TextDocument, position: Position): Promise<Hover | undefined>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultHoverService implements HoverService {
  private settings: LanguageSettings | undefined;

  private static _initialize: void = ((): void => {})();

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  public async computeHover(
    textDocument: TextDocument,
    position: Position,
  ): Promise<Hover | undefined> {
    const text: string = textDocument.getText();
    const offset = textDocument.offsetAt(position);

    const hover: Hover = {
      contents: { kind: 'markdown', value: '' },
    };

    const isJson = isJsonDoc(textDocument);
    let processedText;

    let result = await this.settings!.documentCache?.get(
      textDocument,
      undefined,
      'computeHover-parse-first',
    );
    if (!result) return undefined;

    if (result.annotations && !isJson) {
      processedText = correctPartialKeys(result, textDocument, isJson);
    }
    if (processedText) {
      result = await this.settings!.documentCache?.get(
        textDocument,
        processedText,
        'computeHover-parse-second',
      );
    }
    if (!result) return undefined;
    const { api } = result;
    // no API document has been parsed
    if (api === undefined) return undefined;
    const docNs: string = isAsyncDoc(text) ? 'asyncapi' : 'openapi';
    const specVersion = getSpecVersion(api);

    api.freeze(); // !! freeze and add parent !!

    const node = findAtOffset({ offset, includeRightBound: true }, api);

    if (node && node.parent && isMember(node.parent)) {
      const contents: string[] = [];
      let el: Element;
      if (!isObject(node) && isArray(node)) {
        el = node;
      } else {
        el = (<MemberElement>node.parent).value as ObjectElement;
      }
      let elementValue = el.element;

      const referencedElement = el.getMetaProperty('referenced-element', '').toValue();
      if (referencedElement.length > 0) {
        elementValue = referencedElement;
      }

      let hoverLine = '';
      if (el.parent && isMember(el.parent)) {
        hoverLine = `***${(node.parent.key as Element).toValue()}***: `;
      }
      hoverLine = `${hoverLine}**${elementValue}**\n`;

      contents.push(hoverLine);

      const sm = getSourceMap(node);

      if (node.parent.value !== node) {
        // check if we have some docs
        let docs: string | undefined = '';
        if (referencedElement.length > 0) {
          docs = this.getMetadataPropertyDocs(el, docNs, referencedElement, specVersion);
        }
        if (!docs) {
          docs = this.getMetadataPropertyDocs(el, docNs, el.element, specVersion);
        }
        if (!docs) {
          const classes = el.classes.toValue();
          for (const c of classes) {
            docs = this.getMetadataPropertyDocs(el, docNs, c, specVersion);
            if (docs) {
              break;
            }
          }
        }
        if (docs) {
          contents.push(docs);
        }
      }
      (<MarkupContent>hover.contents).value = contents.join('\n');
      hover.range = Range.create(
        textDocument.positionAt(sm.offset),
        textDocument.positionAt(sm.offset + sm.length),
      );
    }

    return hover;
  }

  private getMetadataPropertyDocs(
    node: Element,
    ns: string,
    key: string,
    specVersion: string,
  ): string | undefined {
    const map: MetadataMap = this.settings?.metadata?.metadataMaps[ns] || {};
    if (node.parent && isMember(node.parent)) {
      const containerNode = node.parent.parent;
      const nodeKey = (node.parent.key as Element).toValue();
      const containerNodeSet: string[] = Array.from(new Set(containerNode.classes.toValue()));
      containerNodeSet.unshift(containerNode.element);
      const referencedElement = containerNode.getMetaProperty('referenced-element', '').toValue();
      if (referencedElement.length > 0) {
        containerNodeSet.unshift(referencedElement);
      }

      for (const containerNodeSymbol of containerNodeSet) {
        const containerNodeDocs: DocumentationMeta[] = map[containerNodeSymbol]
          ?.documentation as DocumentationMeta[];
        if (containerNodeDocs) {
          const targetDoc = containerNodeDocs.find((ci) => {
            return (
              ci.target === nodeKey &&
              (!ci.targetSpecs ||
                (ci.targetSpecs &&
                  ci.targetSpecs.some(
                    (nsv) => nsv.namespace === ns && nsv.version === specVersion,
                  )))
            );
          });

          if (targetDoc) return targetDoc.docs;
        }
      }
    }
    if (map[key]?.documentation) {
      const keyDocsMeta: DocumentationMeta[] = map[key]?.documentation as DocumentationMeta[];
      if (keyDocsMeta) {
        const rootDoc = keyDocsMeta.find((e) => !e.target);
        if (rootDoc) return rootDoc.docs;
      }
    }

    return undefined;
  }
}
