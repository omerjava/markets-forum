package com.ofk.api.service;


import com.ofk.api.entity.Tag;
import com.ofk.api.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    private final TagRepository repository;

    public TagService(TagRepository repository) {
        this.repository = repository;
    }

    public List<Tag> getAll() {
        return repository.findAll();
    }

    public Tag getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Tag create(Tag tag) {
        return repository.save(tag);
    }

    public Tag update(Long id, Tag tag) {
        Optional<Tag> existing = repository.findById(id);
        if (existing.isPresent()) {
            tag.setId(id);
            return repository.save(tag);
        }
        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
