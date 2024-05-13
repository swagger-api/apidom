import { Element } from 'minim';

import File from '../../File';
import type { ReferenceOptions } from '../../options';

export interface DereferenceStrategyOptions {
  readonly name: string;
}

abstract class DereferenceStrategy {
  public readonly name: string;

  constructor({ name }: DereferenceStrategyOptions) {
    this.name = name;
  }

  abstract canDereference(file: File, options: ReferenceOptions): boolean;
  abstract dereference(file: File, options: ReferenceOptions): Promise<Element>;
}

export default DereferenceStrategy;
