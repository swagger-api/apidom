import path from 'node:path';
import { assert } from 'chai';

import FileResolver from '../../../../src/resolve/resolvers/file/index-node';
import ResolverError from '../../../../src/errors/ResolverError';
import File from '../../../../src/File';

describe('resolve', function () {
  context('resolvers', function () {
    context('FileResolver', function () {
      let resolver: any;

      beforeEach(function () {
        resolver = FileResolver({ fileAllowList: ['*'] });
      });

      context('canRead', function () {
        context('given valid file system paths', function () {
          specify('should consider it a file system path', function () {
            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file.txt' })));
            assert.isTrue(resolver.canRead(new File({ uri: 'C:\\home\\user\\file.txt' })));
          });
        });

        context('given system path with file protocol', function () {
          specify('should consider it a file system path', function () {
            assert.isTrue(resolver.canRead(new File({ uri: 'file:///home/user/file.txt' })));
          });
        });

        context('given anything else that might be system path', function () {
          specify('should consider it a file system path', function () {
            assert.isTrue(resolver.canRead(new File({ uri: 'home' })));
            assert.isTrue(resolver.canRead(new File({ uri: 'cat' })));
            assert.isTrue(resolver.canRead(new File({ uri: 'unknown' })));
          });
        });

        context('given paths with other known protocols', function () {
          specify('should not consider it a file system path', function () {
            assert.isFalse(resolver.canRead(new File({ uri: 'https://swagger.io/' })));
            assert.isFalse(resolver.canRead(new File({ uri: 'http://swagger.io/' })));
            assert.isFalse(resolver.canRead(new File({ uri: 'ftp://swagger.io/' })));
          });
        });

        context('given paths covered by fileAllowList - glob pattern', function () {
          specify('should consider it a file system path', function () {
            resolver = FileResolver({ fileAllowList: ['*.json', '*.yaml'] });

            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file1.json' })));
            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file2.json' })));
            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file1.yaml' })));
            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file2.yaml' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file.txt' })));
          });
        });

        context('given paths covered by fileAllowList - regular expression', function () {
          specify('should consider it a file system path', function () {
            resolver = FileResolver({ fileAllowList: [/\.json$/, /\.yaml$/] });

            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file1.json' })));
            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file2.json' })));
            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file1.yaml' })));
            assert.isTrue(resolver.canRead(new File({ uri: '/home/user/file2.yaml' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file.txt' })));
          });
        });

        context('given empty fileAllowList', function () {
          specify('should not consider anything a file system path', function () {
            resolver = FileResolver({ fileAllowList: [] });

            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file1.json' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file2.json' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file1.yaml' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file2.yaml' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file.txt' })));
          });
        });

        context('given no fileAllowList provided', function () {
          specify('should not consider anything a file system path', function () {
            resolver = FileResolver();

            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file1.json' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file2.json' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file1.yaml' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file2.yaml' })));
            assert.isFalse(resolver.canRead(new File({ uri: '/home/user/file.txt' })));
          });
        });
      });

      context('read', function () {
        context('given valid local file system path without protocol', function () {
          specify('should read the file', async function () {
            const fileSystemPath = new File({
              uri: path.join(__dirname, '..', 'fixtures', 'local-file.txt'),
            });
            const content = await resolver.read(fileSystemPath);

            assert.isTrue(ArrayBuffer.isView(content));
            assert.strictEqual(content.toString(), 'local file content\n');
          });
        });

        context('given valid local file system path with protocol', function () {
          specify('should read the file', async function () {
            const fileSystemPath = new File({
              uri: `file://${path.join(__dirname, '..', 'fixtures', 'local-file.txt')}`,
            });
            const content = await resolver.read(fileSystemPath);

            assert.isTrue(ArrayBuffer.isView(content));
            assert.strictEqual(content.toString(), 'local file content\n');
          });
        });

        context('given non-existing local file system path without protocol', function () {
          specify('should throw ResolverError', async function () {
            try {
              const fileSystemPath = new File({ uri: '/non-existing-file.txt' });
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
              const fileSystemPath = new File({ uri: 'file://non-existing-file.txt' });
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
