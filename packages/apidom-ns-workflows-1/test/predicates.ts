import { assert } from 'chai';
import { ArrayElement } from '@swagger-api/apidom-core';

// import { isInfoElement } from '../src/predicates';
import {
  isWorkflowsSpecificationElement,
  isWorkflowsSpecElement,
  isInfoElement,
  WorkflowsSpecificationElement,
  WorkflowsSpecElement,
  InfoElement,
} from '../src';

describe('predicates', function () {
  context('isWorkflowsSpecificationElement', function () {
    context('given WorkflowsSpecificationElement instance value', function () {
      specify('should return true', function () {
        const element = new WorkflowsSpecificationElement();

        assert.isTrue(isWorkflowsSpecificationElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class WorkflowsSpecificationSubElement extends WorkflowsSpecificationElement {}

        assert.isTrue(isWorkflowsSpecificationElement(new WorkflowsSpecificationSubElement()));
      });
    });

    context('given non isWorkflowsSpecificationElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isWorkflowsSpecificationElement(1));
        assert.isFalse(isWorkflowsSpecificationElement(null));
        assert.isFalse(isWorkflowsSpecificationElement(undefined));
        assert.isFalse(isWorkflowsSpecificationElement({}));
        assert.isFalse(isWorkflowsSpecificationElement([]));
        assert.isFalse(isWorkflowsSpecificationElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const workflowsSpecificationElementDuck = {
        _storedElement: 'workflowsSpecification',
        classes: new ArrayElement(['workflow']),
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const workflowsSpecificationElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isWorkflowsSpecificationElement(workflowsSpecificationElementDuck));
      assert.isFalse(isWorkflowsSpecificationElement(workflowsSpecificationElementSwan));
    });
  });

  context('isInfoElement', function () {
    context('given InfoElement instance value', function () {
      specify('should return true', function () {
        const element = new InfoElement();

        assert.isTrue(isInfoElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class InfoSubElement extends InfoElement {}

        assert.isTrue(isInfoElement(new InfoSubElement()));
      });
    });

    context('given non InfoElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isInfoElement(1));
        assert.isFalse(isInfoElement(null));
        assert.isFalse(isInfoElement(undefined));
        assert.isFalse(isInfoElement({}));
        assert.isFalse(isInfoElement([]));
        assert.isFalse(isInfoElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const infoElementDuck = {
        _storedElement: 'info',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const infoElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isInfoElement(infoElementDuck));
      assert.isFalse(isInfoElement(infoElementSwan));
    });
  });

  context('isWorkflowsSpecElement', function () {
    context('given WorkflowsSpecElement instance value', function () {
      specify('should return true', function () {
        const element = new WorkflowsSpecElement();

        assert.isTrue(isWorkflowsSpecElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class WorkflowsSpecSubElement extends WorkflowsSpecElement {}

        assert.isTrue(isWorkflowsSpecElement(new WorkflowsSpecSubElement()));
      });
    });

    context('given non OpenapiElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isWorkflowsSpecElement(1));
        assert.isFalse(isWorkflowsSpecElement(null));
        assert.isFalse(isWorkflowsSpecElement(undefined));
        assert.isFalse(isWorkflowsSpecElement({}));
        assert.isFalse(isWorkflowsSpecElement([]));
        assert.isFalse(isWorkflowsSpecElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const workflowsSpecElementDuck = {
        _storedElement: 'workflowsSpec',
        _content: '',
        primitive() {
          return 'string';
        },
        get element() {
          return this._storedElement;
        },
      };

      const workflowsSpecElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isWorkflowsSpecElement(workflowsSpecElementDuck));
      assert.isFalse(isWorkflowsSpecElement(workflowsSpecElementSwan));
    });
  });
});
