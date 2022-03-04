import { AnnotationElement, Element, isArrayElement } from '@swagger-api/apidom-core';
import { OpenApi3_1Element, OperationElement } from '@swagger-api/apidom-ns-openapi-3-1';

import MainElement from '../../elements/Main';
import ScenarioElement from '../../elements/Scenario';
import RequirementElement from '../../elements/Requirement';
import select from './selector';
import access from './accessor';
import { may } from './requirement-level';

const formatLocation = <T extends Element>(element: T) => {
  if (!element.meta.hasKey('sourceMap')) return '';

  const sourceMap = element.meta.get('sourceMap');
  const [line, column] = sourceMap.get(0).toValue();

  return ` on line ${line}, column ${column}`;
};

const validateValue = (value: Element, requirement: RequirementElement) => {
  const annotations: AnnotationElement[] = [];
  const { subject } = requirement;

  if (typeof requirement.values === 'undefined') return annotations;

  if (requirement.level.toValue() === 'may') {
    const isValid = may(value.toValue(), requirement.values.toValue());
    if (!isValid) {
      const annotation = new AnnotationElement(
        `"${value.toValue()}" not allowed for subject ${JSON.stringify(
          subject.toValue(),
        )}${formatLocation(value)}`,
      );
      annotation.classes.push('error');
      annotations.push(annotation);
    }
  }

  return annotations;
};

const validateRequirement = (requirement: RequirementElement, operation: OperationElement) => {
  const { subject } = requirement;
  const values = access(operation, subject);
  const annotations: AnnotationElement[] = [];

  values.forEach((value) => {
    annotations.push(...validateValue(value, requirement));
  });

  return annotations;
};

const validateScenario = (scenario: ScenarioElement, openApiElement: OpenApi3_1Element) => {
  const annotations: AnnotationElement[] = [];
  const { when } = scenario;
  const operations = select(openApiElement, when);
  const { then: requirements } = scenario;

  if (typeof requirements === 'undefined') return annotations;

  operations.forEach((operation: OperationElement) => {
    // @ts-ignore
    requirements.forEach((requirement: RequirementElement) => {
      annotations.push(...validateRequirement(requirement, operation));
    });
  });

  return annotations;
};

const validate = (mainElement: MainElement, openApiElement: OpenApi3_1Element) => {
  const { scenarios } = mainElement;
  const annotations: AnnotationElement[] = [];

  if (typeof scenarios === 'undefined' || !isArrayElement(scenarios)) return [];

  // @ts-ignore
  scenarios.forEach((scenario: ScenarioElement) => {
    annotations.push(...validateScenario(scenario, openApiElement));
  });

  return annotations;
};

export default validate;
