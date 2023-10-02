import fs from 'node:fs';
import path from 'node:path';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { ObjectElement, toValue, Namespace } from '@swagger-api/apidom-core';

import { OpenApi3_1Element, OpenapiElement, isOpenapiElement } from '../../src';
import * as predicates from '../../src/predicates';

describe('refractor', function () {
  context('given generic ApiDOM object in OpenApi 3.1 shape', function () {
    specify('should refract to OpenApi 3.1 Element', function () {
      const openApiString = fs
        .readFileSync(path.join(__dirname, 'fixtures', 'openapi.json'))
        .toString();
      const openApiPojo = JSON.parse(openApiString);
      const genericObjectElement = new ObjectElement(openApiPojo);
      const openApiElement = OpenApi3_1Element.refract(genericObjectElement);

      expect(openApiElement).toMatchSnapshot();
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
          OpenapiElement(element: OpenapiElement) {
            // @ts-ignore
            element.content = '3.1.1'; // eslint-disable-line no-param-reassign
          },
        },
        post() {},
      };
      plugin2Spec = {
        name: 'plugin2',
        pre() {},
        visitor: {
          OpenapiElement(element: OpenapiElement) {
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
      sinon.spy(plugin1Spec.visitor, 'OpenapiElement');

      sinon.spy(plugin2Spec, 'pre');
      sinon.spy(plugin2Spec, 'post');
      sinon.spy(plugin2Spec.visitor, 'OpenapiElement');
    });

    context('plugin', function () {
      specify('should be called with toolbox object', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.hasAllKeys(plugin1.firstCall.args[0], ['predicates', 'namespace']);
      });

      specify('should have predicates in toolbox object', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.hasAnyKeys(plugin1.firstCall.args[0].predicates, Object.keys(predicates));
      });

      specify('should have namespace in toolbox object', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.instanceOf(plugin1.firstCall.args[0].namespace, Namespace);
      });
    });

    context('pre hook', function () {
      specify('should call it once', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.isTrue(plugin1Spec.pre.calledOnce);
      });

      specify('should call it before other plugin pre hook', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.pre));
      });

      specify('should call it before visiting', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.pre.calledBefore(plugin1Spec.visitor.OpenapiElement));
        assert.isTrue(plugin1Spec.pre.calledBefore(plugin2Spec.visitor.OpenapiElement));
      });
    });

    context('post hook', function () {
      specify('should call it once', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1],
        });

        assert.isTrue(plugin1Spec.post.calledOnce);
      });

      specify('should call it before other plugin post hook', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.post.calledBefore(plugin2Spec.post));
      });

      specify('should call it after visiting', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.post.calledAfter(plugin1Spec.visitor.OpenapiElement));
        assert.isTrue(plugin1Spec.post.calledAfter(plugin2Spec.visitor.OpenapiElement));
      });
    });

    context('visitor', function () {
      specify('should be called once', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(plugin1Spec.visitor.OpenapiElement.calledOnce);
        assert.isTrue(plugin2Spec.visitor.OpenapiElement.calledOnce);
      });

      specify('should be called in proper order', function () {
        const genericObject = new ObjectElement({
          openapi: '3.1.0',
        });
        OpenApi3_1Element.refract(genericObject, {
          plugins: [plugin1, plugin2],
        });

        assert.isTrue(
          plugin1Spec.visitor.OpenapiElement.calledBefore(plugin2Spec.visitor.OpenapiElement),
        );
      });

      context('first plugin', function () {
        specify('should receive arguments', function () {
          const genericObject = new ObjectElement({
            openapi: '3.1.0',
          });
          OpenApi3_1Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.lengthOf(plugin1Spec.visitor.OpenapiElement.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          const genericObject = new ObjectElement({
            openapi: '3.1.0',
          });
          OpenApi3_1Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.isTrue(isOpenapiElement(plugin1Spec.visitor.OpenapiElement.firstCall.args[0]));
        });

        specify('should augment openapi version', function () {
          const genericObject = new ObjectElement({
            openapi: '3.1.0',
          });
          const openApiElement = OpenApi3_1Element.refract(genericObject, {
            plugins: [plugin1],
          });

          assert.deepEqual(toValue(openApiElement), { openapi: '3.1.1' });
        });
      });

      context('second plugin', function () {
        specify('should receive arguments', function () {
          const genericObject = new ObjectElement({
            openapi: '3.1.0',
          });
          OpenApi3_1Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          assert.lengthOf(plugin2Spec.visitor.OpenapiElement.firstCall.args, 5);
        });

        specify('should receive node as first argument', function () {
          const genericObject = new ObjectElement({
            openapi: '3.1.0',
          });
          OpenApi3_1Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          assert.isTrue(isOpenapiElement(plugin2Spec.visitor.OpenapiElement.firstCall.args[0]));
        });

        specify('should append metadata to openapi version', function () {
          const genericObject = new ObjectElement({
            openapi: '3.1.0',
          });
          const openApiElement = OpenApi3_1Element.refract(genericObject, {
            plugins: [plugin1, plugin2],
          });

          // @ts-ignore
          assert.strictEqual(toValue(openApiElement.openapi.meta.get('metaKey')), 'metaValue');
        });
      });
    });
  });
});
