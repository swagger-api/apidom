import { pathSatisfies, propOr, test } from 'ramda';
import { isUndefined, isArray, replaceAll } from 'ramda-adjunct';

type WindowsPredicate = () => boolean;

const isWindows: WindowsPredicate = () => pathSatisfies(test(/^win/), ['platform'], process);

/**
 * Returns the protocol of the given URL, or `undefined` if it has no protocol.
 */
export const getProtocol = (url: string): string | undefined => {
  const protocolPattern = /^(\w{2,}):\/\//i;
  const match = protocolPattern.exec(url);
  if (isArray(match)) {
    return match[1].toLowerCase();
  }
  return undefined;
};

/**
 * Returns the lower-cased file extension of the given URL,
 * or an empty string if it has no extension.
 */
export const getExtension = (url: string): string => {
  const lastDotPosition = url.lastIndexOf('.');
  if (lastDotPosition >= 0) {
    return url.substr(lastDotPosition).toLowerCase();
  }
  return '';
};

/**
 * Determines whether the given path is a filesystem path.
 * This includes "file://" URLs.
 */
export const isFileSystemPath = (url: string): boolean => {
  const protocol = getProtocol(url);
  return isUndefined(protocol) || protocol === 'file';
};

/**
 * Determines whether the given path is an HTTP(S) URL.
 */
export const isHttpUrl = (url: string): boolean => {
  const protocol = getProtocol(url);
  return protocol === 'http' || protocol === 'https';
};

/**
 * Converts a URL to a local filesystem path.
 *
 * @param {boolean} [keepFileProtocol] - If true, then "file://" will NOT be stripped
 * @returns {string}
 */

interface ToFileSystemPathOptions {
  keepFileProtocol?: boolean;
  isWindows?: WindowsPredicate;
}

export const toFileSystemPath = (options: ToFileSystemPathOptions, uri: string): string => {
  // RegExp patterns to URL-decode special characters for local filesystem paths
  const urlDecodePatterns = [/%23/g, '#', /%24/g, '$', /%26/g, '&', /%2C/g, ',', /%40/g, '@'];

  const keepFileProtocol = propOr(false, 'keepFileProtocol', options);
  const isWindowsPredicate: WindowsPredicate = propOr(isWindows, 'isWindows', options);

  // Step 1: `decodeURI` will decode characters such as Cyrillic characters, spaces, etc.
  let path = decodeURI(uri);

  // Step 2: Manually decode characters that are not decoded by `decodeURI`.
  // This includes characters such as "#" and "?", which have special meaning in URLs,
  // but are just normal characters in a filesystem path.
  for (let i = 0; i < urlDecodePatterns.length; i += 2) {
    // @ts-ignore
    path = path.replace(urlDecodePatterns[i], urlDecodePatterns[i + 1]);
  }

  // Step 3: If it's a "file://" URL, then format it consistently
  // or convert it to a local filesystem path
  let isFileUrl = path.substr(0, 7).toLowerCase() === 'file://';
  if (isFileUrl) {
    // Strip-off the protocol, and the initial "/", if there is one
    path = path[7] === '/' ? path.substr(8) : path.substr(7);

    // insert a colon (":") after the drive letter on Windows
    if (isWindowsPredicate() && path[1] === '/') {
      path = `${path[0]}:${path.substr(1)}`;
    }

    if (keepFileProtocol) {
      // Return the consistently-formatted "file://" URL
      path = `file:///${path}`;
    } else {
      // Convert the "file://" URL to a local filesystem path.
      // On Windows, it will start with something like "C:/".
      // On Posix, it will start with "/"
      isFileUrl = false;
      path = isWindowsPredicate() ? path : `/${path}`;
    }
  }

  // Step 4: Normalize Windows paths (unless it's a "file://" URL)
  if (isWindowsPredicate() && !isFileUrl) {
    // Replace forward slashes with backslashes
    path = replaceAll('/', '\\', path);

    // Capitalize the drive letter
    if (path.substr(1, 2) === ':\\') {
      path = path[0].toUpperCase() + path.substr(1);
    }
  }

  return path;
};

/**
 * Returns the hash (URL fragment), of the given path.
 * If there is no hash, then the root hash ("#") is returned.
 */
export const getHash = (uri: string): string => {
  const hashIndex = uri.indexOf('#');
  if (hashIndex !== -1) {
    return uri.substr(hashIndex);
  }
  return '#';
};
