import path from 'node:path';
import { assert } from 'chai';

import File from '../../src/util/File';
import { filter, run } from '../../src/util/plugins';
import PluginError from '../../src/errors/PluginError';
import defaultOptions from '../../src/options';

describe('util', function () {
  context('plugins', function () {
    context('filter', function () {
      context('given file system path URI', function () {
        specify('should find single file resolver plugin', async function () {
          const { resolvers } = defaultOptions.resolve;
          const file = File({ uri: '/path/to/file.json' });
          const suitablePlugins = await filter('canRead', [file], resolvers);

          assert.lengthOf(suitablePlugins, 1);
          assert.propertyVal(suitablePlugins[0], 'name', 'file');
        });
      });

      context('given HTTP URL', function () {
        specify('should find single http resolver plugin', async function () {
          const { resolvers } = defaultOptions.resolve;
          const file = File({ uri: 'http://swagger.io/file.json' });
          const suitablePlugins = await filter('canRead', [file], resolvers);

          assert.lengthOf(suitablePlugins, 1);
          assert.propertyVal(suitablePlugins[0], 'name', 'http-axios');
        });
      });

      context('given no defined plugins', function () {
        specify('should not find any suitable plugin', async function () {
          const file = File({ uri: 'http://swagger.io/file.json' });
          const suitablePlugins = await filter('canRead', [file], []);

          assert.lengthOf(suitablePlugins, 0);
        });
      });

      context('given plugin with foreign interface', function () {
        specify('should not find any suitable plugin', async function () {
          const plugins = [{}];
          const file = File({ uri: 'http://swagger.io/file.json' });
          const suitablePlugins = await filter('canRead', [file], plugins);

          assert.lengthOf(suitablePlugins, 0);
        });
      });
    });

    context('run', function () {
      context('given existing file system path URI', function () {
        const fileSystemPath = path.join(__dirname, 'fixtures', 'file.json');

        specify('should run `file` plugin successfully', async function () {
          const { resolvers } = defaultOptions.resolve;
          const file = File({ uri: fileSystemPath });
          const suitablePlugins = await filter('canRead', [file], resolvers);
          const { plugin } = await run('read', [file], suitablePlugins);

          assert.propertyVal(plugin, 'name', 'file');
        });

        specify('should return file content', async function () {
          const { resolvers } = defaultOptions.resolve;
          const file = File({ uri: fileSystemPath });
          const suitablePlugins = await filter('canRead', [file], resolvers);
          const { result } = await run('read', [file], suitablePlugins);

          assert.strictEqual(result.toString(), '{}\n');
        });

        context('given one of the plugins errors', function () {
          specify('should still return file content', async function () {
            const { resolvers } = defaultOptions.resolve;
            const file = File({ uri: fileSystemPath });
            const suitablePlugins = await filter('canRead', [file], resolvers);
            const { result } = await run('read', [file], [{}, ...suitablePlugins]);

            assert.strictEqual(result.toString(), '{}\n');
          });
        });
      });

      context('given non existing file system path URI', function () {
        const fileSystemPath = '/path/to/file.json';

        specify('should reject with error', async function () {
          const { resolvers } = defaultOptions.resolve;
          const file = File({ uri: fileSystemPath });
          const suitablePlugins = await filter('canRead', [file], resolvers);

          try {
            await run('read', [file], suitablePlugins);
            assert.fail('Should throw object with Error here');
          } catch (error: any) {
            assert.instanceOf(error, PluginError);
            assert.propertyVal(error.plugin, 'name', 'file');
            assert.instanceOf(error.cause, Error);
          }
        });
      });
    });
  });
});
