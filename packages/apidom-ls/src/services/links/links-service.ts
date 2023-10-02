import { Range, DocumentLink } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element, traverse, toValue } from '@swagger-api/apidom-core';

import {
  LanguageSettings,
  LinksContext,
  LinksProvider,
  MergeStrategy,
  ProviderMode,
} from '../../apidom-language-types';
import {
  debug,
  trace,
  findNamespace,
  getSourceMap,
  getSpecVersion,
  isMember,
  perfEnd,
  perfStart,
} from '../../utils/utils';

enum PerfLabels {
  START = 'doLinks',
}

const CONTROL_CODES = '\\u0000-\\u0020\\u007f-\\u009f';
const TRIVIAL_WEB_LINK_REGEX = new RegExp(
  `(?:[a-zA-Z][a-zA-Z0-9+.-]{2,}:\\/\\/|data:|www\\.)[^\\]\\s${CONTROL_CODES}"]{2,}[^\\]\\s${CONTROL_CODES}"')}\\],:;.!?]`,
  'ug',
);

export interface LinksService {
  doLinks(textDocument: TextDocument, linksContext?: LinksContext): Promise<DocumentLink[]>;
  configure(settings: LanguageSettings): void;
  registerProvider(provider: LinksProvider): void;
}

export class DefaultLinksService implements LinksService {
  private settings: LanguageSettings | undefined;

  private linksProviders: LinksProvider[] = [];

  public registerProvider(provider: LinksProvider): void {
    this.linksProviders.push(provider);
    if (this.settings && provider.configure) {
      provider.configure(this.settings);
    }
  }

  public configure(settings?: LanguageSettings): void {
    debug('DefaultLinksService.configure', settings);
    this.settings = settings;
    if (settings) {
      if (settings.linksProviders) {
        this.linksProviders = settings.linksProviders;
      }
      for (const provider of this.linksProviders) {
        if (provider.configure) {
          provider.configure(settings);
        }
      }
    }
  }

  private static isWebUrl(value: string): boolean {
    return TRIVIAL_WEB_LINK_REGEX.test(value);
  }

  private static getLinks(
    value: string,
    startOffset: number,
    textDocument: TextDocument,
  ): DocumentLink[] {
    let match;
    const links: DocumentLink[] = [];
    // eslint-disable-next-line no-cond-assign
    while ((match = TRIVIAL_WEB_LINK_REGEX.exec(value)) != null) {
      const location = { offset: startOffset + match.index, length: match[0].length };
      const range = Range.create(
        textDocument.positionAt(location.offset),
        textDocument.positionAt(location.offset + location.length),
      );
      const link: DocumentLink = {
        target: match[0],
        range,
      };
      links.push(link);
    }
    return links;
  }

  public async doLinks(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    linksContext?: LinksContext,
  ): Promise<DocumentLink[]> {
    perfStart(PerfLabels.START);
    const context = !linksContext ? this.settings?.linksContext : linksContext;
    debug('DefaultLinksService.doLinks', context);
    const text: string = textDocument.getText();
    const links: DocumentLink[] = [];
    const refLinks: DocumentLink[] = [];
    const result = await this.settings!.documentCache?.get(
      textDocument,
      undefined,
      'doLinks-parse',
    );
    if (!result) return links;

    const nameSpace = await findNamespace(text, this.settings?.defaultContentLanguage);
    const docNs: string = nameSpace.namespace;
    const { api } = result;

    if (api === undefined) return links;
    const specVersion = getSpecVersion(api);
    debug('DefaultLinksService.doLinks ns', docNs, specVersion);
    const findLinks = (element: Element) => {
      const sm = getSourceMap(element);
      const value = toValue(element);
      const trivialWebUrl = DefaultLinksService.isWebUrl(value);
      if (element.element !== 'string') {
        return;
      }
      if (
        element.parent &&
        isMember(element.parent) &&
        toValue(element.parent.key) === '$ref' &&
        element.parent.key !== element &&
        !value.startsWith('#')
      ) {
        const location = { offset: sm.offset, length: sm.length };
        const range = Range.create(
          textDocument.positionAt(location.offset),
          textDocument.positionAt(location.offset + location.length),
        );
        const link: DocumentLink = {
          target: value,
          range,
        };
        trace('DefaultLinksService.doLinks pushing ref', link);
        refLinks.push(link);
      } else if (context?.enableTrivialLinkDiscovery && trivialWebUrl) {
        const elementLinks = DefaultLinksService.getLinks(value, sm.offset, textDocument);
        links.push(...elementLinks);
      }
    };
    traverse(findLinks, api);
    if (context?.modifierFunction) {
      for (const link of refLinks) {
        if (link.target) {
          trace('DefaultLinksService.doLinks modifierFunction before', link.target);
          link.target = context.modifierFunction(link.target);
          trace('DefaultLinksService.doLinks modifierFunction after', link.target);
        }
      }
    }
    perfEnd(PerfLabels.START);
    try {
      for (const provider of this.linksProviders) {
        let customLinks = links;
        const supportedNs = provider
          .namespaces()
          .some((ns) => ns.namespace === docNs && ns.version === specVersion);
        const fullMode =
          provider.doLinks &&
          (!provider.providerMode || provider.providerMode() === ProviderMode.FULL);
        if (!fullMode) {
          customLinks = refLinks;
        }
        if (supportedNs) {
          let linksProviderResult = null;
          if (fullMode) {
            // @ts-ignore
            // eslint-disable-next-line no-await-in-loop
            linksProviderResult = await provider.doLinks(textDocument, api, customLinks, context);
          } else {
            // @ts-ignore
            // eslint-disable-next-line no-await-in-loop
            linksProviderResult = await provider.doRefLinks(
              textDocument,
              api,
              customLinks,
              context,
            );
          }
          if (linksProviderResult) {
            switch (linksProviderResult.mergeStrategy) {
              case MergeStrategy.APPEND:
                customLinks.push(...linksProviderResult.links);
                break;
              case MergeStrategy.PREPEND:
                customLinks.unshift(...linksProviderResult.links);
                break;
              case MergeStrategy.REPLACE:
                customLinks.splice(0, customLinks.length, ...linksProviderResult.links);
                break;
              case MergeStrategy.IGNORE:
                break;
              default:
                customLinks.push(...linksProviderResult.links);
            }
          }
          if (provider.break()) {
            break;
          }
        }
      }
    } catch (e) {
      console.log('error in validation provider');
    }
    links.push(...refLinks);
    if (context?.maxNumberOfLinks && links.length > context?.maxNumberOfLinks) {
      return links.slice(0, context?.maxNumberOfLinks);
    }
    return links;
  }
}
