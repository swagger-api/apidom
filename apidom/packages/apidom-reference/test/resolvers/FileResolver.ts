import { assert } from 'chai';
import path from 'path';

import FileResolver from '../../src/resolvers/FileResolver';
import { ResolverError } from '../../src/util/errors';
import File from '../../src/util/File';

describe('resolvers', function () {
  context('FileResolver', function () {
    let resolver: any;

    beforeEach(function () {
      resolver = FileResolver();
    });

    context('canRead', function () {
      context('given valid file system paths', function () {
        specify('should consider it a file system path', function () {
          assert.isTrue(resolver.canRead(File({ url: '/home/user/file.txt' })));
          assert.isTrue(resolver.canRead(File({ url: 'C:\\home\\user\\file.txt' })));
        });
      });

      context('given system path with file protocol', function () {
        specify('should consider it a file system path', function () {
          assert.isTrue(resolver.canRead(File({ url: 'file:///home/user/file.txt' })));
        });
      });

      context('given anything else that might be system path', function () {
        specify('should consider it a file system path', function () {
          assert.isTrue(resolver.canRead(File({ url: 'home' })));
          assert.isTrue(resolver.canRead(File({ url: 'cat' })));
          assert.isTrue(resolver.canRead(File({ url: 'unknown' })));
        });
      });

      context('given paths with other known protocols', function () {
        specify('should not consider it a file system path', function () {
          assert.isFalse(resolver.canRead(File({ url: 'https://swagger.io/' })));
          assert.isFalse(resolver.canRead(File({ url: 'http://swagger.io/' })));
          assert.isFalse(resolver.canRead(File({ url: 'ftp://swagger.io/' })));
        });
      });
    });

    context('read', function () {
      context('given valid local file system path without protocol', function () {
        specify('should read the file', async function () {
          const fileSystemPath = File({ url: path.join(__dirname, 'fixtures', 'local-file.txt') });
          const content = await resolver.read(fileSystemPath);

          assert.instanceOf(content, Buffer);
          assert.strictEqual(content.toString(), 'local file content\n');
        });
      });

      context('given valid local file system path with protocol', function () {
        specify('should read the file', async function () {
          const fileSystemPath = File({
            url: `file://${path.join(__dirname, 'fixtures', 'local-file.txt')}`,
          });
          const content = await resolver.read(fileSystemPath);

          assert.instanceOf(content, Buffer);
          assert.strictEqual(content.toString(), 'local file content\n');
        });
      });

      context('given non-existing local file system path without protocol', function () {
        specify('should throw ResolverError', async function () {
          try {
            const fileSystemPath = File({ url: '/non-existing-file.txt' });
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
            const fileSystemPath = File({ url: 'file://non-existing-file.txt' });
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
