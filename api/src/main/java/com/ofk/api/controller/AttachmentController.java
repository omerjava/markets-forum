package com.ofk.api.controller;


import com.ofk.api.entity.Attachment;
import com.ofk.api.service.AttachmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {
    private final AttachmentService service;

    public AttachmentController(AttachmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Attachment> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attachment> getById(@PathVariable Long id) {
        Attachment attachment = service.getById(id);
        return attachment != null ? ResponseEntity.ok(attachment) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Attachment create(@RequestBody Attachment attachment) {
        return service.create(attachment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attachment> update(@PathVariable Long id, @RequestBody Attachment attachment) {
        Attachment updated = service.update(id, attachment);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
