import { NamespacePluginOptions } from '@swagger-api/apidom-core';

/**
 * API Design Systems 2021-05-07 specification elements.
 */
import InfoElement from './elements/Info';
import MainElement from './elements/Main';
import PrincipleElement from './elements/Principle';
import RequirementElement from './elements/Requirement';
import RequirementLevelElement from './elements/RequirementLevel';
import ScenarioElement from './elements/Scenario';
import StandardElement from './elements/Standard';
import StandardIdentifierElement from './elements/StandardIdentifier';

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
