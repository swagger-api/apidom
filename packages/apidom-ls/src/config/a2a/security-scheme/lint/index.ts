import allowedFieldsLint from './allowed-fields.ts';
import apiKeySecuritySchemeLint from './api-key-security-scheme--type.ts';
import httpAuthSecuritySchemeLint from './http-auth-security-scheme--type.ts';
import mtlsSecuritySchemeLint from './mtls-security-scheme--type.ts';
import oauth2SecuritySchemeLint from './oauth2-security-scheme--type.ts';
import openIdConnectSecuritySchemeLint from './open-id-connect-security-scheme--type.ts';

const lints = [
  allowedFieldsLint,
  apiKeySecuritySchemeLint,
  httpAuthSecuritySchemeLint,
  mtlsSecuritySchemeLint,
  oauth2SecuritySchemeLint,
  openIdConnectSecuritySchemeLint,
];

export default lints;
