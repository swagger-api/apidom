import {
  ArrayElement,
  ObjectElement,
  isObjectElement,
  isArrayElement,
} from '@swagger-api/apidom-core';

import OpenApi3_2Element from '../../../elements/OpenApi3-2.ts';

type JSONPointer = string;

class NormalizeStorage {
  private internalStore!: ArrayElement;

  constructor(
    protected storageElement: OpenApi3_2Element | undefined,
    protected storageField: string,
    protected storageSubField: string,
  ) {}

  protected get store() {
    if (!this.internalStore) {
      let rootStore = this.storageElement!.get(this.storageField);

      if (!isObjectElement(rootStore)) {
        rootStore = new ObjectElement();
        this.storageElement!.set(this.storageField, rootStore);
      }

      let store = rootStore.get(this.storageSubField);
      if (!isArrayElement(store)) {
        store = new ArrayElement();
        rootStore.set(this.storageSubField, store);
      }

      this.internalStore = store;
    }

    return this.internalStore;
  }

  public append(pointer: JSONPointer) {
    if (!this.includes(pointer)) {
      this.store.push(pointer);
    }
  }

  public includes(pointer: JSONPointer) {
    return this.store.includes(pointer);
  }
}

export default NormalizeStorage;
