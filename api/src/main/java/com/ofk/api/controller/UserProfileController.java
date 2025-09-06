package com.ofk.api.controller;

import com.ofk.api.entity.Role;
import com.ofk.api.entity.UserProfile;
import com.ofk.api.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user-profiles")
public class UserProfileController {

    private final UserProfileService service;

    public UserProfileController(UserProfileService service) {
        this.service = service;
    }

    // Fetch all profiles (optional: admin-only)
    @GetMapping
    public List<UserProfile> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getById(@PathVariable String id) {
        UserProfile profile = service.getById(id);
        return profile != null ? ResponseEntity.ok(profile) : ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public UserProfile getMyProfile(JwtAuthenticationToken auth) {
        String userId = auth.getName(); // Keycloak 'sub'
        String username = (String) auth.getTokenAttributes().get("preferred_username");
        String email = (String) auth.getTokenAttributes().get("email");

        // Extract realm roles safely
        Object realmAccessObj = auth.getTokenAttributes().get("realm_access");
        List<String> realmRoles = List.of();

        if (realmAccessObj instanceof Map<?, ?> realmAccess) {
            Object rolesObj = realmAccess.get("roles");
            if (rolesObj instanceof List<?> rolesList) {
                realmRoles = rolesList.stream()
                        .filter(String.class::isInstance)
                        .map(String.class::cast)
                        .toList();
            }
        }

        // Convert to Enum (fallback to ROLE_USER if none found)
        List<Role> roles = realmRoles.stream()
                .filter(r -> r.startsWith("ROLE_"))
                .map(Role::valueOf)
                .toList();

        if (roles.isEmpty()) {
            roles = List.of(Role.ROLE_USER);
        }

        return service.getOrCreate(userId, username, email, roles);
    }




    @PutMapping("/me")
    public ResponseEntity<UserProfile> updateMyProfile(JwtAuthenticationToken auth,
                                                       @RequestBody UserProfile profile) {
        String userId = auth.getName();
        UserProfile updated = service.update(userId, profile);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMyProfile(JwtAuthenticationToken auth) {
        String userId = auth.getName();
        service.delete(userId);
        return ResponseEntity.noContent().build();
    }
}
