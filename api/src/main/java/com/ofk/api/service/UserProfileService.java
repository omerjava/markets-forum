package com.ofk.api.service;

import com.ofk.api.entity.UserProfile;
import com.ofk.api.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) {
        this.repository = repository;
    }

    // Automatically create profile if not exists
    public UserProfile getOrCreate(String userId, String username, String email) {
        return repository.findById(userId)
                .orElseGet(() -> {
                    UserProfile profile = new UserProfile();
                    profile.setId(userId);
                    profile.setUsername(username);
                    profile.setEmail(email);
                    profile.setCreatedAt(LocalDateTime.now());
                    return repository.save(profile);
                });
    }

    public List<UserProfile> getAll() {
        return repository.findAll();
    }

    public UserProfile getById(String id) {
        return repository.findById(id).orElse(null);
    }

    public UserProfile update(String id, UserProfile profile) {
        return repository.findById(id).map(existing -> {
            existing.setUsername(profile.getUsername());
            existing.setEmail(profile.getEmail());
            existing.setRoles(profile.getRoles());
            return repository.save(existing);
        }).orElse(null);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
