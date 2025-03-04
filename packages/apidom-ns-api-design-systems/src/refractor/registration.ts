import { createRefractor } from './index.ts';
/**
 * API Design Systems 2021-05-07 specification elements.
 */
import MainElement from '../elements/Main.ts';
import InfoElement from '../elements/Info.ts';
import PrincipleElement from '../elements/Principle.ts';
import RequirementElement from '../elements/Requirement.ts';
import RequirementLevelElement from '../elements/RequirementLevel.ts';
import ScenarioElement from '../elements/Scenario.ts';
import StandardElement from '../elements/Standard.ts';
import StandardIdentifierElement from '../elements/StandardIdentifier.ts';

/**
 * API Design Systems 2021-05-07 specification elements.
 */
MainElement.refract = createRefractor(['visitors', 'document', 'objects', 'Main', '$visitor']);
InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
PrincipleElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Principle',
  '$visitor',
]);
RequirementElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Requirement',
  '$visitor',
]);
RequirementLevelElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'RequirementLevel',
  '$visitor',
]);
ScenarioElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Scenario',
  '$visitor',
]);
StandardElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Standard',
  '$visitor',
]);
StandardIdentifierElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'StandardIdentifier',
  '$visitor',
]);

export {
  MainElement,
  InfoElement,
  PrincipleElement,
  RequirementElement,
  RequirementLevelElement,
  ScenarioElement,
  StandardElement,
  StandardIdentifierElement,
};
