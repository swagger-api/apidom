import { ParseResultElement } from '@swagger-api/apidom-core';

import File from '../../File';
import type { ReferenceOptions } from '../../options';

export interface BundleStrategyOptions {
  readonly name: string;
}

abstract class BundleStrategy {
  public readonly name: string;

  constructor({ name }: BundleStrategyOptions) {
    this.name = name;
  }

  abstract canBundle(file: File, options: ReferenceOptions): boolean;
  abstract bundle(file: File, options: ReferenceOptions): Promise<ParseResultElement>;
}

export default BundleStrategy;
