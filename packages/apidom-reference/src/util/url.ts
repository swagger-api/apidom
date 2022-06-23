import process from 'process';
import { pathSatisfies, propOr, pipe, test, last } from 'ramda';
import { isUndefined, replaceAll, isNotUndefined, trimCharsEnd } from 'ramda-adjunct';

/**
 * SPDX-FileCopyrightText: Copyright (c) 2015 James Messinger
 *
 * SPDX-License-Identifier: MIT
 */

type WindowsPredicate = () => boolean;

const isWindows: WindowsPredicate = () => pathSatisfies(test(/^win/), ['platform'], process);

/**
 * Returns the protocol of the given URL, or `undefined` if it has no protocol.
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
 */
export const hasProtocol = pipe(getProtocol, isNotUndefined);

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
 */
export const isHttpUrl = (url: string): boolean => {
  const protocol = getProtocol(url);
  return protocol === 'http' || protocol === 'https';
};

/**
 * Determines whether the given URI
 * @param uri
 */
export const isURI = (uri: string): boolean => {
  try {
    return new URL(uri) && true;
  } catch {
    return false;
  }
};

interface ToFileSystemPathOptions {
  keepFileProtocol?: boolean;
  isWindows?: WindowsPredicate;
}

/**
 * Converts a URL to a local filesystem path.
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
 * Converts a filesystem path to a properly-encoded URL.
 *
 * This is intended to handle situations where resolver is called
 * with a filesystem path that contains characters which are not allowed in URLs.
 *
 * @example
 * The following filesystem paths would be converted to the following URLs:
 *
 *    <"!@#$%^&*+=?'>.json              ==>   %3C%22!@%23$%25%5E&*+=%3F\'%3E.json
 *    C:\\My Documents\\File (1).json   ==>   C:/My%20Documents/File%20(1).json
 *    file://Project #42/file.json      ==>   file://Project%20%2342/file.json
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
 */
export const getHash = (uri: string): string => {
  const hashIndex = uri.indexOf('#');
  if (hashIndex !== -1) {
    return uri.substr(hashIndex);
  }
  return '#';
};

/**
 * Removes the hash (URL fragment), if any, from the given path.
 */
export const stripHash = (uri: string): string => {
  const hashIndex = uri.indexOf('#');
  let hashStrippedUri = uri;
  if (hashIndex >= 0) {
    hashStrippedUri = uri.substr(0, hashIndex);
  }
  return hashStrippedUri;
};

/**
 * Returns the current working directory (in Node) or the current page URL (in browsers).
 */
export const cwd = (): string => {
  // @ts-ignore
  if (process.browser) {
    return stripHash(globalThis.location.href);
  }

  const path = process.cwd();

  const lastChar = last(path);
  if (['/', '\\'].includes(lastChar)) {
    return path;
  }

  return path + (isWindows() ? '\\' : '/');
};

/**
 *  Resolves a target URI relative to a base URI in a manner similar to that of a Web browser resolving an anchor tag HREF.
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
