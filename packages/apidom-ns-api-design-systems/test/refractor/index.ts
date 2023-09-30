import fs from 'node:fs';
import path from 'node:path';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { ObjectElement, Namespace, toValue } from '@swagger-api/apidom-core';

import * as predicates from '../../src/predicates';
import { MainElement } from '../../src';

describe('refractor', function () {
  context('given generic ApiDOM object in API Design Systems 2021-05-07 shape', function () {
    specify('should refract to API Design Systems', function () {
      const apiDesignSystemsString = fs
        .readFileSync(path.join(__dirname, 'fixtures', 'api-design-systems.json'))
        .toString();
      const apiDesignSystemsApiPojo = JSON.parse(apiDesignSystemsString);
      const genericObjectElement = new ObjectElement(apiDesignSystemsApiPojo);
      const mainElement = MainElement.refract(genericObjectElement);

      expect(mainElement).toMatchSnapshot();
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
          MainElement(element: MainElement) {
            // @ts-ignore
            element.version = 'unknown'; // eslint-disable-line no-param-reassign
          },
        },
        post() {},
      };
      plugin2Spec = {
        name: 'plugin2',
        pre() {},
        visitor: {
          MainElement(element: MainElement) {
            // @ts-ignore
            element.version.meta.set('metaKey', 'metaValue');
          },
        },
        post() {},
      };
      plugin1 = sinon.spy(() => plugin1Spec);
      plugin2 = sinon.spy(() => plugin2Spec);

      sinon.spy(plugin1Spec, 'pre');
      sinon.spy(plugin1Spec, 'post');
      sinon.spy(plugin1Spec.visitor, 'MainElement');

      sinon.spy(plugin2Spec, 'pre');
      sinon.spy(plugin2Spec, 'post');
      sinon.spy(plugin2Spec.visitor, 'MainElement');
    });

    context('plugin', function () {
      specify('should be called with toolbox object', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.hasAllKeys(plugin1.firstCall.args[0], ['predicates', 'namespace']);
      });

      specify('should have predicates in toolbox object', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.hasAnyKeys(plugin1.firstCall.args[0].predicates, Object.keys(predicates));
      });

      specify('should have namespace in toolbox object', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.instanceOf(plugin1.firstCall.args[0].namespace, Namespace);
      });
    });

    context('pre hook', function () {
      specify('should call it once', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.isTrue(plugin1Spec.pre.calledOnce);
      });

      specify('should call it before other plugin pre hook', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.pre));
      });

      specify('should call it before visiting', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin1Spec.visitor.MainElement));
        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.visitor.MainElement));
      });
    });

    context('post hook', function () {
      specify('should call it once', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.isTrue(plugin1Spec.post.calledOnce);
      });

      specify('should call it before other plugin post hook', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.post.calledBefore(plugin2Spec.post));
      });

      specify('should call it after visiting', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.post.calledAfter(plugin1Spec.visitor.MainElement));
        assert.isTrue(plugin1Spec.post.calledAfter(plugin2Spec.visitor.MainElement));
      });
    });

    context('visitor', function () {
      specify('should be called once', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.visitor.MainElement.calledOnce);
        assert.isTrue(plugin2Spec.visitor.MainElement.calledOnce);
      });

      specify('should be called in proper order', function () {
        const genericObject = new ObjectElement({
          version: '2021-05-07',
        });
        MainElement.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(
          plugin1Spec.visitor.MainElement.calledBefore(plugin2Spec.visitor.MainElement),
        );
      });

      context('first plugin', function () {
        specify('should receive arguments', function () {
          const genericObject = new ObjectElement({
            version: '2021-05-07',
          });
          MainElement.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.lengthOf(plugin1Spec.visitor.MainElement.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          const genericObject = new ObjectElement({
            version: '2021-05-07',
          });
          MainElement.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.isTrue(
            predicates.isMainElement(plugin1Spec.visitor.MainElement.firstCall.args[0]),
          );
        });

        specify('should augment version', function () {
          const genericObject = new ObjectElement({
            version: '2021-05-07',
          });
          const mainElement = MainElement.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.deepEqual(toValue(mainElement), { version: 'unknown' });
        });
      });

      context('second plugin', function () {
        specify('should receive arguments', function () {
          const genericObject = new ObjectElement({
            version: '2021-05-07',
          });
          MainElement.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          assert.lengthOf(plugin2Spec.visitor.MainElement.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          const genericObject = new ObjectElement({
            version: '2021-05-07',
          });
          MainElement.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          assert.isTrue(
            predicates.isMainElement(plugin2Spec.visitor.MainElement.firstCall.args[0]),
          );
        });

        specify('should append metadata to version', function () {
          const genericObject = new ObjectElement({
            version: '2021-05-07',
          });
          const mainElement = MainElement.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          // @ts-ignore
          assert.strictEqual(toValue(mainElement.version.meta.get('metaKey')), 'metaValue');
        });
      });
    });
  });
});
