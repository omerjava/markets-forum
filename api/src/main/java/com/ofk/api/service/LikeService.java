package com.ofk.api.service;


import com.ofk.api.entity.Like;
import com.ofk.api.repository.LikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {
    private final LikeRepository repository;

    public LikeService(LikeRepository repository) {
        this.repository = repository;
    }

    public List<Like> getAll() {
        return repository.findAll();
    }

    public Like getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Like create(Like like) {
        return repository.save(like);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
