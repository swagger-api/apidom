import { assert } from 'chai';
import path from 'path';

import FileResolver from '../../../src/resolve/resolvers/FileResolver';
import { ResolverError } from '../../../src/util/errors';
import File from '../../../src/util/File';

describe('resolve', function () {
  context('resolvers', function () {
    context('FileResolver', function () {
      let resolver: any;

      beforeEach(function () {
        resolver = FileResolver();
      });

      context('canRead', function () {
        context('given valid file system paths', function () {
          specify('should consider it a file system path', function () {
            assert.isTrue(resolver.canRead(File({ uri: '/home/user/file.txt' })));
            assert.isTrue(resolver.canRead(File({ uri: 'C:\\home\\user\\file.txt' })));
          });
        });

        context('given system path with file protocol', function () {
          specify('should consider it a file system path', function () {
            assert.isTrue(resolver.canRead(File({ uri: 'file:///home/user/file.txt' })));
          });
        });

        context('given anything else that might be system path', function () {
          specify('should consider it a file system path', function () {
            assert.isTrue(resolver.canRead(File({ uri: 'home' })));
            assert.isTrue(resolver.canRead(File({ uri: 'cat' })));
            assert.isTrue(resolver.canRead(File({ uri: 'unknown' })));
          });
        });

        context('given paths with other known protocols', function () {
          specify('should not consider it a file system path', function () {
            assert.isFalse(resolver.canRead(File({ uri: 'https://swagger.io/' })));
            assert.isFalse(resolver.canRead(File({ uri: 'http://swagger.io/' })));
            assert.isFalse(resolver.canRead(File({ uri: 'ftp://swagger.io/' })));
          });
        });
      });

      context('read', function () {
        context('given valid local file system path without protocol', function () {
          specify('should read the file', async function () {
            const fileSystemPath = File({
              uri: path.join(__dirname, 'fixtures', 'local-file.txt'),
            });
            const content = await resolver.read(fileSystemPath);

            assert.isTrue(ArrayBuffer.isView(content));
            assert.strictEqual(content.toString(), 'local file content\n');
          });
        });

        context('given valid local file system path with protocol', function () {
          specify('should read the file', async function () {
            const fileSystemPath = File({
              uri: `file://${path.join(__dirname, 'fixtures', 'local-file.txt')}`,
            });
            const content = await resolver.read(fileSystemPath);

            assert.isTrue(ArrayBuffer.isView(content));
            assert.strictEqual(content.toString(), 'local file content\n');
          });
        });

        context('given non-existing local file system path without protocol', function () {
          specify('should throw ResolverError', async function () {
            try {
              const fileSystemPath = File({ uri: '/non-existing-file.txt' });
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
              const fileSystemPath = File({ uri: 'file://non-existing-file.txt' });
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
});
