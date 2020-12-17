import { mergeDeepRight } from 'ramda';

import FileResolver from './resolvers/FileResolver';
import HttpResolverAxios from './resolvers/HttpResolverAxios';
import Resolver from './resolvers/Resolver';

interface ReferenceParserOptions {
  readonly mediaType: string;
}

interface ReferenceResolveOptions {
  baseURI: string;
  readonly resolvers: Array<Resolver>;
  readonly external: boolean;
}

interface ReferenceOptions {
  readonly parse: ReferenceParserOptions;
  readonly resolve: ReferenceResolveOptions;
}

const defaultOptions: ReferenceOptions = {
  parse: {
    /**
     * This is media type that
     */
    mediaType: 'text/plain',
  },
  resolve: {
    /**
     * baseURI serves as a base for all relative URL found in ApiDOM references.
     */
    baseURI: '',
    /**
     * Determines how References will be resolved.
     *
     * You can add additional resolvers of your own, replace an existing one with
     * your own implementation, or remove any resolver by removing it from the list.
     */
    resolvers: [
      FileResolver(),
      HttpResolverAxios({ timeout: 5000, redirects: 5, withCredentials: false }),
    ],
    /**
     * Determines whether external references will be resolved.
     * If this option is disabled, then none of above resolvers will be called.
     * Instead, external references will simply be ignored.
     *
     * @type {boolean}
     */
    external: true,
  },
};

/**
 * Algorithm for deep merging options.
 */
export const merge = mergeDeepRight;

/**
 * Algorithm for deep merging options with default ones.
 */
export const mergeWithDefaults = mergeDeepRight(defaultOptions);

export default defaultOptions;
