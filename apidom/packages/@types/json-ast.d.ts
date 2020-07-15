/* eslint-disable spaced-comment, max-classes-per-file */
/// <reference types="node" />

declare module 'json-ast' {
  export interface ParseOptions {
    verbose?: boolean;
    junker?: boolean;
  }

  interface NodeTypes {
    OBJECT: 'object';
  }

  export class JsonNode {}

  export class JsonDocument extends JsonNode {}

  export const nodeTypes: NodeTypes;

  export const parse: (source: string, options: ParseOptions) => JsonDocument;
}
