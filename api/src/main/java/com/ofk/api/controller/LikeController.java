package com.ofk.api.controller;


import com.ofk.api.entity.Like;
import com.ofk.api.service.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    private final LikeService service;

    public LikeController(LikeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Like> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Like> getById(@PathVariable Long id) {
        Like like = service.getById(id);
        return like != null ? ResponseEntity.ok(like) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Like create(@RequestBody Like like) {
        return service.create(like);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
