import FileResolver from './resolvers/FileResolver';
import HttpResolverAxios from './resolvers/HttpResolverAxios';

const defaultOptions = {
  resolve: {
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

export default defaultOptions;
