package com.ofk.api.controller;


import com.ofk.api.entity.Tag;
import com.ofk.api.service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagService service;

    public TagController(TagService service) {
        this.service = service;
    }

    @GetMapping
    public List<Tag> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tag> getById(@PathVariable Long id) {
        Tag tag = service.getById(id);
        return tag != null ? ResponseEntity.ok(tag) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Tag create(@RequestBody Tag tag) {
        return service.create(tag);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tag> update(@PathVariable Long id, @RequestBody Tag tag) {
        Tag updated = service.update(id, tag);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
