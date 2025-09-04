package com.ofk.api.service;


import com.ofk.api.entity.Attachment;
import com.ofk.api.repository.AttachmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttachmentService {
    private final AttachmentRepository repository;

    public AttachmentService(AttachmentRepository repository) {
        this.repository = repository;
    }

    public List<Attachment> getAll() {
        return repository.findAll();
    }

    public Attachment getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Attachment create(Attachment attachment) {
        return repository.save(attachment);
    }

    public Attachment update(Long id, Attachment attachment) {
        Optional<Attachment> existing = repository.findById(id);
        if (existing.isPresent()) {
            attachment.setId(id);
            return repository.save(attachment);
        }
        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
