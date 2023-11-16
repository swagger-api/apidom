import { assert } from 'chai';
import { ArrayElement } from '@swagger-api/apidom-core';

import {
  isWorkflowsSpecification1Element,
  isWorkflowsSpecElement,
  isInfoElement,
  isSourceDescriptionElement,
  WorkflowsSpecification1Element,
  WorkflowsSpecElement,
  InfoElement,
  SourceDescriptionElement,
} from '../src';

describe('predicates', function () {
  context('isWorkflowsSpecificationElement', function () {
    context('given WorkflowsSpecificationElement instance value', function () {
      specify('should return true', function () {
        const element = new WorkflowsSpecification1Element();

        assert.isTrue(isWorkflowsSpecification1Element(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class WorkflowsSpecificationSubElement extends WorkflowsSpecification1Element {}

        assert.isTrue(isWorkflowsSpecification1Element(new WorkflowsSpecificationSubElement()));
      });
    });

    context('given non isWorkflowsSpecificationElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isWorkflowsSpecification1Element(1));
        assert.isFalse(isWorkflowsSpecification1Element(null));
        assert.isFalse(isWorkflowsSpecification1Element(undefined));
        assert.isFalse(isWorkflowsSpecification1Element({}));
        assert.isFalse(isWorkflowsSpecification1Element([]));
        assert.isFalse(isWorkflowsSpecification1Element('string'));
      });
    });

    specify('should support duck-typing', function () {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const workflowsSpecificationElementDuck = {
        _storedElement: 'workflowsSpecification1',
        classes: new ArrayElement(['api', 'workflow']),
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

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

      assert.isTrue(isWorkflowsSpecification1Element(workflowsSpecificationElementDuck));
      assert.isFalse(isWorkflowsSpecification1Element(workflowsSpecificationElementSwan));
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
        classes: new ArrayElement(['info']),
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

  context('isSourceDescriptionElement', function () {
    context('given SourceDescriptionElement instance value', function () {
      specify('should return true', function () {
        const element = new SourceDescriptionElement();

        assert.isTrue(isSourceDescriptionElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class SourceDescriptionSubElement extends SourceDescriptionElement {}

        assert.isTrue(isSourceDescriptionElement(new SourceDescriptionSubElement()));
      });
    });

    context('given non SourceDescriptionElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSourceDescriptionElement(1));
        assert.isFalse(isSourceDescriptionElement(null));
        assert.isFalse(isSourceDescriptionElement(undefined));
        assert.isFalse(isSourceDescriptionElement({}));
        assert.isFalse(isSourceDescriptionElement([]));
        assert.isFalse(isSourceDescriptionElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const SourceDescriptionElementDuck = {
        _storedElement: 'sourceDescription',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const SourceDescriptionElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isSourceDescriptionElement(SourceDescriptionElementDuck));
      assert.isFalse(isSourceDescriptionElement(SourceDescriptionElementSwan));
    });
  });
});
