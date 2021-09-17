import { assert } from 'chai';
import { T as stubTrue } from 'ramda';

import {
  fromFileSystemPath,
  toFileSystemPath,
  getExtension,
  getHash,
  resolve,
  stripHash,
} from '../../src/util/url';

describe('util', function () {
  context('url', function () {
    context('fromFileSystemPath', function () {
      context('given incorrectly escaped file system path', function () {
        specify('should property escape file system path', function () {
          assert.strictEqual(
            fromFileSystemPath('<"!@#$%^&*+=?\'>.json'),
            "%3C%22!@%23$%25%5E&*+=%3F'%3E.json",
          );
          assert.strictEqual(
            fromFileSystemPath('file://Project #42/file.json'),
            'file://Project%20%2342/file.json',
          );
        });

        context('given on windows', function () {
          specify('should properly escape windows file system path', function () {
            const originalPlatform = process.platform;

            Object.defineProperty(process, 'platform', {
              value: 'win',
            });

            assert.strictEqual(
              fromFileSystemPath('C:\\My Documents\\File (1).json'),
              'C:/My%20Documents/File%20(1).json',
            );

            Object.defineProperty(process, 'platform', {
              value: originalPlatform,
            });
          });
        });
      });
    });

    context('toFileSystemPath', function () {
      context('given valid file system path', function () {
        specify('should return identical file system path', function () {
          const fileSystemPathInput = '/home/user/file.txt';
          const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput);

          assert.strictEqual(fileSystemPathOutput, '/home/user/file.txt');
        });
      });

      context('given file system path with uri encoded characters', function () {
        specify('should return decoded file system path', function () {
          const fileSystemPathInput = '/home/user/%D1%88%D0%B5%D0%BB%D0%BB%D1%8B';
          const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput);

          assert.strictEqual(fileSystemPathOutput, '/home/user/шеллы');
        });
      });

      context('given file system path with special characters', function () {
        specify('should return decoded file system path', function () {
          const fileSystemPathInput = '/home/user/%23%24%26%2C%40';
          const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput);

          assert.strictEqual(fileSystemPathOutput, '/home/user/#$&,@');
        });
      });

      context('given file system path with file protocol', function () {
        specify('should strip file protocol', function () {
          const fileSystemPathInput = 'file:///home/user/file.txt';
          const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput);

          assert.strictEqual(fileSystemPathOutput, '/home/user/file.txt');
        });

        context('given keepFileProtocol option', function () {
          specify('should not strip file protocol', function () {
            const fileSystemPathInput = 'file:///home/user/file.txt';
            const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput, {
              keepFileProtocol: true,
            });

            assert.strictEqual(fileSystemPathOutput, 'file:///home/user/file.txt');
          });
        });
      });

      context('given running on Windows platform', function () {
        context('given file system path with file protocol', function () {
          specify(
            'should replace forward slashes with backslashes and capitalize drive letter',
            function () {
              const fileSystemPathInput = 'file://c:/home/user/file.txt';
              const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput, {
                isWindows: stubTrue,
              });

              assert.strictEqual(fileSystemPathOutput, 'C:\\home\\user\\file.txt');
            },
          );

          context('given slash after driver letter', function () {
            specify('should replace slash with colon', function () {
              const fileSystemPathInput = 'file://c/home/user/file.txt';
              const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput, {
                isWindows: stubTrue,
                keepFileProtocol: true,
              });

              assert.strictEqual(fileSystemPathOutput, 'file:///c:/home/user/file.txt');
            });
          });

          context('given keepFileProtocol option', function () {
            specify('should insert additional slash after file protocol', function () {
              const fileSystemPathInput = 'file://c:/home/user/file.txt';
              const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput, {
                isWindows: stubTrue,
                keepFileProtocol: true,
              });

              assert.strictEqual(fileSystemPathOutput, 'file:///c:/home/user/file.txt');
            });
          });
        });

        context('given file system path without file protocol', function () {
          specify(
            'should replace forward slashes with backslashes and capitalize drive letter',
            function () {
              const fileSystemPathInput = 'c:/home/user/file.txt';
              const fileSystemPathOutput = toFileSystemPath(fileSystemPathInput, {
                isWindows: stubTrue,
              });

              assert.strictEqual(fileSystemPathOutput, 'C:\\home\\user\\file.txt');
            },
          );
        });
      });
    });

    context('getExtension', function () {
      specify('should return extension from url', function () {
        const url = 'https://swagger.io/file.json';
        const extension = getExtension(url);

        assert.strictEqual(extension, '.json');
      });

      context('given multiple extensions', function () {
        specify('should return last extension from url', function () {
          const url = 'https://swagger.io/file.yaml.json';
          const extension = getExtension(url);

          assert.strictEqual(extension, '.json');
        });
      });
    });

    context('getHash', function () {
      context('given hash only', function () {
        specify('should act as identity function', function () {
          const pointer = '#/path/to/json/value';
          const hash = getHash(pointer);

          assert.strictEqual(hash, '#/path/to/json/value');
        });
      });

      context('given absolute url with hash', function () {
        specify('should return hash part', function () {
          const pointer = 'https://swagger.io/file.json#/path/to/json/value';
          const hash = getHash(pointer);

          assert.strictEqual(hash, '#/path/to/json/value');
        });
      });

      context('given no hash', function () {
        specify('should return root hash', function () {
          const pointer = 'https://swagger.io/file.json';
          const hash = getHash(pointer);

          assert.strictEqual(hash, '#');
        });
      });
    });

    context('resolve', function () {
      context('given from and to parameters', function () {
        specify('should resolve URI', function () {
          assert.strictEqual(resolve('/one/two/three', 'four'), '/one/two/four');
          assert.strictEqual(resolve('file:///one/two/three', 'four'), 'file:///one/two/four');
          assert.strictEqual(resolve('file:///one/two/three', './four'), 'file:///one/two/four');
          assert.strictEqual(resolve('file:///one/two/three', '../four'), 'file:///one/four');
          assert.strictEqual(resolve('file:///one/two/three', 'file:four'), 'file:///one/two/four');
          assert.strictEqual(resolve('http://example.com/', ''), 'http://example.com/');
          assert.strictEqual(resolve('http://example.com/', '/one'), 'http://example.com/one');
          assert.strictEqual(resolve('http://example.com/one', '/two'), 'http://example.com/two');
        });
      });
    });

    context('stripHash', function () {
      context('given file system URI', function () {
        context('and URI contains hash', function () {
          specify('should strip hash part of URI', function () {
            assert.strictEqual(stripHash('/file/system/path#hash'), '/file/system/path');
          });
        });

        context('and URI does not contain hash', function () {
          specify('should return original URI', function () {
            assert.strictEqual(stripHash('/file/system/path'), '/file/system/path');
          });
        });
      });

      context('given HTTP URL', function () {
        context('and URL contains hash', function () {
          specify('should strip hash part of URL', function () {
            assert.strictEqual(
              stripHash('http://swagger.io/petstore.json#hash'),
              'http://swagger.io/petstore.json',
            );
          });
        });

        context('and URL does not contain hash', function () {
          specify('should return original URL', function () {
            assert.strictEqual(
              stripHash('http://swagger.io/petstore.json'),
              'http://swagger.io/petstore.json',
            );
          });
        });
      });

      context('given File URL', function () {
        context('and URL contains hash', function () {
          specify('should strip hash part of URL', function () {
            assert.strictEqual(stripHash('file://path/to/file#hash'), 'file://path/to/file');
          });
        });

        context('and URL does not contain hash', function () {
          specify('should return original URL', function () {
            assert.strictEqual(stripHash('file://path/to/file'), 'file://path/to/file');
          });
        });
      });
    });
  });
});
