import fs from 'node:fs';
import path from 'node:path';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { ObjectElement, toValue, Namespace } from '@swagger-api/apidom-core';

import * as predicates from '../../src/predicates';
import { AsyncApi2Element, AsyncApiVersionElement, isAsyncApiVersionElement } from '../../src';

describe('refractor', function () {
  context('given generic ApiDOM object in AsyncApi 2.0.0 shape', function () {
    specify('should refract to AsyncApi2Element', function () {
      const asyncApiString = fs
        .readFileSync(path.join(__dirname, 'fixtures', 'asyncapi-2-0-0.json'))
        .toString();
      const asyncApiPojo = JSON.parse(asyncApiString);
      const genericObjectElement = new ObjectElement(asyncApiPojo);
      const asyncApiElement = AsyncApi2Element.refract(genericObjectElement);

      expect(asyncApiElement).toMatchSnapshot();
    });
  });

  context('given generic ApiDOM object in AsyncApi 2.1.0 shape', function () {
    specify('should refract to AsyncApi2Element', function () {
      const asyncApiString = fs
        .readFileSync(path.join(__dirname, 'fixtures', 'asyncapi-2-1-0.json'))
        .toString();
      const asyncApiPojo = JSON.parse(asyncApiString);
      const genericObjectElement = new ObjectElement(asyncApiPojo);
      const asyncApiElement = AsyncApi2Element.refract(genericObjectElement);

      expect(asyncApiElement).toMatchSnapshot();
    });
  });

  context('given generic ApiDOM object in AsyncApi 2.2.0 shape', function () {
    specify('should refract to AsyncApi2Element', function () {
      const asyncApiString = fs
        .readFileSync(path.join(__dirname, 'fixtures', 'asyncapi-2-2-0.json'))
        .toString();
      const asyncApiPojo = JSON.parse(asyncApiString);
      const genericObjectElement = new ObjectElement(asyncApiPojo);
      const asyncApiElement = AsyncApi2Element.refract(genericObjectElement);

      expect(asyncApiElement).toMatchSnapshot();
    });
  });

  context('given generic ApiDOM object in AsyncApi 2.3.0 shape', function () {
    specify('should refract to AsyncApi2Element', function () {
      const asyncApiString = fs
        .readFileSync(path.join(__dirname, 'fixtures', 'asyncapi-2-3-0.json'))
        .toString();
      const asyncApiPojo = JSON.parse(asyncApiString);
      const genericObjectElement = new ObjectElement(asyncApiPojo);
      const asyncApiElement = AsyncApi2Element.refract(genericObjectElement);

      expect(asyncApiElement).toMatchSnapshot();
    });
  });

  context('given generic ApiDOM object in AsyncApi 2.4.0 shape', function () {
    specify('should refract to AsyncApi2Element', function () {
      const asyncApiString = fs
        .readFileSync(path.join(__dirname, 'fixtures', 'asyncapi-2-4-0.json'))
        .toString();
      const asyncApiPojo = JSON.parse(asyncApiString);
      const genericObjectElement = new ObjectElement(asyncApiPojo);
      const asyncApiElement = AsyncApi2Element.refract(genericObjectElement);

      expect(asyncApiElement).toMatchSnapshot();
    });
  });

  context('given generic ApiDOM object in AsyncApi 2.5.0 shape', function () {
    specify('should refract to AsyncApi2Element', function () {
      const asyncApiString = fs
        .readFileSync(path.join(__dirname, 'fixtures', 'asyncapi-2-5-0.json'))
        .toString();
      const asyncApiPojo = JSON.parse(asyncApiString);
      const genericObjectElement = new ObjectElement(asyncApiPojo);
      const asyncApiElement = AsyncApi2Element.refract(genericObjectElement);

      expect(asyncApiElement).toMatchSnapshot();
    });
  });

  context('supports plugins', function () {
    let plugin1Spec: any;
    let plugin2Spec: any;
    let plugin1: any;
    let plugin2: any;

    beforeEach(function () {
      plugin1Spec = {
        name: 'plugin1',
        pre() {},
        visitor: {
          AsyncApiVersionElement(element: AsyncApiVersionElement) {
            // @ts-ignore
            element.content = '2.0.1'; // eslint-disable-line no-param-reassign
          },
        },
        post() {},
      };
      plugin2Spec = {
        name: 'plugin2',
        pre() {},
        visitor: {
          AsyncApiVersionElement(element: AsyncApiVersionElement) {
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
      sinon.spy(plugin1Spec.visitor, 'AsyncApiVersionElement');

      sinon.spy(plugin2Spec, 'pre');
      sinon.spy(plugin2Spec, 'post');
      sinon.spy(plugin2Spec.visitor, 'AsyncApiVersionElement');
    });

    context('plugin', function () {
      specify('should be called with toolbox object', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.hasAllKeys(plugin1.firstCall.args[0], ['predicates', 'namespace']);
      });

      specify('should have predicates in toolbox object', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.hasAnyKeys(plugin1.firstCall.args[0].predicates, Object.keys(predicates));
      });

      specify('should have namespace in toolbox object', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.instanceOf(plugin1.firstCall.args[0].namespace, Namespace);
      });
    });

    context('pre hook', function () {
      specify('should call it once', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.isTrue(plugin1Spec.pre.calledOnce);
      });

      specify('should call it before other plugin pre hook', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.pre));
      });

      specify('should call it before visiting', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin1Spec.visitor.AsyncApiVersionElement));
        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.visitor.AsyncApiVersionElement));
      });
    });

    context('post hook', function () {
      specify('should call it once', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.isTrue(plugin1Spec.post.calledOnce);
      });

      specify('should call it before other plugin post hook', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.post.calledBefore(plugin2Spec.post));
      });

      specify('should call it after visiting', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.post.calledAfter(plugin1Spec.visitor.AsyncApiVersionElement));
        assert.isTrue(plugin1Spec.post.calledAfter(plugin2Spec.visitor.AsyncApiVersionElement));
      });
    });

    context('visitor', function () {
      specify('should be called once', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.visitor.AsyncApiVersionElement.calledOnce);
        assert.isTrue(plugin2Spec.visitor.AsyncApiVersionElement.calledOnce);
      });

      specify('should be called in proper order', function () {
        const genericObject = new ObjectElement({
          asyncapi: '2.5.0',
        });
        AsyncApi2Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(
          plugin1Spec.visitor.AsyncApiVersionElement.calledBefore(
            plugin2Spec.visitor.AsyncApiVersionElement,
          ),
        );
      });

      context('first plugin', function () {
        specify('should receive arguments', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.5.0',
          });
          AsyncApi2Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.lengthOf(plugin1Spec.visitor.AsyncApiVersionElement.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.5.0',
          });
          AsyncApi2Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.isTrue(
            isAsyncApiVersionElement(plugin1Spec.visitor.AsyncApiVersionElement.firstCall.args[0]),
          );
        });

        specify('should augment asyncapi version', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.5.0',
          });
          const asyncApiElement = AsyncApi2Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.deepEqual(toValue(asyncApiElement), { asyncapi: '2.0.1' });
        });
      });

      context('second plugin', function () {
        specify('should receive arguments', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.5.0',
          });
          AsyncApi2Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          assert.lengthOf(plugin2Spec.visitor.AsyncApiVersionElement.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.5.0',
          });
          AsyncApi2Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          assert.isTrue(
            isAsyncApiVersionElement(plugin2Spec.visitor.AsyncApiVersionElement.firstCall.args[0]),
          );
        });

        specify('should append metadata to asyncapi version', function () {
          const genericObject = new ObjectElement({
            asyncapi: '2.5.0',
          });
          const asyncApiElement = AsyncApi2Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          // @ts-ignore
          assert.strictEqual(asyncApiElement.asyncapi.meta.get('metaKey').toValue(), 'metaValue');
        });
      });
    });
  });
});
