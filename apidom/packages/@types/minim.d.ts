/* eslint-disable spaced-comment, max-classes-per-file */
/// <reference types="node" />

declare module 'minim' {
  export type Meta = Record<string, any>;
  export type Attributes = Record<string, any>;
  export type Predicate = (element: Element) => boolean;

  export class Element {
    public element: string;

    public meta: ObjectElement;

    public classes: ArrayElement;

    public attributes: Attributes;

    public children: ArraySlice;

    constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes);

    equals(value: any): boolean;

    toValue(): any;

    getMetaProperty(name: string, value?: any): any;

    setMetaProperty(name: string, value: any): void;

    freeze(): void;
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

  export class NumberElement extends Element {}

  export class NullElement extends Element {}

  export class BooleanElement extends Element {
    constructor(content?: boolean, meta?: Meta, attributes?: Attributes);
  }

  export class ArrayElement extends Element {
    first: Element | undefined;

    second: Element | undefined;

    get(index: number): any;

    filter(predicate: Predicate): ArraySlice;

    contains(value: any): boolean;

    push(value: any): ArrayElement;

    get [Symbol.iterator](): IterableIterator<any>;

    get length(): number;
  }

  export class ObjectElement extends ArrayElement {
    constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes);

    get(key: string | number): any;

    set(key: string | StringElement, value: any): void;

    hasKey(value: string): boolean;
  }

  export class MemberElement extends Element {
    constructor(key?: unknown, value?: unknown, meta?: Meta, attributes?: Attributes);

    get key(): unknown;

    set key(key: unknown);

    get value(): unknown;

    set value(value: unknown);
  }

  export class LinkElement extends Element {
    constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes);

    get relation(): unknown;

    set relation(relation: unknown);

    get href(): unknown;

    set href(key: unknown);
  }

  export class RefElement extends Element {
    constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes);

    get path(): unknown;

    set path(path: unknown);
  }

  export class ArraySlice {
    constructor(elements?: Array<unknown>);

    get length(): number;

    get first(): Element;

    get isEmpty(): boolean;

    filter(predicate: Predicate, thisArg?: unknown): ArraySlice;

    reject(predicate: Predicate, thisArg?: unknown): ArraySlice;

    hasKey(value: string): boolean;

    get<T extends Element>(index: number): T;

    [Symbol.iterator](): IterableIterator<any>;
  }

  export class ObjectSlice extends ArraySlice {}

  export class KeyValuePair {}
}
