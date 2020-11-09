import { assert } from 'chai';
import path from 'path';

import FileResolver from '../../src/resolvers/FileResolver';
import { ResolverError } from '../../src/util/errors';

describe('resolvers', function () {
  context('FileResolver', function () {
    let resolver: FileResolver;

    beforeEach(function () {
      resolver = FileResolver();
    });

    context('canRead', function () {
      context('given valid file system paths', function () {
        specify('should consider it a file system path', function () {
          assert.isTrue(resolver.canRead('/home/user/file.txt'));
          assert.isTrue(resolver.canRead('C:\\home\\user\\file.txt'));
        });
      });

      context('given system path with file protocol', function () {
        specify('should consider it a file system path', function () {
          assert.isTrue(resolver.canRead('file:///home/user/file.txt'));
        });
      });

      context('given anything else that might be system path', function () {
        specify('should consider it a file system path', function () {
          assert.isTrue(resolver.canRead('home'));
          assert.isTrue(resolver.canRead('cat'));
          assert.isTrue(resolver.canRead('unknown'));
        });
      });

      context('given paths with known protocols', function () {
        specify('should not consider it a file system path', function () {
          assert.isFalse(resolver.canRead('https://swagger.io/'));
          assert.isFalse(resolver.canRead('http://swagger.io/'));
          assert.isFalse(resolver.canRead('ftp://swagger.io/'));
        });
      });
    });

    context('read', function () {
      context('given valid local file system path without protocol', function () {
        specify('should read the file', async function () {
          const fileSystemPath = path.join(__dirname, 'fixtures', 'local-file.txt');
          const content = await resolver.read(fileSystemPath);

          assert.instanceOf(content, Buffer);
          assert.strictEqual(content.toString(), 'local file content\n');
        });
      });

      context('given valid local file system path with protocol', function () {
        specify('should read the file', async function () {
          const fileSystemPath = `file://${path.join(__dirname, 'fixtures', 'local-file.txt')}`;
          const content = await resolver.read(fileSystemPath);

          assert.instanceOf(content, Buffer);
          assert.strictEqual(content.toString(), 'local file content\n');
        });
      });

      context('given non-existing local file system path without protocol', function () {
        specify('should throw ResolverError', async function () {
          try {
            const fileSystemPath = '/non-existing-file.txt';
            await resolver.read(fileSystemPath);
            assert.fail('should trow ResolverError');
          } catch (e) {
            assert.instanceOf(e, ResolverError);
            assert.propertyVal(e, 'message', 'Error opening file "/non-existing-file.txt"');
          }
        });
      });

      context('given non-existing local file system path with protocol', function () {
        specify('should throw ResolverError', async function () {
          try {
            const fileSystemPath = 'file://non-existing-file.txt';
            await resolver.read(fileSystemPath);
            assert.fail('should trow ResolverError');
          } catch (e) {
            assert.instanceOf(e, ResolverError);
            assert.propertyVal(e, 'message', 'Error opening file "file://non-existing-file.txt"');
          }
        });
      });
    });
  });
});
