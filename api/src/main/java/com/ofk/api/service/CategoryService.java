package com.ofk.api.service;


import com.ofk.api.entity.Category;
import com.ofk.api.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<Category> getAll() {
        return repository.findAll();
    }

    public Category getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Category create(Category category) {
        return repository.save(category);
    }

    public Category update(Long id, Category updated) {
        return repository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            return repository.save(existing);
        }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
