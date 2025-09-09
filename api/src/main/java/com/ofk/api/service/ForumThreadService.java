package com.ofk.api.service;

import com.ofk.api.dto.ForumThreadRequest;
import com.ofk.api.entity.Category;
import com.ofk.api.entity.ForumThread;
import com.ofk.api.entity.UserProfile;
import com.ofk.api.repository.CategoryRepository;
import com.ofk.api.repository.ForumThreadRepository;
import com.ofk.api.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ForumThreadService {

    private final ForumThreadRepository repository;
    private final CategoryRepository categoryRepository;
    private final UserProfileRepository userProfileRepository;

    public ForumThreadService(
            ForumThreadRepository repository,
            CategoryRepository categoryRepository,
            UserProfileRepository userProfileRepository
    ) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.userProfileRepository = userProfileRepository;
    }

    public List<ForumThread> getAll() {
        return repository.findAll();
    }

    public ForumThread getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public ForumThread create(ForumThreadRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        UserProfile user = userProfileRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ForumThread thread = ForumThread.builder()
                .title(request.title())
                .category(category)
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return repository.save(thread);
    }

    public ForumThread update(Long id, ForumThreadRequest request) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(request.title());
            existing.setUpdatedAt(LocalDateTime.now());
            return repository.save(existing);
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
