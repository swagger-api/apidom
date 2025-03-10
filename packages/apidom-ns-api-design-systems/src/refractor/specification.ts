import FallbackVisitor from './visitors/FallbackVisitor.ts';
/**
 * API Design Systems 2021-05-07 specification elements.
 */
import RequirementLevelVisitor from './visitors/api-design-systems/requirement-level/index.ts';
import StandardIdentifierVisitor from './visitors/api-design-systems/standard-identifier/index.ts';
import RequirementVisitor from './visitors/api-design-systems/requirement/index.ts';
import ScenarioVisitor from './visitors/api-design-systems/scenario/index.ts';
import ScenarioThenVisitor from './visitors/api-design-systems/scenario/ThenVisitor.ts';
import StandardVisitor from './visitors/api-design-systems/standard/index.ts';
import PrincipleVisitor from './visitors/api-design-systems/principle/index.ts';
import InfoVisitor from './visitors/api-design-systems/info/index.ts';
import MainVisitor from './visitors/api-design-systems/main/index.ts';
import MainPrinciplesVisitor from './visitors/api-design-systems/main/PrinciplesVisitor.ts';
import MainStandardsVisitor from './visitors/api-design-systems/main/StandardsVisitor.ts';
import MainScenariosVisitor from './visitors/api-design-systems/main/ScenariosVisitor.ts';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 * @public
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        /**
         * API Design Systems 2021-05-07 specification elements.
         */
        Main: {
          $visitor: MainVisitor,
          fixedFields: {
            version: { $ref: '#/visitors/value' },
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            principles: MainPrinciplesVisitor,
            standards: MainStandardsVisitor,
            scenarios: MainScenariosVisitor,
          },
        },
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
          },
        },
        Principle: {
          $visitor: PrincipleVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            iri: { $ref: '#/visitors/value' },
            level: {
              $ref: '#/visitors/document/objects/RequirementLevel',
            },
          },
        },
        Standard: {
          $visitor: StandardVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            level: {
              $ref: '#/visitors/document/objects/RequirementLevel',
            },
            iri: { $ref: '#/visitors/value' },
          },
        },
        Scenario: {
          $visitor: ScenarioVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            when: {
              $ref: '#/visitors/document/objects/StandardIdentifier',
            },
            then: ScenarioThenVisitor,
          },
        },
        Requirement: {
          $visitor: RequirementVisitor,
          fixedFields: {
            subject: {
              $ref: '#/visitors/document/objects/StandardIdentifier',
            },
            level: {
              $ref: '#/visitors/document/objects/RequirementLevel',
            },
            values: { $ref: '#/visitors/value' },
            follows: { $ref: '#/visitors/value' },
          },
        },
        StandardIdentifier: {
          $visitor: StandardIdentifierVisitor,
        },
        RequirementLevel: {
          $visitor: RequirementLevelVisitor,
        },
      },
    },
  },
};

export default specification;
