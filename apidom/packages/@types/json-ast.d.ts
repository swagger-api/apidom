/* eslint-disable spaced-comment, max-classes-per-file */
/// <reference types="node" />

declare module 'json-ast' {
  export interface ParseOptions {
    verbose?: boolean;
    junker?: boolean;
  }

  export class JsonNode {}

  export class JsonDocument extends JsonNode {}

  export const parse: (source: string, options: ParseOptions) => JsonDocument;
}
