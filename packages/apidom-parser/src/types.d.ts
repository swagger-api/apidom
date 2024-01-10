import { MediaTypes, Namespace, ParseResultElement } from '@swagger-api/apidom-core';

export interface ApiDOMParserOptions {
  readonly mediaType?: string;
  readonly sourceMap?: boolean;
  [key: string]: unknown;
}

export type Detect = (source: string) => boolean | Promise<boolean>;
export type Parse = (source: string, options?: ApiDOMParserOptions) => Promise<ParseResultElement>;

export interface ApiDOMParserAdapter {
  detectionRegExp?: RegExp;
  detect?: Detect;
  mediaTypes?: MediaTypes<string>;
  parse: Parse;
  namespace: Namespace;
}
