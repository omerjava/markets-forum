import Keycloak from 'keycloak-js';
import { environment } from '../../environments/environment';

export class KeycloakService {

  private keycloakUrl = `${environment.keycloakUrl}`;

  private keycloak = new Keycloak({
    url: this.keycloakUrl,
    realm: 'markets-forum',
    clientId: 'markets-client',
  });

  private authenticated = false;
  private initialized = false;
  private hasAdminRole = false;


  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      console.log('window.location.origin: ', window.location.origin)
      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/assets/silent-check-sso.html`,
        checkLoginIframe: false,
      });

      this.authenticated = authenticated;
      this.initialized = true;
      console.log('Keycloak initialized:', authenticated);

      if (authenticated) {
        this.updateRoleFlags();
      }
    } catch (error) {
      console.error('Keycloak init failed:', error);
    }
  }

  private updateRoleFlags(): void {
    const token = this.keycloak.tokenParsed;
    if (!token) {
      this.hasAdminRole = false;
      return;
    }

    const realmRoles: string[] = token.realm_access?.roles || [];
    const clientRoles: string[] = token.resource_access?.['markets-client']?.roles || [];
    console.log('realmRoles:', realmRoles);


    this.hasAdminRole = realmRoles.includes('ROLE_ADMIN') || clientRoles.includes('ROLE_ADMIN');
    console.log('Admin role detected:', this.hasAdminRole);
  }

  register(): void {
    this.keycloak.register({
      redirectUri: window.location.origin
    });
  }

  login(): void {
    this.keycloak.login({ redirectUri: window.location.origin });
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  isAdmin(): boolean {
    return this.hasAdminRole;
  }

  isLoggedIn(): boolean {
    return this.authenticated;
  }

  getUsername(): string {
    return this.keycloak.tokenParsed?.['preferred_username'] ?? '';
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  async getValidToken(): Promise<string | null> {
    try {
      await this.keycloak.updateToken(30); // refresh if expires in < 30s
      this.updateRoleFlags(); // re-check roles after refresh
      return this.keycloak.token ?? null;
    } catch (err) {
      console.error('Failed to refresh token', err);
      return null;
    }
  }

}
