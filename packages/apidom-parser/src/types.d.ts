import { MediaTypes, Namespace, ParseResultElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
export interface ApiDOMParserOptions {
  readonly mediaType?: string;
  readonly sourceMap?: boolean;
  [key: string]: unknown;
}

/**
 * @public
 */
export type Detect = (source: string) => boolean | Promise<boolean>;

/**
 * @public
 */
export type Parse = (source: string, options?: ApiDOMParserOptions) => Promise<ParseResultElement>;

/**
 * @public
 */
export interface ApiDOMParserAdapter {
  detectionRegExp?: RegExp;
  detect?: Detect;
  mediaTypes?: MediaTypes<string>;
  parse: Parse;
  namespace: Namespace;
}
