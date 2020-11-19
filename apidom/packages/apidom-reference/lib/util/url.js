"use strict";

exports.__esModule = true;
exports.toFileSystemPath = exports.isHttpUrl = exports.isFileSystemPath = exports.getProtocol = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var isWindows = function isWindows() {
  return (0, _ramda.pathSatisfies)((0, _ramda.test)(/^win/), ['platform'], process);
};
/**
 * Returns the protocol of the given URL, or `undefined` if it has no protocol.
 */


var getProtocol = function getProtocol(url) {
  var protocolPattern = /^(\w{2,}):\/\//i;
  var match = protocolPattern.exec(url);

  if ((0, _ramdaAdjunct.isArray)(match)) {
    return match[1].toLowerCase();
  }

  return undefined;
};
/**
 * Determines whether the given path is a filesystem path.
 * This includes "file://" URLs.
 */


exports.getProtocol = getProtocol;

var isFileSystemPath = function isFileSystemPath(url) {
  var protocol = getProtocol(url);
  return (0, _ramdaAdjunct.isUndefined)(protocol) || protocol === 'file';
};
/**
 * Determines whether the given path is an HTTP(S) URL.
 */


exports.isFileSystemPath = isFileSystemPath;

var isHttpUrl = function isHttpUrl(url) {
  var protocol = getProtocol(url);
  return protocol === 'http' || protocol === 'https';
};
/**
 * Converts a URL to a local filesystem path.
 *
 * @param {boolean} [keepFileProtocol] - If true, then "file://" will NOT be stripped
 * @returns {string}
 */


exports.isHttpUrl = isHttpUrl;

var toFileSystemPath = function toFileSystemPath(options, uri) {
  // RegExp patterns to URL-decode special characters for local filesystem paths
  var urlDecodePatterns = [/%23/g, '#', /%24/g, '$', /%26/g, '&', /%2C/g, ',', /%40/g, '@'];
  var keepFileProtocol = (0, _ramda.propOr)(false, 'keepFileProtocol', options);
  var isWindowsPredicate = (0, _ramda.propOr)(isWindows, 'isWindows', options); // Step 1: `decodeURI` will decode characters such as Cyrillic characters, spaces, etc.

  var path = decodeURI(uri); // Step 2: Manually decode characters that are not decoded by `decodeURI`.
  // This includes characters such as "#" and "?", which have special meaning in URLs,
  // but are just normal characters in a filesystem path.

  for (var i = 0; i < urlDecodePatterns.length; i += 2) {
    // @ts-ignore
    path = path.replace(urlDecodePatterns[i], urlDecodePatterns[i + 1]);
  } // Step 3: If it's a "file://" URL, then format it consistently
  // or convert it to a local filesystem path


  var isFileUrl = path.substr(0, 7).toLowerCase() === 'file://';

  if (isFileUrl) {
    // Strip-off the protocol, and the initial "/", if there is one
    path = path[7] === '/' ? path.substr(8) : path.substr(7); // insert a colon (":") after the drive letter on Windows

    if (isWindowsPredicate() && path[1] === '/') {
      path = "".concat(path[0], ":").concat(path.substr(1));
    }

    if (keepFileProtocol) {
      // Return the consistently-formatted "file://" URL
      path = "file:///".concat(path);
    } else {
      // Convert the "file://" URL to a local filesystem path.
      // On Windows, it will start with something like "C:/".
      // On Posix, it will start with "/"
      isFileUrl = false;
      path = isWindowsPredicate() ? path : "/".concat(path);
    }
  } // Step 4: Normalize Windows paths (unless it's a "file://" URL)


  if (isWindowsPredicate() && !isFileUrl) {
    // Replace forward slashes with backslashes
    path = (0, _ramdaAdjunct.replaceAll)('/', '\\', path); // Capitalize the drive letter

    if (path.substr(1, 2) === ':\\') {
      path = path[0].toUpperCase() + path.substr(1);
    }
  }

  return path;
};

exports.toFileSystemPath = toFileSystemPath;