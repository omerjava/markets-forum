package com.ofk.api.service;


import com.ofk.api.entity.ForumThread;
import com.ofk.api.repository.ForumThreadRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumThreadService {
    private final ForumThreadRepository repository;

    public ForumThreadService(ForumThreadRepository repository) {
        this.repository = repository;
    }

    public List<ForumThread> getAll() {
        return repository.findAll();
    }

    public ForumThread getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public ForumThread create(ForumThread thread) {
        return repository.save(thread);
    }

    public ForumThread update(Long id, ForumThread updated) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setCategory(updated.getCategory());
            return repository.save(existing);
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
