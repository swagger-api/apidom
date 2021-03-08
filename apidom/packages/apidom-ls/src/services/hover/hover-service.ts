import { TextDocument } from 'vscode-languageserver-textdocument';
import { Hover } from 'vscode-languageserver-protocol';

import { findAtOffset } from 'apidom';
import { Element, ObjectElement, MemberElement } from 'minim';
import { MarkupContent, Position, Range } from 'vscode-languageserver-types';
import { LanguageSettings } from '../../apidom-language-types';
import { getSourceMap, isMember, isObject, isArray, setMetadataMap } from '../../utils/utils';
import { getParser, isAsyncDoc } from '../../parser-factory';

export interface HoverService {
  computeHover(textDocument: TextDocument, position: Position): PromiseLike<Hover | undefined>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultHoverService implements HoverService {
  private settings: LanguageSettings | undefined;

  private static _initialize: void = ((): void => {})();

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  computeHover(textDocument: TextDocument, position: Position): PromiseLike<Hover | undefined> {
    const parser = getParser(textDocument);
    const text: string = textDocument.getText();
    const asyncapi: boolean = isAsyncDoc(textDocument);
    const offset = textDocument.offsetAt(position);

    const hover: Hover = {
      contents: { kind: 'markdown', value: '' },
    };

    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      // if we cannot parse nothing to do
      if (!api) {
        return undefined;
      }
      // use the type related metadata at root level
      setMetadataMap(
        api,
        isAsyncDoc(text) ? 'asyncapi' : 'openapi',
        this.settings?.metadata?.metadataMaps,
      ); // TODO move to parser/adapter, extending the one standard
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

        contents.push(`**${el.element}**\n`);
        const sm = getSourceMap(node);
        if (el.element === 'operation' || el.element === 'channel') {
          const httpMethod = el.getMetaProperty('httpMethod', 'GET').toValue();
          const memberParent: MemberElement = node.parent.parent.parent as MemberElement;
          const memberParentKey: Element = memberParent.key as Element;
          // memberParent.key;
          const path: string = memberParentKey.toValue();
          // TODO cheat now use specific ns traversion, change to use class/meta providing server url
          // const basePath = 'http://localhost:8082';
          let basePath = '';
          if (asyncapi) {
            // @ts-ignore
            basePath = api.servers.toValue().prod.url;
          } else {
            // @ts-ignore
            basePath = api.servers.toValue()[0].url;
          }
          const url = basePath + path;
          const hoverText = `curl -X ${httpMethod} ${url}\n`;

          contents.push(`${httpMethod} ${url}\n`);
          contents.push(hoverText);
        }
        // check if we have some docs
        let docs = DefaultHoverService.getMetadataPropertyDocs(api, el.element);
        if (!docs) {
          const classes = el.classes.toValue();
          for (const c of classes) {
            docs = DefaultHoverService.getMetadataPropertyDocs(api, c);
            if (docs) {
              break;
            }
          }
        }
        if (docs) {
          contents.push(docs);
        }
        (<MarkupContent>hover.contents).value = contents.join('\n');
        hover.range = Range.create(
          textDocument.positionAt(sm.offset),
          textDocument.positionAt(sm.offset + sm.length),
        );
      }

      return hover;
    });
  }

  private static getMetadataPropertyDocs(doc: Element, key: string): string {
    return doc.meta.get('metadataMap')?.get(key)?.get('documentation')?.toValue();
  }
}
