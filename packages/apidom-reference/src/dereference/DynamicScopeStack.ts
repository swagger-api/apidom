import { Element, find, isObjectElement, isStringElement, toValue } from '@swagger-api/apidom-core';

/**
 * @public
 */
export type DynamicScopeEntryType = 'root' | '$ref' | '$dynamicRef' | 'applicator';

/**
 * @public
 */
export interface DynamicScopeFrame {
  readonly element: Element;
  readonly documentURI: string;
  readonly dynamicAnchors: Map<string, Element>;
  readonly entryType: DynamicScopeEntryType;
}

const collectDynamicAnchors = (element: Element): Map<string, Element> => {
  const anchors = new Map<string, Element>();

  // @ts-ignore
  find((e: Element) => {
    const elementWithDynamicAnchor = e as Element & { $dynamicAnchor?: Element };
    const dynamicAnchor =
      elementWithDynamicAnchor.$dynamicAnchor ??
      (isObjectElement(e) ? e.get('$dynamicAnchor') : undefined);

    if (isStringElement(dynamicAnchor)) {
      const anchor = toValue(dynamicAnchor);
      if (typeof anchor === 'string' && !anchors.has(anchor)) {
        anchors.set(anchor, e);
      }
    }
    return false;
  }, element);

  return anchors;
};

/**
 * @public
 */
export class DynamicScopeStack extends Array<DynamicScopeFrame> {
  pushFrame(element: Element, documentURI: string, entryType: DynamicScopeEntryType): void {
    this.push({
      element,
      documentURI,
      entryType,
      dynamicAnchors: collectDynamicAnchors(element),
    });
  }

  popFrame(): DynamicScopeFrame | undefined {
    return this.pop();
  }

  resolveDynamicRef(
    anchorToken: string,
  ): { referencedElement: Element; documentURI: string } | null {
    for (let i = 0; i < this.length; i += 1) {
      const frame = this[i];
      const match = frame.dynamicAnchors.get(anchorToken);
      if (typeof match !== 'undefined') {
        return { referencedElement: match, documentURI: frame.documentURI };
      }
    }
    return null;
  }

  clone(): DynamicScopeStack {
    return new DynamicScopeStack(...this);
  }
}
