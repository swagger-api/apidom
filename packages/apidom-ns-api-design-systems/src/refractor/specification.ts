import FallbackVisitor from './visitors/FallbackVisitor';
/**
 * API Design Systems 2021-05-07 specification elements.
 */
import RequirementLevelVisitor from './visitors/api-design-systems/requirement-level';
import StandardIdentifierVisitor from './visitors/api-design-systems/standard-identifier';
import RequirementVisitor from './visitors/api-design-systems/requirement';
import RequirementValuesVisitor from './visitors/api-design-systems/requirement/ValuesVisitor';
import RequirementFollowsVisitor from './visitors/api-design-systems/requirement/FollowsVisitor';
import ScenarioVisitor from './visitors/api-design-systems/scenario';
import ScenarioDescriptionVisitor from './visitors/api-design-systems/scenario/DescriptionVisitor';
import ScenarioThenVisitor from './visitors/api-design-systems/scenario/ThenVisitor';
import StandardVisitor from './visitors/api-design-systems/standard';
import StandardNameVisitor from './visitors/api-design-systems/standard/NameVisitor';
import StandardDescriptionVisitor from './visitors/api-design-systems/standard/DescriptionVisitor';
import StandardIriVisitor from './visitors/api-design-systems/standard/IriVisitor';
import PrincipleVisitor from './visitors/api-design-systems/principle';
import PrincipleNameVisitor from './visitors/api-design-systems/principle/NameVisitor';
import PrincipleDescriptionVisitor from './visitors/api-design-systems/principle/DescriptionVisitor';
import PrincipleIriVisitor from './visitors/api-design-systems/principle/IriVisitor';
import InfoVisitor from './visitors/api-design-systems/info';
import InfoTitleVisitor from './visitors/api-design-systems/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/api-design-systems/info/DescriptionVisitor';
import MainVisitor from './visitors/api-design-systems/main';
import MainVersionVisitor from './visitors/api-design-systems/main/VersionVisitor';
import MainPrinciplesVisitor from './visitors/api-design-systems/main/PrinciplesVisitor';
import MainStandardsVisitor from './visitors/api-design-systems/main/StandardsVisitor';
import MainScenariosVisitor from './visitors/api-design-systems/main/ScenariosVisitor';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
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
            version: MainVersionVisitor,
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
            title: InfoTitleVisitor,
            description: InfoDescriptionVisitor,
          },
        },
        Principle: {
          $visitor: PrincipleVisitor,
          fixedFields: {
            name: PrincipleNameVisitor,
            description: PrincipleDescriptionVisitor,
            iri: PrincipleIriVisitor,
            level: {
              $ref: '#/visitors/document/objects/RequirementLevel',
            },
          },
        },
        Standard: {
          $visitor: StandardVisitor,
          fixedFields: {
            name: StandardNameVisitor,
            description: StandardDescriptionVisitor,
            level: {
              $ref: '#/visitors/document/objects/RequirementLevel',
            },
            iri: StandardIriVisitor,
          },
        },
        Scenario: {
          $visitor: ScenarioVisitor,
          fixedFields: {
            description: ScenarioDescriptionVisitor,
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
            values: RequirementValuesVisitor,
            follows: RequirementFollowsVisitor,
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
