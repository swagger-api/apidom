/* eslint-disable spaced-comment, max-classes-per-file */
/// <reference types="node" />

declare module 'minim' {
  export type Meta = Record<string, any>;
  export type Attributes = Record<string, any>;
  export type Predicate = (element: Element) => boolean;
  interface Type<T> extends Function {
    new (...args: any[]): T;
  }

  export class Namespace {
    toRefract(element: Element): JSON;

    fromRefract(doc: JSON): Element;

    register(name: string, elementClass: Type<Element>): Namespace;

    use(plugin: NamespacePlugin): Namespace;
  }

  export interface NamespacePluginOptions {
    base: Namespace;
  }

  export interface NamespacePlugin {
    namespace(options: NamespacePluginOptions): Namespace;
  }

  export class Element {
    public element: string;

    public classes: ArrayElement;

    public attributes: Attributes;

    public children: ArrayElement;

    constructor(content: string, meta?: Meta, attributes?: Attributes);

    toValue(): any;
  }

  export class StringElement extends Element {}

  export class ArrayElement extends Element {
    constructor(content: Array<any>, meta?: Meta, attributes?: Attributes);

    first: Element | undefined;

    second: Element | undefined;

    filter(predicate: Predicate): ArrayElement;

    contains(value: any): boolean;

    push(value: any): ArrayElement;
  }

  export class ObjectElement extends ArrayElement {
    constructor(content: Record<string, unknown>, meta?: Meta, attributes?: Attributes);

    get(key: string): any;

    set(key: string | StringElement, value: any): void;
  }
}
