import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'my-app',
  clientId: 'react-client'
});

export default keycloak;