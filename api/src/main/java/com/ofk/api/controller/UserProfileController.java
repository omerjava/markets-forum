package com.ofk.api.controller;

import com.ofk.api.entity.UserProfile;
import com.ofk.api.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // Get or create current user's profile
    @GetMapping("/me")
    public UserProfile getMyProfile(JwtAuthenticationToken auth) {
        String userId = auth.getName(); // Keycloak 'sub'
        String username = (String) auth.getTokenAttributes().get("preferred_username");
        String email = (String) auth.getTokenAttributes().get("email");
        return service.getOrCreate(userId, username, email);
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
