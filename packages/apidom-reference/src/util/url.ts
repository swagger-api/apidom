import process from 'process';
import { pathSatisfies, propOr, pipe, test, last } from 'ramda';
import { isUndefined, replaceAll, isNotUndefined, trimCharsEnd } from 'ramda-adjunct';

/**
 * SPDX-FileCopyrightText: Copyright (c) 2015 James Messinger
 *
 * SPDX-License-Identifier: MIT
 */

/**
 * @public
 */
export type WindowsPredicate = () => boolean;

const isWindows: WindowsPredicate = () => pathSatisfies(test(/^win/), ['platform'], process);

/**
 * Returns the protocol of the given URL, or `undefined` if it has no protocol.
 * @public
 */
export const getProtocol = (url: string): string | undefined => {
  try {
    const parsedUrl = new URL(url);
    return trimCharsEnd(':', parsedUrl.protocol);
  } catch {
    return undefined;
  }
};

/**
 * Returns true if given URL has protocol.
 * @public
 */
export const hasProtocol = pipe(getProtocol, isNotUndefined);

/**
 * Returns the lower-cased file extension of the given URL,
 * or an empty string if it has no extension.
 * @public
 */
export const getExtension = (url: string): string => {
  const lastDotPosition = url.lastIndexOf('.');
  if (lastDotPosition >= 0) {
    return url.substring(lastDotPosition).toLowerCase();
  }
  return '';
};

/**
 * Determines whether the given path is a filesystem path.
 * This includes "file://" URLs.
 * @public
 */
export const isFileSystemPath = (uri: string): boolean => {
  // @ts-ignore
  if (process.browser) {
    /**
     * We're running in a browser, so assume that all paths are URLs.
     * This way, even relative paths will be treated as URLs rather than as filesystem paths.
     */
    return false;
  }

  const protocol = getProtocol(uri);
  return isUndefined(protocol) || protocol === 'file' || /^[a-zA-Z]$/.test(protocol);
};

/**
 * Determines whether the given URI is an HTTP(S) URL.
 * @public
 */
export const isHttpUrl = (url: string): boolean => {
  const protocol = getProtocol(url);
  return protocol === 'http' || protocol === 'https';
};

/**
 * Determines whether the given URI
 * @public
 */
export const isURI = (uri: string): boolean => {
  try {
    return new URL(uri) && true;
  } catch {
    return false;
  }
};

/**
 * @public
 */
export interface ToFileSystemPathOptions {
  keepFileProtocol?: boolean;
  isWindows?: WindowsPredicate;
}

/**
 * Converts a URL to a local filesystem path.
 * @public
 */
export const toFileSystemPath = (uri: string, options?: ToFileSystemPathOptions): string => {
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
  let isFileUrl = path.substring(0, 7).toLowerCase() === 'file://';
  if (isFileUrl) {
    // Strip-off the protocol, and the initial "/", if there is one
    path = path[7] === '/' ? path.substring(8) : path.substring(7);

    // insert a colon (":") after the drive letter on Windows
    if (isWindowsPredicate() && path[1] === '/') {
      path = `${path[0]}:${path.substring(1)}`;
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
    if (path.substring(1, 3) === ':\\') {
      path = path[0].toUpperCase() + path.substring(1);
    }
  }

  return path;
};

/**
 * Converts a filesystem path to a properly-encoded URL.
 *
 * This is intended to handle situations where resolver is called
 * with a filesystem path that contains characters which are not allowed in URLs.
 *
 * @example
 * The following filesystem paths would be converted to the following URLs:
 *```
 *    <"!@#$%^&*+=?'>.json              ==>   %3C%22!@%23$%25%5E&*+=%3F\'%3E.json
 *    C:\\My Documents\\File (1).json   ==>   C:/My%20Documents/File%20(1).json
 *    file://Project #42/file.json      ==>   file://Project%20%2342/file.json
 * ```
 * @public
 */
export const fromFileSystemPath = (uri: string): string => {
  const urlEncodePatterns = [/\?/g, '%3F', /#/g, '%23'];
  let path = uri;

  // Step 1: On Windows, replace backslashes with forward slashes,
  // rather than encoding them as "%5C"
  if (isWindows()) {
    path = path.replace(/\\/g, '/');
  }

  // Step 2: `encodeURI` will take care of MOST characters
  path = encodeURI(path);

  // Step 3: Manually encode characters that are not encoded by `encodeURI`.
  // This includes characters such as "#" and "?", which have special meaning in URLs,
  // but are just normal characters in a filesystem path.
  for (let i = 0; i < urlEncodePatterns.length; i += 2) {
    // @ts-ignore
    path = path.replace(urlEncodePatterns[i], urlEncodePatterns[i + 1]);
  }

  return path;
};

/**
 * Returns the hash (URL fragment), of the given path.
 * If there is no hash, then the root hash ("#") is returned.
 * @public
 */
export const getHash = (uri: string): string => {
  const hashIndex = uri.indexOf('#');
  if (hashIndex !== -1) {
    return uri.substring(hashIndex);
  }
  return '#';
};

/**
 * Removes the hash (URL fragment), if any, from the given path.
 * @public
 */
export const stripHash = (uri: string): string => {
  const hashIndex = uri.indexOf('#');
  let hashStrippedUri = uri;
  if (hashIndex >= 0) {
    hashStrippedUri = uri.substring(0, hashIndex);
  }
  return hashStrippedUri;
};

/**
 * Returns the current working directory (in Node) or the current page URL (in browsers).
 * @public
 */
export const cwd = (): string => {
  // @ts-ignore
  if (process.browser) {
    return stripHash(globalThis.location.href);
  }

  const path = process.cwd();

  const lastChar = last(path)!;
  if (['/', '\\'].includes(lastChar)) {
    return path;
  }

  return path + (isWindows() ? '\\' : '/');
};

/**
 * Resolves a target URI relative to a base URI in a manner similar to that of a Web browser resolving an anchor tag HREF.
 * @public
 */
export const resolve = (from: string, to: string): string => {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'));

  if (resolvedUrl.protocol === 'resolve:') {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
};

/**
 * Sanitizes/Encodes URI to it's url encoded form.
 *
 * The functional will compensate with the usecase when
 * already sanitized URI is passed to it,
 * by first unsatizing it and then performing sanitization again.
 * @public
 */

export const sanitize = (uri: string) => {
  if (isFileSystemPath(uri)) {
    return fromFileSystemPath(toFileSystemPath(uri));
  }

  try {
    return new URL(uri).toString();
  } catch {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI#encoding_for_ipv6
    return encodeURI(decodeURI(uri)).replace(/%5B/g, '[').replace(/%5D/g, ']');
  }
};

/**
 * Unsanitizes/Decodes URI to it's url encoded form.
 * This function already assumes that hash part of the URI
 * has been removed prior to transforming it to it's sanitized form.
 * @public
 */

export const unsanitize = (uri: string): string => {
  if (isFileSystemPath(uri)) {
    return toFileSystemPath(uri);
  }

  return decodeURI(uri);
};
