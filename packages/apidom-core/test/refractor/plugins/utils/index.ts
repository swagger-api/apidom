import sinon from 'sinon';
import { assert } from 'chai';

import {
  NumberElement,
  ObjectElement,
  toValue,
  dispatchRefractorPlugins as dispatchPluginsSync,
} from '../../../../src';

const dispatchPluginsAsync = dispatchPluginsSync[Symbol.for('nodejs.util.promisify.custom')];

describe('refrator', function () {
  context('plugins', function () {
    context('utils', function () {
      context('dispatchPluginsSync', function () {
        specify('should dispatch plugins synchronously', function () {
          const preSpy = sinon.spy();
          const postSpy = sinon.spy();
          const NumberElementSpy = sinon.spy(() => new NumberElement(2));
          const plugin = () => ({
            pre: preSpy,
            visitor: {
              NumberElement: NumberElementSpy,
            },
            post: postSpy,
          });
          const objectElement = new ObjectElement({ a: 1 });
          const result = dispatchPluginsSync(objectElement, [plugin]);

          assert.isTrue(preSpy.calledBefore(NumberElementSpy));
          assert.isTrue(postSpy.calledAfter(NumberElementSpy));
          assert.deepEqual(toValue(result), { a: 2 });
        });
      });

      context('dispatchPluginsASync', function () {
        specify('should dispatch plugins asynchronously', async function () {
          const preSpy = sinon.spy();
          const postSpy = sinon.spy();
          const NumberElementSpy = sinon.spy(async () => new NumberElement(2));
          const plugin = () => ({
            pre: preSpy,
            visitor: {
              NumberElement: NumberElementSpy,
            },
            post: postSpy,
          });
          const objectElement = new ObjectElement({ a: 1 });
          const result = await dispatchPluginsAsync(objectElement, [plugin]);

          assert.isTrue(preSpy.calledBefore(NumberElementSpy));
          assert.isTrue(postSpy.calledAfter(NumberElementSpy));
          assert.deepEqual(toValue(result), { a: 2 });
        });
      });
    });
  });
});
