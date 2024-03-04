import { assert } from 'chai';
import {
  ObjectElement,
  ArrayElement,
  StringElement,
  RefElement,
  isRefElement,
  toValue,
} from '@swagger-api/apidom-core';

import { dereferenceApiDOM, DereferenceError } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('apidom', function () {
      context('local', function () {
        context(
          'given the RefElement is held by an ArrayElement and references an ArrayElement',
          function () {
            specify('should insert content entries in place of the RefElement', async function () {
              const element = new ObjectElement({
                array1: new ArrayElement([1, 2, 3], { id: 'unique-id' }),
                array2: new ArrayElement([new RefElement('unique-id'), 4, 5]),
              });
              const actual = await dereferenceApiDOM(element, {
                parse: { mediaType: 'application/vnd.apidom' },
              });
              const expected = [1, 2, 3, 4, 5];

              assert.deepEqual(toValue(actual.get('array2')), expected);
            });
          },
        );

        context(
          'given the RefElement is held by an ObjectElement and references an ObjectElement',
          function () {
            specify('should insert content entries in place of the RefElement', async function () {
              const element = new ObjectElement({
                object1: new ObjectElement({ a: 'b', c: 'd' }, { id: 'unique-id' }),
                object2: new ObjectElement({ e: 'f' }),
              });
              element.get('object2').content.push(new RefElement('unique-id'));
              const actual = await dereferenceApiDOM(element, {
                parse: { mediaType: 'application/vnd.apidom' },
              });
              const expected = { a: 'b', c: 'd', e: 'f' };

              assert.deepEqual(toValue(actual.get('object2')), expected);
            });
          },
        );

        specify('should substitute Ref Element with the Element it references', async function () {
          const element = new ObjectElement({
            element: new StringElement('test', { id: 'unique-id' }),
            ref: new RefElement('unique-id'),
          });
          const actual = await dereferenceApiDOM(element, {
            parse: { mediaType: 'application/vnd.apidom' },
          });
          const expected = { element: 'test', ref: 'test' };

          assert.deepEqual(toValue(actual), expected);
        });

        specify('should handle simple cycles', async function () {
          const element = new ObjectElement(
            {
              parent: new RefElement('unique-id'),
            },
            { id: 'unique-id' },
          );
          const actual = await dereferenceApiDOM(element, {
            parse: { mediaType: 'application/vnd.apidom' },
          });
          const expected = toValue(actual);

          assert.strictEqual(expected, expected.parent);
        });

        specify('should handle complex cycles', async function () {
          const element = new ObjectElement({
            level1: new ObjectElement(
              {
                level2a: {
                  level3: {
                    ref2: new RefElement('level-1'),
                  },
                },
                level2b: new ObjectElement(
                  {
                    level2b: true,
                  },
                  { id: 'level-2b' },
                ),
                ref1: new RefElement('level-2b'),
              },
              { id: 'level-1' },
            ),
          });
          const actual = await dereferenceApiDOM(element, {
            parse: { mediaType: 'application/vnd.apidom' },
          });
          const expected = toValue(actual);

          assert.strictEqual(expected.level1.level2b, expected.level1.ref1);
          assert.strictEqual(expected.level1, expected.level1.level2a.level3.ref2);
        });

        context('given clone option', function () {
          specify(
            'should not mutate the original element when clone options is not specified',
            async function () {
              const element = new ObjectElement({
                element: new StringElement('test', { id: 'unique-id' }),
                ref: new RefElement('unique-id'),
              });
              const actual = await dereferenceApiDOM(element, {
                parse: { mediaType: 'application/vnd.apidom' },
                dereference: { strategyOpts: { apidom: { clone: true } } },
              });

              assert.isTrue(isRefElement(element.get('ref')));
              assert.isFalse(isRefElement(actual.get('ref')));
            },
          );

          specify('should not mutate the original element when clone=true', async function () {
            const element = new ObjectElement({
              element: new StringElement('test', { id: 'unique-id' }),
              ref: new RefElement('unique-id'),
            });
            const actual = await dereferenceApiDOM(element, {
              parse: { mediaType: 'application/vnd.apidom' },
              dereference: { strategyOpts: { apidom: { clone: true } } },
            });

            assert.isTrue(isRefElement(element.get('ref')));
            assert.isFalse(isRefElement(actual.get('ref')));
          });

          specify('should mutate the original element on clone=false', async function () {
            const element = new ObjectElement({
              element: new StringElement('test', { id: 'unique-id' }),
              ref: new RefElement('unique-id'),
            });
            const actual = await dereferenceApiDOM(element, {
              parse: { mediaType: 'application/vnd.apidom' },
              dereference: { strategyOpts: { apidom: { clone: false } } },
            });

            assert.isFalse(isRefElement(element.get('ref')));
            assert.isFalse(isRefElement(actual.get('ref')));
          });
        });

        context('given RefElement path attribute', function () {
          specify(
            'should transclude the given property of the referenced element',
            async function () {
              class CustomElement extends ObjectElement {
                // eslint-disable-next-line class-methods-use-this
                get property() {
                  return new StringElement('propValue');
                }
              }

              const element = new ObjectElement({
                element: new CustomElement(undefined, { id: 'unique-id' }),
                ref: new RefElement('unique-id', undefined, { path: 'property' }),
              });
              const actual = await dereferenceApiDOM(element, {
                parse: { mediaType: 'application/vnd.apidom' },
              });
              const expected = { element: {}, ref: 'propValue' };

              assert.deepEqual(toValue(actual), expected);
            },
          );

          context(
            'and the RefElement is held by an ArrayElement and references an ArrayElement',
            function () {
              specify(
                'should insert content entries in place of the RefElement',
                async function () {
                  const element = new ObjectElement({
                    array1: new ArrayElement([1, 2, 3], { id: 'unique-id' }),
                    array2: new ArrayElement([
                      new RefElement('unique-id', undefined, { path: 'content' }),
                      4,
                      5,
                    ]),
                  });
                  const actual = await dereferenceApiDOM(element, {
                    parse: { mediaType: 'application/vnd.apidom' },
                  });
                  const expected = [1, 2, 3, 4, 5];

                  assert.deepEqual(toValue(actual.get('array2')), expected);
                },
              );
            },
          );

          context(
            'and the RefElement is held by an ObjectElement and references an ObjectElement',
            function () {
              specify(
                'should insert content entries in place of the RefElement',
                async function () {
                  const element = new ObjectElement({
                    object1: new ObjectElement({ a: 'b', c: 'd' }, { id: 'unique-id' }),
                    object2: new ObjectElement({ e: 'f' }),
                  });
                  element
                    .get('object2')
                    .content.push(new RefElement('unique-id', undefined, { path: 'content' }));
                  const actual = await dereferenceApiDOM(element, {
                    parse: { mediaType: 'application/vnd.apidom' },
                  });
                  const expected = { a: 'b', c: 'd', e: 'f' };

                  assert.deepEqual(toValue(actual.get('object2')), expected);
                },
              );
            },
          );
        });

        context('given RefElement is referencing another RefElement', async function () {
          specify('should throw error', async function () {
            try {
              const element = new ObjectElement({
                element: new RefElement('', { id: 'unique-id' }),
                ref: new RefElement('unique-id'),
              });
              await dereferenceApiDOM(element, {
                parse: { mediaType: 'application/vnd.apidom' },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        context('given RefElement is referencing itself', async function () {
          specify('should throw error', async function () {
            try {
              const element = new ObjectElement({
                ref: new RefElement('unique-id', { id: 'unique-id' }),
              });
              await dereferenceApiDOM(element, {
                parse: { mediaType: 'application/vnd.apidom' },
              });
              assert.fail('should throw DereferenceError');
            } catch (e) {
              assert.instanceOf(e, DereferenceError);
            }
          });
        });

        specify('should consider remote looking references as local', async function () {
          const element = new ObjectElement(
            {
              element: new StringElement('test', { id: 'unique-id' }),
              ref: new RefElement('https://example.com/#unique-id'),
            },
            { classes: ['result'] },
          );
          const actual = await dereferenceApiDOM(element, {
            parse: { mediaType: 'application/vnd.apidom' },
            resolve: { baseURI: 'https://example.com/' },
          });
          const expected = { element: 'test', ref: 'test' };

          assert.deepEqual(toValue(actual), expected);
        });
      });
    });
  });
});
