package com.ofk.api.controller;

import com.ofk.api.dto.ForumThreadRequest;
import com.ofk.api.entity.ForumThread;
import com.ofk.api.service.ForumThreadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/threads")
public class ForumThreadController {

    private final ForumThreadService service;

    public ForumThreadController(ForumThreadService service) {
        this.service = service;
    }

    @GetMapping
    public List<ForumThread> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForumThread> getById(@PathVariable Long id) {
        ForumThread thread = service.getById(id);
        return thread != null ? ResponseEntity.ok(thread) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ForumThread> create(@RequestBody ForumThreadRequest request) {
        ForumThread created = service.create(request);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ForumThread> update(@PathVariable Long id, @RequestBody ForumThreadRequest request) {
        ForumThread updated = service.update(id, request);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
