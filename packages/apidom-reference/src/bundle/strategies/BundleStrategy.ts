import { ParseResultElement } from '@swagger-api/apidom-core';

import File from '../../File.ts';
import type { ReferenceOptions } from '../../options/index.ts';

/**
 * @public
 */
export interface BundleStrategyOptions {
  readonly name: string;
}

/**
 * @public
 */
abstract class BundleStrategy {
  public readonly name: string;

  constructor({ name }: BundleStrategyOptions) {
    this.name = name;
  }

  abstract canBundle(file: File, options: ReferenceOptions): boolean;
  abstract bundle(file: File, options: ReferenceOptions): Promise<ParseResultElement>;
}

export default BundleStrategy;
