import { TextDocument } from 'vscode-languageserver-textdocument';
import { Hover } from 'vscode-languageserver-protocol';
import { findAtOffset, ObjectElement, MemberElement, Element } from '@swagger-api/apidom-core';
import { MarkupContent, Position, Range } from 'vscode-languageserver-types';
import { dereferenceApiDOM } from '@swagger-api/apidom-reference';
import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';

import {
  HoverProvider,
  DocumentationMeta,
  LanguageSettings,
  MetadataMap,
  ProviderMode,
  MergeStrategy,
} from '../../apidom-language-types';
import {
  getSourceMap,
  isMember,
  isObject,
  isArray,
  getSpecVersion,
  correctPartialKeys,
  isJsonDoc,
  findNamespace,
  debug,
} from '../../utils/utils';

const CONTROL_CODES = '\\u0000-\\u0020\\u007f-\\u009f';
const WEB_LINK_REGEX = new RegExp(
  `(?:[a-zA-Z][a-zA-Z0-9+.-]{2,}:\\/\\/|data:|www\\.)[^\\s${CONTROL_CODES}"]{2,}[^\\s${CONTROL_CODES}"')}\\],:;.!?]`,
  'ug',
);

export interface HoverService {
  computeHover(textDocument: TextDocument, position: Position): Promise<Hover | undefined>;

  configure(settings?: LanguageSettings): void;

  registerProvider(provider: HoverProvider): void;
}

export class DefaultHoverService implements HoverService {
  private settings: LanguageSettings | undefined;

  private static _initialize: void = ((): void => {})();

  private hoverProviders: HoverProvider[] = [];

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
    if (settings) {
      if (settings.hoverProviders) {
        this.hoverProviders = settings.hoverProviders;
      }
      for (const provider of this.hoverProviders) {
        if (provider.configure) {
          provider.configure(settings);
        }
      }
    }
  }

  public registerProvider(provider: HoverProvider): void {
    this.hoverProviders.push(provider);
    if (this.settings) {
      if (provider.configure) {
        provider.configure(this.settings);
      }
    }
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

    const isJson = await isJsonDoc(textDocument);
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
    const docNs: string = (await findNamespace(text, this.settings?.defaultContentLanguage))
      .namespace;
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
      } else {
        // render target content for reference values if possible
        if (!isObject(node) && isArray(node)) {
          el = node;
        } else {
          el = (<MemberElement>node.parent).key as ObjectElement;
        }
        if (el?.toValue() === '$ref') {
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
              const nonStrictSpecVersion =
                contentLanguage.namespace === 'openapi' ? '3.1.0' : getSpecVersion(api);

              const format = contentLanguage.format ? contentLanguage.format.toLowerCase() : 'json';
              const mediaTypePrefix =
                contentLanguage.namespace === 'openapi'
                  ? 'application/vnd.oai.openapi+'
                  : 'application/vnd.aai.asyncapi+';
              const mediaType = `${mediaTypePrefix}${format};version=${nonStrictSpecVersion}`;
              debug(
                'hoverService - computeHover',
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
              if (dereferenced) {
                debug(
                  'hoverService - computeHover',
                  `dereferenced value: ${dereferenced.toValue()}`,
                );
                const targetVal = JSON.stringify(dereferenced.toValue(), null, 2);
                contents.push(`\n\n\n\n\`\`\`json\n${targetVal}\n\`\`\``);
              }
            } catch (e) {
              //
            }
          } else {
            try {
              // TODO (francesco.tumanischvili@smartbear.com): replace with fragment deref
              const refTarget = jsonPointerEvaluate(ref.substring(1, ref.length), api);
              const nodeSourceMap = getSourceMap(refTarget);

              const linePosition = textDocument.positionAt(nodeSourceMap.offset);
              linePosition.character = 0;
              const targetVal = DefaultHoverService.fixYamlHoverSnippetIndent(
                textDocument
                  .getText()
                  .substring(textDocument.offsetAt(linePosition), nodeSourceMap.endOffset),
              );
              const format =
                targetVal.trim().startsWith('{') || targetVal.trim().startsWith('?')
                  ? 'json'
                  : 'yaml';
              contents.push(`\n\n\n\n\`\`\`${format}\n${targetVal}\n\`\`\``);
            } catch (e) {
              //
            }
          }
          try {
            for (const provider of this.hoverProviders) {
              if (
                provider
                  .namespaces()
                  .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
                provider.doRefHover &&
                provider.providerMode &&
                provider.providerMode() === ProviderMode.REF
              ) {
                // eslint-disable-next-line no-await-in-loop
                const hoverProviderResult = await provider.doRefHover(
                  textDocument,
                  position,
                  node,
                  api,
                  ref,
                  contents,
                );
                switch (hoverProviderResult.mergeStrategy) {
                  case MergeStrategy.APPEND:
                    contents.push(...hoverProviderResult.hoverContent);
                    break;
                  case MergeStrategy.PREPEND:
                    contents.unshift(...hoverProviderResult.hoverContent);
                    break;
                  case MergeStrategy.REPLACE:
                    contents.splice(0, contents.length, ...hoverProviderResult.hoverContent);
                    break;
                  case MergeStrategy.IGNORE:
                    break;
                  default:
                    contents.push(...hoverProviderResult.hoverContent);
                }
                if (provider.break()) {
                  break;
                }
              }
            }
          } catch (e) {
            console.log('error in hover provider');
          }
        } else if (this.settings?.hoverFollowLinkEntry) {
          // check if we have a "URL like" value, and add a link in case
          const nodeValue = node.toValue();
          // if (/^https?:\/\/[^\s]+.*/.test(nodeValue)) {
          if (WEB_LINK_REGEX.test(nodeValue)) {
            contents.push(`[follow link](${nodeValue})`);
            // TODO no ctrl-click on link
          }
        }
      }
      try {
        for (const provider of this.hoverProviders) {
          if (
            provider
              .namespaces()
              .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
            provider.doHover &&
            (!provider.providerMode || provider.providerMode() === ProviderMode.FULL)
          ) {
            // eslint-disable-next-line no-await-in-loop
            const hoverProviderResult = await provider.doHover(
              textDocument,
              position,
              node,
              api,
              contents,
            );
            switch (hoverProviderResult.mergeStrategy) {
              case MergeStrategy.APPEND:
                contents.push(...hoverProviderResult.hoverContent);
                break;
              case MergeStrategy.PREPEND:
                contents.unshift(...hoverProviderResult.hoverContent);
                break;
              case MergeStrategy.REPLACE:
                contents.splice(0, contents.length, ...hoverProviderResult.hoverContent);
                break;
              case MergeStrategy.IGNORE:
                break;
              default:
                contents.push(...hoverProviderResult.hoverContent);
            }
            if (provider.break()) {
              break;
            }
          }
        }
      } catch (e) {
        console.log('error in hover provider');
      }
      (<MarkupContent>hover.contents).value = contents.join('\n');
      hover.range = Range.create(
        textDocument.positionAt(sm.offset),
        textDocument.positionAt(sm.offset + sm.length),
      );
    }

    return hover;
  }

  private static fixYamlHoverSnippetIndent(snippet: string): string {
    if (!snippet || snippet.trim().length === 0) {
      return snippet;
    }
    const indent = snippet.search('[^\\s\\n]');
    const lines = snippet.split('\n');
    let res = '';
    for (const line of lines) {
      res += `${line.substring(indent)}\n`;
    }
    return res;
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
