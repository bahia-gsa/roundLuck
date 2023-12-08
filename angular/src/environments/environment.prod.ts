export const environment = {
  production: true,
  baseUrlQuarkus: 'http://localhost:5050',
  keycloak: {
    issuer: 'http://localhost:8080',
    realm: 'draw',
    clientId: 'angular-draw',
  },
};
