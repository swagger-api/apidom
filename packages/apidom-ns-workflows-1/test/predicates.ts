import { assert } from 'chai';
import { ArrayElement } from '@swagger-api/apidom-core';

import {
  isWorkflowsSpecification1Element,
  isWorkflowsSpecElement,
  isInfoElement,
  isSourceDescriptionElement,
  isSourceDescriptionsElement,
  isParameterElement,
  isStepElement,
  isStepParametersElement,
  isStepDependenciesElement,
  isStepSuccessCriteriaElement,
  isStepSuccessActionsElement,
  isStepFailureActionsElement,
  isStepOutputsElement,
  isSuccessActionElement,
  isSuccessActionCriteriaElement,
  isFailureActionElement,
  isFailureActionCriteriaElement,
  isComponentsElement,
  isCriterionElement,
  isReferenceElement,
  WorkflowsSpecification1Element,
  WorkflowsSpecElement,
  InfoElement,
  SourceDescriptionElement,
  SourceDescriptionsElement,
  StepElement,
  StepParametersElement,
  StepDependenciesElement,
  StepSuccessActionsElement,
  StepFailureActionsElement,
  StepOutputsElement,
  StepSuccessCriteriaElement,
  ParameterElement,
  SuccessActionElement,
  SuccessActionCriteriaElement,
  FailureActionElement,
  FailureActionCriteriaElement,
  ComponentsElement,
  CriterionElement,
  ReferenceElement,
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

  context('isComponentsElement', function () {
    context('given ComponentsElement instance value', function () {
      specify('should return true', function () {
        const element = new ComponentsElement();

        assert.isTrue(isComponentsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ComponentsSubElement extends ComponentsElement {}

        assert.isTrue(isComponentsElement(new ComponentsSubElement()));
      });
    });

    context('given non ComponentsElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isComponentsElement(1));
        assert.isFalse(isComponentsElement(null));
        assert.isFalse(isComponentsElement(undefined));
        assert.isFalse(isComponentsElement({}));
        assert.isFalse(isComponentsElement([]));
        assert.isFalse(isComponentsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const componentsElementDuck = {
        _storedElement: 'components',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const componentsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isComponentsElement(componentsElementDuck));
      assert.isFalse(isComponentsElement(componentsElementSwan));
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

  context('isReferenceElement', function () {
    context('given ReferenceElement instance value', function () {
      specify('should return true', function () {
        const element = new ReferenceElement();

        assert.isTrue(isReferenceElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class ReferenceSubElement extends ReferenceElement {}

        assert.isTrue(isReferenceElement(new ReferenceSubElement()));
      });
    });

    context('given non ReferenceElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isReferenceElement(1));
        assert.isFalse(isReferenceElement(null));
        assert.isFalse(isReferenceElement(undefined));
        assert.isFalse(isReferenceElement({}));
        assert.isFalse(isReferenceElement([]));
        assert.isFalse(isReferenceElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const referenceElementDuck = {
        _storedElement: 'reference',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const referenceElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isReferenceElement(referenceElementDuck));
      assert.isFalse(isReferenceElement(referenceElementSwan));
    });
  });

  context('isStepElement', function () {
    context('given StepElement instance value', function () {
      specify('should return true', function () {
        const element = new StepElement();

        assert.isTrue(isStepElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        class StepSubElement extends StepElement {}

        assert.isTrue(isStepElement(new StepSubElement()));
      });
    });

    context('given non StepElementSubElement instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isStepElement(1));
        assert.isFalse(isStepElement(null));
        assert.isFalse(isStepElement(undefined));
        assert.isFalse(isStepElement({}));
        assert.isFalse(isStepElement([]));
        assert.isFalse(isStepElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const StepElementDuck = {
        _storedElement: 'step',
        _content: [],
        primitive() {
          return 'object';
        },
        get element() {
          return this._storedElement;
        },
      };

      const StepElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
        get length() {
          return 0;
        },
      };

      assert.isTrue(isStepElement(StepElementDuck));
      assert.isFalse(isStepElement(StepElementSwan));
    });
  });

  context('isStepParametersElement', function () {
    context('given StepParametersElement instance value', function () {
      specify('should return true', function () {
        const element = new StepParametersElement();

        assert.isTrue(isStepParametersElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class StepParametersSubElement extends StepParametersElement {}

        assert.isTrue(isStepParametersElement(new StepParametersSubElement()));
      });
    });

    context('given non StepParameters instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isStepParametersElement(1));
        assert.isFalse(isStepParametersElement(null));
        assert.isFalse(isStepParametersElement(undefined));
        assert.isFalse(isStepParametersElement({}));
        assert.isFalse(isStepParametersElement([]));
        assert.isFalse(isStepParametersElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const stepParametersElementDuck = {
        _storedElement: 'array',
        _content: [],
        classes: new ArrayElement(['step-parameters']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const stepParametersElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isStepParametersElement(stepParametersElementDuck));
      assert.isFalse(isStepParametersElement(stepParametersElementSwan));
    });
  });

  context('isStepDependenciesElement', function () {
    context('given StepDependenciesElement instance value', function () {
      specify('should return true', function () {
        const element = new StepDependenciesElement();

        assert.isTrue(isStepDependenciesElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class StepDependenciesSubElement extends StepDependenciesElement {}

        assert.isTrue(isStepDependenciesElement(new StepDependenciesSubElement()));
      });
    });

    context('given non StepDependencies instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isStepDependenciesElement(1));
        assert.isFalse(isStepDependenciesElement(null));
        assert.isFalse(isStepDependenciesElement(undefined));
        assert.isFalse(isStepDependenciesElement({}));
        assert.isFalse(isStepDependenciesElement([]));
        assert.isFalse(isStepDependenciesElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const stepDependenciesElementDuck = {
        _storedElement: 'array',
        _content: [],
        classes: new ArrayElement(['step-dependencies']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const stepDependenciesElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isStepDependenciesElement(stepDependenciesElementDuck));
      assert.isFalse(isStepDependenciesElement(stepDependenciesElementSwan));
    });
  });

  context('isStepSuccessCriteriaElement', function () {
    context('given StepSuccessCriteriaElement instance value', function () {
      specify('should return true', function () {
        const element = new StepSuccessCriteriaElement();

        assert.isTrue(isStepSuccessCriteriaElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class StepSuccessCriteriaSubElement extends StepSuccessCriteriaElement {}

        assert.isTrue(isStepSuccessCriteriaElement(new StepSuccessCriteriaSubElement()));
      });
    });

    context('given non StepSuccessCriteria instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isStepSuccessCriteriaElement(1));
        assert.isFalse(isStepSuccessCriteriaElement(null));
        assert.isFalse(isStepSuccessCriteriaElement(undefined));
        assert.isFalse(isStepSuccessCriteriaElement({}));
        assert.isFalse(isStepSuccessCriteriaElement([]));
        assert.isFalse(isStepSuccessCriteriaElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const stepSuccessCriteriaElementDuck = {
        _storedElement: 'array',
        _content: [],
        classes: new ArrayElement(['criteria', 'step-success-criteria']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const stepSuccessCriteriaElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isStepSuccessCriteriaElement(stepSuccessCriteriaElementDuck));
      assert.isFalse(isStepSuccessCriteriaElement(stepSuccessCriteriaElementSwan));
    });
  });

  context('isStepSuccessActionsElement', function () {
    context('given StepSuccessActionsElement instance value', function () {
      specify('should return true', function () {
        const element = new StepSuccessActionsElement();

        assert.isTrue(isStepSuccessActionsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class StepSuccessActionsSubElement extends StepSuccessActionsElement {}

        assert.isTrue(isStepSuccessActionsElement(new StepSuccessActionsSubElement()));
      });
    });

    context('given non StepSuccessActions instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isStepSuccessActionsElement(1));
        assert.isFalse(isStepSuccessActionsElement(null));
        assert.isFalse(isStepSuccessActionsElement(undefined));
        assert.isFalse(isStepSuccessActionsElement({}));
        assert.isFalse(isStepSuccessActionsElement([]));
        assert.isFalse(isStepSuccessActionsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const stepSuccessActionsElementDuck = {
        _storedElement: 'array',
        _content: [],
        classes: new ArrayElement(['step-success-actions']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const stepSuccessActionsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isStepSuccessActionsElement(stepSuccessActionsElementDuck));
      assert.isFalse(isStepSuccessActionsElement(stepSuccessActionsElementSwan));
    });
  });

  context('isStepFailureActionsElement', function () {
    context('given StepFailureActionsElement instance value', function () {
      specify('should return true', function () {
        const element = new StepFailureActionsElement();

        assert.isTrue(isStepFailureActionsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class StepFailureActionsSubElement extends StepFailureActionsElement {}

        assert.isTrue(isStepFailureActionsElement(new StepFailureActionsSubElement()));
      });
    });

    context('given non StepFailureActions instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isStepFailureActionsElement(1));
        assert.isFalse(isStepFailureActionsElement(null));
        assert.isFalse(isStepFailureActionsElement(undefined));
        assert.isFalse(isStepFailureActionsElement({}));
        assert.isFalse(isStepFailureActionsElement([]));
        assert.isFalse(isStepFailureActionsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const stepFailureActionsElementDuck = {
        _storedElement: 'array',
        _content: [],
        classes: new ArrayElement(['step-failure-actions']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const stepFailureActionsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isStepFailureActionsElement(stepFailureActionsElementDuck));
      assert.isFalse(isStepFailureActionsElement(stepFailureActionsElementSwan));
    });
  });

  context('isStepOutputsElement', function () {
    context('given StepOutputsElement instance value', function () {
      specify('should return true', function () {
        const element = new StepOutputsElement();

        assert.isTrue(isStepOutputsElement(element));
      });
    });

    context('given subtype instance value', function () {
      specify('should return true', function () {
        class StepOutputsSubElement extends StepOutputsElement {}

        assert.isTrue(isStepOutputsElement(new StepOutputsSubElement()));
      });
    });

    context('given non StepOutputs instance value', function () {
      specify('should return false', function () {
        assert.isFalse(isStepOutputsElement(1));
        assert.isFalse(isStepOutputsElement(null));
        assert.isFalse(isStepOutputsElement(undefined));
        assert.isFalse(isStepOutputsElement({}));
        assert.isFalse(isStepOutputsElement([]));
        assert.isFalse(isStepOutputsElement('string'));
      });
    });

    specify('should support duck-typing', function () {
      const stepOutputsElementDuck = {
        _storedElement: 'array',
        _content: [],
        classes: new ArrayElement(['step-outputs']),
        primitive() {
          return 'array';
        },
        get element() {
          return this._storedElement;
        },
      };

      const stepOutputsElementSwan = {
        _storedElement: undefined,
        _content: undefined,
        primitive() {
          return 'swan';
        },
      };

      assert.isTrue(isStepOutputsElement(stepOutputsElementDuck));
      assert.isFalse(isStepOutputsElement(stepOutputsElementSwan));
    });
  });
});
