import { assert } from 'chai';
import { ArrayElement } from '@swagger-api/apidom-core';

import {
  isWorkflowsSpecification1Element,
  isWorkflowsSpecElement,
  isInfoElement,
  isSourceDescriptionElement,
  isSourceDescriptionsElement,
  isParameterElement,
  isSuccessActionElement,
  isSuccessActionCriteriaElement,
  isFailureActionElement,
  isFailureActionCriteriaElement,
  isCriterionElement,
  WorkflowsSpecification1Element,
  WorkflowsSpecElement,
  InfoElement,
  SourceDescriptionElement,
  SourceDescriptionsElement,
  ParameterElement,
  SuccessActionElement,
  SuccessActionCriteriaElement,
  FailureActionElement,
  FailureActionCriteriaElement,
  CriterionElement,
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

  context('isSourceDescriptionsElement', function () {
    context('given SourceDescriptionsElement instance value', function () {
      specify('should return true', function () {
        const element = new SourceDescriptionsElement();

        assert.isTrue(isSourceDescriptionsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class SourceDescriptionsSubElement extends SourceDescriptionsElement {}

        assert.isTrue(isSourceDescriptionsElement(new SourceDescriptionsSubElement()));
      });
    });

    context('given non SourceDescriptions instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSourceDescriptionsElement(1));
        assert.isFalse(isSourceDescriptionsElement(null));
        assert.isFalse(isSourceDescriptionsElement(undefined));
        assert.isFalse(isSourceDescriptionsElement({}));
        assert.isFalse(isSourceDescriptionsElement([]));
        assert.isFalse(isSourceDescriptionsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const sourceDescriptionsElementDuck = {
        _storedElement: 'sourceDescriptions',
        _content: [],
        classes: new ArrayElement(['sourceDescriptions']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const sourceDescriptionsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isSourceDescriptionsElement(sourceDescriptionsElementDuck));
      assert.isFalse(isSourceDescriptionsElement(sourceDescriptionsElementSwan));
    });
  });

  context('isCriterionElement', function () {
    context('given CriterionElement instance value', function () {
      specify('should return true', function () {
        const element = new CriterionElement();

        assert.isTrue(isCriterionElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class CriterionSubElement extends CriterionElement {}

        assert.isTrue(isCriterionElement(new CriterionSubElement()));
      });
    });

    context('given non CriterionSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isCriterionElement(1));
        assert.isFalse(isCriterionElement(null));
        assert.isFalse(isCriterionElement(undefined));
        assert.isFalse(isCriterionElement({}));
        assert.isFalse(isCriterionElement([]));
        assert.isFalse(isCriterionElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const CriterionElementDuck = {
        _storedElement: 'criterion',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const CriterionElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isCriterionElement(CriterionElementDuck));
      assert.isFalse(isCriterionElement(CriterionElementSwan));
    });
  });

  context('isCriteriaElement', function () {
    context('given CriteriaElement instance value', function () {
      specify('should return true', function () {
        const element = new SuccessActionCriteriaElement();

        assert.isTrue(isSuccessActionCriteriaElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class SuccessActionCriteriaSubElement extends SuccessActionCriteriaElement {}

        assert.isTrue(isSuccessActionCriteriaElement(new SuccessActionCriteriaSubElement()));
      });
    });

    context('given non Criteria instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSuccessActionCriteriaElement(1));
        assert.isFalse(isSuccessActionCriteriaElement(null));
        assert.isFalse(isSuccessActionCriteriaElement(undefined));
        assert.isFalse(isSuccessActionCriteriaElement({}));
        assert.isFalse(isSuccessActionCriteriaElement([]));
        assert.isFalse(isSuccessActionCriteriaElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const criteriaElementDuck = {
        _storedElement: 'array',
        _content: [],
        classes: new ArrayElement(['criteria', 'success-action-criteria']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const criteriaElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isSuccessActionCriteriaElement(criteriaElementDuck));
      assert.isFalse(isSuccessActionCriteriaElement(criteriaElementSwan));
    });
  });

  context('isParameterElement', function () {
    context('given ParameterElement instance value', function () {
      specify('should return true', function () {
        const element = new ParameterElement();

        assert.isTrue(isParameterElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class ParameterSubElement extends ParameterElement {}

        assert.isTrue(isParameterElement(new ParameterSubElement()));
      });
    });

    context('given non ParameterSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isParameterElement(1));
        assert.isFalse(isParameterElement(null));
        assert.isFalse(isParameterElement(undefined));
        assert.isFalse(isParameterElement({}));
        assert.isFalse(isParameterElement([]));
        assert.isFalse(isParameterElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const ParameterElementDuck = {
        _storedElement: 'parameter',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const ParameterElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isParameterElement(ParameterElementDuck));
      assert.isFalse(isParameterElement(ParameterElementSwan));
    });
  });

  context('isSuccessActionElement', function () {
    context('given SuccessActionElement instance value', function () {
      specify('should return true', function () {
        const element = new SuccessActionElement();

        assert.isTrue(isSuccessActionElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class SuccessActionSubElement extends SuccessActionElement {}

        assert.isTrue(isSuccessActionElement(new SuccessActionSubElement()));
      });
    });

    context('given non SuccessActionSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isSuccessActionElement(1));
        assert.isFalse(isSuccessActionElement(null));
        assert.isFalse(isSuccessActionElement(undefined));
        assert.isFalse(isSuccessActionElement({}));
        assert.isFalse(isSuccessActionElement([]));
        assert.isFalse(isSuccessActionElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const SuccessActionElementDuck = {
        _storedElement: 'successAction',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const SuccessActionElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isSuccessActionElement(SuccessActionElementDuck));
      assert.isFalse(isSuccessActionElement(SuccessActionElementSwan));
    });
  });

  context('isFailureActionCriteriaElement', function () {
    context('given FailureActionCriteriaElement instance value', function () {
      specify('should return true', function () {
        const element = new FailureActionCriteriaElement();

        assert.isTrue(isFailureActionCriteriaElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class FailureActionCriteriaSubElement extends FailureActionCriteriaElement {}

        assert.isTrue(isFailureActionCriteriaElement(new FailureActionCriteriaSubElement()));
      });
    });

    context('given non Criteria instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isFailureActionCriteriaElement(1));
        assert.isFalse(isFailureActionCriteriaElement(null));
        assert.isFalse(isFailureActionCriteriaElement(undefined));
        assert.isFalse(isFailureActionCriteriaElement({}));
        assert.isFalse(isFailureActionCriteriaElement([]));
        assert.isFalse(isFailureActionCriteriaElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const criteriaElementDuck = {
        _storedElement: 'array',
        _content: [],
        classes: new ArrayElement(['criteria', 'failure-action-criteria']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const criteriaElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isFailureActionCriteriaElement(criteriaElementDuck));
      assert.isFalse(isFailureActionCriteriaElement(criteriaElementSwan));
    });
  });

  context('isFailureActionElement', function () {
    context('given FailureActionElement instance value', function () {
      specify('should return true', function () {
        const element = new FailureActionElement();

        assert.isTrue(isFailureActionElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class FailureActionSubElement extends FailureActionElement {}

        assert.isTrue(isFailureActionElement(new FailureActionSubElement()));
      });
    });

    context('given non FailureActionSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isFailureActionElement(1));
        assert.isFalse(isFailureActionElement(null));
        assert.isFalse(isFailureActionElement(undefined));
        assert.isFalse(isFailureActionElement({}));
        assert.isFalse(isFailureActionElement([]));
        assert.isFalse(isFailureActionElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const FailureActionElementDuck = {
        _storedElement: 'failureAction',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const FailureActionElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isFailureActionElement(FailureActionElementDuck));
      assert.isFalse(isFailureActionElement(FailureActionElementSwan));
    });
  });
});
