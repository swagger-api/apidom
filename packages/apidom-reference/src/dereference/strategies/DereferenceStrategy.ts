import { Element } from 'minim';

import File from '../../File.ts';
import type { ReferenceOptions } from '../../options/index.ts';

/**
 * @public
 */
export interface DereferenceStrategyOptions {
  readonly name: string;
}

/**
 * @public
 */
abstract class DereferenceStrategy {
  public readonly name: string;

  constructor({ name }: DereferenceStrategyOptions) {
    this.name = name;
  }

  abstract canDereference(file: File, options: ReferenceOptions): boolean;
  abstract dereference(file: File, options: ReferenceOptions): Promise<Element>;
}

export default DereferenceStrategy;
