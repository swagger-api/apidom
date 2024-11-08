import { NamespacePluginOptions } from '@swagger-api/apidom-core';

/**
 * API Design Systems 2021-05-07 specification elements.
 */
import InfoElement from './elements/Info.ts';
import MainElement from './elements/Main.ts';
import PrincipleElement from './elements/Principle.ts';
import RequirementElement from './elements/Requirement.ts';
import RequirementLevelElement from './elements/RequirementLevel.ts';
import ScenarioElement from './elements/Scenario.ts';
import StandardElement from './elements/Standard.ts';
import StandardIdentifierElement from './elements/StandardIdentifier.ts';

const apiDesignSystems = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    /**
     * API Design Systems 2021-05-07 specification elements.
     */
    base.register('info', InfoElement);
    base.register('main', MainElement);
    base.register('principle', PrincipleElement);
    base.register('requirement', RequirementElement);
    base.register('requirementLevel', RequirementLevelElement);
    base.register('scenario', ScenarioElement);
    base.register('standard', StandardElement);
    base.register('standardIdentifier', StandardIdentifierElement);

    return base;
  },
};

export default apiDesignSystems;
