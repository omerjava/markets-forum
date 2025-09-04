package com.ofk.api.service;

import com.ofk.api.entity.Post;
import com.ofk.api.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public List<Post> getAll() {
        return repository.findAll();
    }

    public Post getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Post create(Post post) {
        return repository.save(post);
    }

    public Post update(Long id, Post updated) {
        return repository.findById(id).map(existing -> {
            existing.setContent(updated.getContent());
            existing.setThread(updated.getThread());
            return repository.save(existing);
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
