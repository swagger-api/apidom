export const OpenAPI2 = [{ namespace: 'openapi', version: '2.0' }];

export const OpenAPI300 = [{ namespace: 'openapi', version: '3.0.0' }];
export const OpenAPI301 = [{ namespace: 'openapi', version: '3.0.1' }];
export const OpenAPI302 = [{ namespace: 'openapi', version: '3.0.2' }];
export const OpenAPI303 = [{ namespace: 'openapi', version: '3.0.3' }];

export const OpenAPI30 = [...OpenAPI300, ...OpenAPI301, ...OpenAPI302, ...OpenAPI303];
export const OpenAPI31 = [{ namespace: 'openapi', version: '3.1.0' }];
export const OpenAPI3 = [...OpenAPI30, ...OpenAPI31];

export const OpenAPI = [...OpenAPI2, ...OpenAPI3];
