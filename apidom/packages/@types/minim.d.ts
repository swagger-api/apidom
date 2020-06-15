/* eslint-disable spaced-comment, max-classes-per-file */
/// <reference types="node" />

declare module 'minim' {
  export type Meta = Record<string, any>;
  export type Attributes = Record<string, any>;
  export type Predicate = (element: Element) => boolean;

  export class Element {
    public element: string;

    public classes: ArrayElement;

    public attributes: Attributes;

    public children: ArrayElement;

    constructor(content: Array<unknown>, meta?: Meta, attributes?: Attributes);

    toValue(): any;
  }

  interface Type<T> extends Element {
    new (...args: any[]): T;
  }

  type ExtendingElement<T extends Element = Element> = Record<string, T>;

  export class Namespace {
    get elements(): Record<string, Element>;

    toRefract(element: Element): JSON;

    fromRefract(doc: JSON): Element;

    register(name: string, elementClass: typeof Element): Namespace;

    use(plugin: NamespacePlugin): Namespace;
  }

  export interface NamespacePluginOptions {
    base: Namespace;
  }

  export interface NamespacePlugin {
    namespace(options: NamespacePluginOptions): Namespace;
  }

  export class StringElement extends Element {}

  export class ArrayElement extends Element {
    first: Element | undefined;

    second: Element | undefined;

    filter(predicate: Predicate): ArrayElement;

    contains(value: any): boolean;

    push(value: any): ArrayElement;
  }

  export class ObjectElement extends ArrayElement {
    constructor(content: Array<unknown>, meta?: Meta, attributes?: Attributes);

    get(key: string): any;

    set(key: string | StringElement, value: any): void;
  }
}
