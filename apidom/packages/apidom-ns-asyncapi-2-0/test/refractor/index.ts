import { assert } from 'chai';
import sinon from 'sinon';
import { Namespace } from 'minim';
import { ObjectElement, toValue } from 'apidom';

import * as predicates from '../../src/predicates';
import { AsyncApi2_0Element, isAsyncApiVersionElement } from '../../src';

describe('refractor', function () {
  specify('should refract to openapi-3-1 namespace', function () {
    const genericObject = new ObjectElement({
      asyncapi: '2.0.0',
    });
    const asyncApiElement = AsyncApi2_0Element.refract(genericObject);

    // console.log(toString(asyncApiElement));
    assert.deepEqual(toValue(asyncApiElement), { asyncapi: '2.0.0' });
  });

  context('supports plugins', function () {
    let plugin1Spec: any;
    let plugin2Spec: any;
    let plugin1: any;
    let plugin2: any;

    beforeEach(function () {
      plugin1Spec = {
        pre() {},
        visitor: {
          AsyncApiVersion(element: AsyncApi2_0Element) {
            // @ts-ignore
            element.content = '2.0.1'; // eslint-disable-line no-param-reassign
          },
        },
        post() {},
      };
      plugin2Spec = {
        pre() {},
        visitor: {
          AsyncApiVersion(element: AsyncApi2_0Element) {
            // @ts-ignore
            element.meta.set('metaKey', 'metaValue');
          },
        },
        post() {},
      };
      plugin1 = sinon.spy(() => plugin1Spec);
      plugin2 = sinon.spy(() => plugin2Spec);

      sinon.spy(plugin1Spec, 'pre');
      sinon.spy(plugin1Spec, 'post');
      sinon.spy(plugin1Spec.visitor, 'AsyncApiVersion');

      sinon.spy(plugin2Spec, 'pre');
      sinon.spy(plugin2Spec, 'post');
      sinon.spy(plugin2Spec.visitor, 'AsyncApiVersion');
    });

    context('plugin', function () {
      specify('should be called with toolbox object', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.hasAllKeys(plugin1.firstCall.args[0], ['predicates', 'namespace']);
      });

      specify('should have predicates in toolbox object', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.hasAllKeys(plugin1.firstCall.args[0].predicates, Object.keys(predicates));
      });

      specify('should have namespace in toolbox object', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.instanceOf(plugin1.firstCall.args[0].namespace, Namespace);
      });
    });

    context('pre hook', function () {
      specify('should call it once', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.isTrue(plugin1Spec.pre.calledOnce);
      });

      specify('should call it before other plugin pre hook', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.pre));
      });

      specify('should call it before visiting', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin1Spec.visitor.AsyncApiVersion));
        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.visitor.AsyncApiVersion));
      });
    });

    context('post hook', function () {
      specify('should call it once', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.isTrue(plugin1Spec.post.calledOnce);
      });

      specify('should call it before other plugin post hook', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.post.calledBefore(plugin2Spec.post));
      });

      specify('should call it after visiting', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.post.calledAfter(plugin1Spec.visitor.AsyncApiVersion));
        assert.isTrue(plugin1Spec.post.calledAfter(plugin2Spec.visitor.AsyncApiVersion));
      });
    });

    context('visitor', function () {
      specify('should be called once', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.visitor.AsyncApiVersion.calledOnce);
        assert.isTrue(plugin2Spec.visitor.AsyncApiVersion.calledOnce);
      });

      specify('should be called in proper order', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.0.0',
        });
        AsyncApi2_0Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(
          plugin1Spec.visitor.AsyncApiVersion.calledBefore(plugin2Spec.visitor.AsyncApiVersion),
        );
      });

      context('first plugin', function () {
        specify('should receive arguments', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.0.0',
          });
          AsyncApi2_0Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.lengthOf(plugin1Spec.visitor.AsyncApiVersion.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.0.0',
          });
          AsyncApi2_0Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.isTrue(
            isAsyncApiVersionElement(plugin1Spec.visitor.AsyncApiVersion.firstCall.args[0]),
          );
        });

        specify('should augment asyncapi version', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.0.0',
          });
          const asyncApiElement = AsyncApi2_0Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.deepEqual(toValue(asyncApiElement), { asyncapi: '2.0.1' });
        });
      });

      context('second plugin', function () {
        specify('should receive arguments', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.0.0',
          });
          AsyncApi2_0Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          assert.lengthOf(plugin2Spec.visitor.AsyncApiVersion.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.0.0',
          });
          AsyncApi2_0Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          assert.isTrue(
            isAsyncApiVersionElement(plugin2Spec.visitor.AsyncApiVersion.firstCall.args[0]),
          );
        });

        specify('should append metadata to asyncapi version', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.0.0',
          });
          const asyncApiElement = AsyncApi2_0Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          // @ts-ignore
          assert.strictEqual(asyncApiElement.asyncapi.meta.get('metaKey').toValue(), 'metaValue');
        });
      });
    });
  });
});
