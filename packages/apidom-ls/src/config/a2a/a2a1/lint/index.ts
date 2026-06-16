import allowedFieldsLint from './allowed-fields.ts';
import nameTypeLint from './name--type.ts';
import descriptionTypeLint from './description--type.ts';
import urlTypeLint from './url--type.ts';
import versionTypeLint from './version--type.ts';
import iconUrlTypeLint from './icon-url--type.ts';
import documentationUrlTypeLint from './documentation-url--type.ts';
import providerTypeLint from './provider--type.ts';
import capabilitiesTypeLint from './capabilities--type.ts';
import defaultInputModesTypeLint from './default-input-modes--type.ts';
import defaultOutputModesTypeLint from './default-output-modes--type.ts';
import supportedInterfacesTypeLint from './supported-interfaces--type.ts';
import skillsTypeLint from './skills--type.ts';
import securitySchemesTypeLint from './security-schemes--type.ts';
import securityRequirementsTypeLint from './security-requirements--type.ts';
import signaturesTypeLint from './signatures--type.ts';

const lints = [
  allowedFieldsLint,
  nameTypeLint,
  descriptionTypeLint,
  urlTypeLint,
  versionTypeLint,
  iconUrlTypeLint,
  documentationUrlTypeLint,
  providerTypeLint,
  capabilitiesTypeLint,
  defaultInputModesTypeLint,
  defaultOutputModesTypeLint,
  supportedInterfacesTypeLint,
  skillsTypeLint,
  securitySchemesTypeLint,
  securityRequirementsTypeLint,
  signaturesTypeLint,
];

export default lints;
