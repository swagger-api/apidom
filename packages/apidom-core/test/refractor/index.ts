import { assert, expect } from 'chai';
import sinon from 'sinon';
import { Namespace } from 'minim';

import * as predicates from '../../src/predicates';
import { ObjectElement, isObjectElement, toValue } from '../../src';

describe('refractor', function () {
  context('given POJO in object literal shape', function () {
    specify('should refract to Object Element', function () {
      const pojo = { a: 'b' };
      const objectElement = ObjectElement.refract(pojo);

      expect(objectElement).toMatchSnapshot();
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
          ObjectElement(element: ObjectElement) {
            // eslint-disable-next-line no-param-reassign
            element.getMember('a').value = 'c';
          },
        },
        post() {},
      };
      plugin2Spec = {
        name: 'plugin2',
        pre() {},
        visitor: {
          ObjectElement(element: ObjectElement) {
            element.meta.set('metaKey', 'metaValue');
          },
        },
        post() {},
      };
      plugin1 = sinon.spy(() => plugin1Spec);
      plugin2 = sinon.spy(() => plugin2Spec);

      sinon.spy(plugin1Spec, 'pre');
      sinon.spy(plugin1Spec, 'post');
      sinon.spy(plugin1Spec.visitor, 'ObjectElement');

      sinon.spy(plugin2Spec, 'pre');
      sinon.spy(plugin2Spec, 'post');
      sinon.spy(plugin2Spec.visitor, 'ObjectElement');
    });

    context('plugin', function () {
      specify('should be called with toolbox object', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1],
          },
        );

        assert.hasAllKeys(plugin1.firstCall.args[0], ['predicates', 'namespace']);
      });

      specify('should have predicates in toolbox object', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1],
          },
        );

        assert.hasAnyKeys(plugin1.firstCall.args[0].predicates, Object.keys(predicates));
      });

      specify('should have namespace in toolbox object', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1],
          },
        );

        assert.instanceOf(plugin1.firstCall.args[0].namespace, Namespace);
      });
    });

    context('pre hook', function () {
      specify('should call it once', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1],
          },
        );

        assert.isTrue(plugin1Spec.pre.calledOnce);
      });

      specify('should call it before other plugin pre hook', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1, plugin2],
          },
        );

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.pre));
      });

      specify('should call it before visiting', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1, plugin2],
          },
        );

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin1Spec.visitor.ObjectElement));
        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.visitor.ObjectElement));
      });
    });

    context('post hook', function () {
      specify('should call it once', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1],
          },
        );

        assert.isTrue(plugin1Spec.post.calledOnce);
      });

      specify('should call it before other plugin post hook', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1, plugin2],
          },
        );

        assert.isTrue(plugin1Spec.post.calledBefore(plugin2Spec.post));
      });

      specify('should call it after visiting', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1, plugin2],
          },
        );

        assert.isTrue(plugin1Spec.post.calledAfter(plugin1Spec.visitor.ObjectElement));
        assert.isTrue(plugin1Spec.post.calledAfter(plugin2Spec.visitor.ObjectElement));
      });
    });

    context('visitor', function () {
      specify('should be called once', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1, plugin2],
          },
        );

        assert.isTrue(plugin1Spec.visitor.ObjectElement.calledOnce);
        assert.isTrue(plugin2Spec.visitor.ObjectElement.calledOnce);
      });

      specify('should be called in proper order', function () {
        ObjectElement.refract(
          { a: 'b' },
          {
            plugins: [plugin1, plugin2],
          },
        );

        assert.isTrue(
          plugin1Spec.visitor.ObjectElement.calledBefore(plugin2Spec.visitor.ObjectElement),
        );
      });

      context('first plugin', function () {
        specify('should receive arguments', function () {
          ObjectElement.refract(
            { a: 'b' },
            {
              plugins: [plugin1],
            },
          );

          assert.lengthOf(plugin1Spec.visitor.ObjectElement.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          ObjectElement.refract(
            { a: 'b' },
            {
              plugins: [plugin1],
            },
          );

          assert.isTrue(isObjectElement(plugin1Spec.visitor.ObjectElement.firstCall.args[0]));
        });

        specify('should augment object element data', function () {
          const objectElement = ObjectElement.refract(
            { a: 'b' },
            {
              plugins: [plugin1],
            },
          );

          assert.deepEqual(toValue(objectElement), { a: 'c' });
        });
      });

      context('second plugin', function () {
        specify('should receive arguments', function () {
          ObjectElement.refract(
            { a: 'b' },
            {
              plugins: [plugin1, plugin2],
            },
          );

          assert.lengthOf(plugin2Spec.visitor.ObjectElement.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          ObjectElement.refract(
            { a: 'b' },
            {
              plugins: [plugin1, plugin2],
            },
          );

          assert.isTrue(isObjectElement(plugin2Spec.visitor.ObjectElement.firstCall.args[0]));
        });

        specify('should append metadata', function () {
          const objectElement = ObjectElement.refract(
            { a: 'b' },
            {
              plugins: [plugin1, plugin2],
            },
          );

          assert.strictEqual(toValue(objectElement.meta.get('metaKey')), 'metaValue');
        });
      });
    });
  });
});
