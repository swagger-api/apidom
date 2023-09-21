import {
  AnnotationElement,
  Element,
  isArrayElement,
  toValue,
  cloneDeep,
} from '@swagger-api/apidom-core';
import { NotImplementedError } from '@swagger-api/apidom-error';
import {
  OpenApi3_1Element,
  OperationElement,
  ResponseElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

import MainElement from '../../elements/Main';
import ScenarioElement from '../../elements/Scenario';
import RequirementElement from '../../elements/Requirement';
import RequirementLevelElement from '../../elements/RequirementLevel';
import StandardIdentifier from '../../elements/StandardIdentifier';
import select from './selector';
import access from './accessor';
import { may } from './requirement-level';

const makeMessage = (
  value: Element,
  requirementLevel: RequirementLevelElement,
  standardIdentifier: StandardIdentifier,
) => {
  const primitiveValue = toValue(value);
  const primitiveStandardIdentifier = JSON.stringify(toValue(standardIdentifier));

  if (toValue(requirementLevel) === 'may') {
    return `"${primitiveValue}" not allowed for subject ${primitiveStandardIdentifier}`;
  }

  throw new NotImplementedError(
    '[Requirement levels] other than "may" are currently not implemented.',
  );
};

// @ts-ignore
const makeAnnotation = (message: string, value, level, standardIdentifier) => {
  const annotation = new AnnotationElement(message);
  annotation.classes.push(level);
  annotation.attributes.set('value', cloneDeep(value));
  annotation.attributes.set('standardIdentifier', cloneDeep(standardIdentifier));
  return annotation;
};

const validateValue = (value: Element, requirement: RequirementElement) => {
  const annotations: AnnotationElement[] = [];
  const { subject } = requirement;

  if (typeof requirement.values === 'undefined') return annotations;

  if (toValue(requirement.level) === 'may') {
    const isValid = may(toValue(value), toValue(requirement.values));
    if (!isValid) {
      const message = makeMessage(value, requirement.level, subject);
      const annotation = makeAnnotation(message, value, 'error', subject);

      annotations.push(annotation);
    }
  }

  return annotations;
};

const validateRequirement = (
  requirement: RequirementElement,
  selected: OperationElement | ResponseElement,
) => {
  const { subject } = requirement;
  const values = access(selected, subject);
  const annotations: AnnotationElement[] = [];

  values.forEach((value) => {
    annotations.push(...validateValue(value, requirement));
  });

  return annotations;
};

const validateScenario = (scenario: ScenarioElement, openApiElement: OpenApi3_1Element) => {
  const annotations: AnnotationElement[] = [];
  const { when } = scenario;
  const selected = select(openApiElement, when);
  const { then: requirements } = scenario;

  if (typeof requirements === 'undefined') return annotations;

  selected.forEach((item) => {
    // @ts-ignore
    requirements.forEach((requirement: RequirementElement) => {
      annotations.push(...validateRequirement(requirement, item));
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
