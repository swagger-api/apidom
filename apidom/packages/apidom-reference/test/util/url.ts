import { assert } from 'chai';
import { T as stubTrue } from 'ramda';

import { toFileSystemPath, getExtension } from '../../src/util/url';

describe('url', function () {
  context('toFileSystemPath', function () {
    context('given valid file system path', function () {
      specify('should return identical file system path', function () {
        const fileSystemPathInput = '/home/user/file.txt';
        const fileSystemPathOutput = toFileSystemPath({}, fileSystemPathInput);

        assert.strictEqual(fileSystemPathOutput, '/home/user/file.txt');
      });
    });

    context('given file system path with uri encoded characters', function () {
      specify('should return decoded file system path', function () {
        const fileSystemPathInput = '/home/user/%D1%88%D0%B5%D0%BB%D0%BB%D1%8B';
        const fileSystemPathOutput = toFileSystemPath({}, fileSystemPathInput);

        assert.strictEqual(fileSystemPathOutput, '/home/user/шеллы');
      });
    });

    context('given file system path with special characters', function () {
      specify('should return decoded file system path', function () {
        const fileSystemPathInput = '/home/user/%23%24%26%2C%40';
        const fileSystemPathOutput = toFileSystemPath({}, fileSystemPathInput);

        assert.strictEqual(fileSystemPathOutput, '/home/user/#$&,@');
      });
    });

    context('given file system path with file protocol', function () {
      specify('should strip file protocol', function () {
        const fileSystemPathInput = 'file:///home/user/file.txt';
        const fileSystemPathOutput = toFileSystemPath({}, fileSystemPathInput);

        assert.strictEqual(fileSystemPathOutput, '/home/user/file.txt');
      });

      context('given keepFileProtocol option', function () {
        specify('should not strip file protocol', function () {
          const fileSystemPathInput = 'file:///home/user/file.txt';
          const fileSystemPathOutput = toFileSystemPath(
            { keepFileProtocol: true },
            fileSystemPathInput,
          );

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
            const fileSystemPathOutput = toFileSystemPath(
              { isWindows: stubTrue },
              fileSystemPathInput,
            );

            assert.strictEqual(fileSystemPathOutput, 'C:\\home\\user\\file.txt');
          },
        );

        context('given slash after driver letter', function () {
          specify('should replace slash with colon', function () {
            const fileSystemPathInput = 'file://c/home/user/file.txt';
            const fileSystemPathOutput = toFileSystemPath(
              { isWindows: stubTrue, keepFileProtocol: true },
              fileSystemPathInput,
            );

            assert.strictEqual(fileSystemPathOutput, 'file:///c:/home/user/file.txt');
          });
        });

        context('given keepFileProtocol option', function () {
          specify('should insert additional slash after file protocol', function () {
            const fileSystemPathInput = 'file://c:/home/user/file.txt';
            const fileSystemPathOutput = toFileSystemPath(
              { isWindows: stubTrue, keepFileProtocol: true },
              fileSystemPathInput,
            );

            assert.strictEqual(fileSystemPathOutput, 'file:///c:/home/user/file.txt');
          });
        });
      });

      context('given file system path without file protocol', function () {
        specify(
          'should replace forward slashes with backslashes and capitalize drive letter',
          function () {
            const fileSystemPathInput = 'c:/home/user/file.txt';
            const fileSystemPathOutput = toFileSystemPath(
              { isWindows: stubTrue },
              fileSystemPathInput,
            );

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
});
