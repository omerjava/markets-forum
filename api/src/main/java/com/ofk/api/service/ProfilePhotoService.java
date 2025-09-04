package com.ofk.api.service;

import com.ofk.api.entity.ProfilePhoto;
import com.ofk.api.repository.ProfilePhotoRepository;
import com.ofk.api.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;
import java.util.UUID;


@Service
public class ProfilePhotoService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${app.base-url}")
    private String baseUrl;

    private final ProfilePhotoRepository photoRepository;
    private final UserProfileRepository userProfileRepository;
    private Path uploadPath;

    public ProfilePhotoService(ProfilePhotoRepository photoRepository,
                               UserProfileRepository userProfileRepository) {
        this.photoRepository = photoRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @jakarta.annotation.PostConstruct
    public void init() throws IOException {
        this.uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
    }

    public ProfilePhoto uploadProfilePhoto(String userId, MultipartFile file) throws IOException {
        var userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("UserProfile not found: " + userId));

        // Generate unique filename
        String extension = getExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID().toString() + (extension.isEmpty() ? "" : "." + extension);
        Path targetLocation = uploadPath.resolve(filename);

        // Save to disk
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Build public URL (served later via controller)
        String fileUrl = baseUrl + "/api/profile-photos/" + filename;

        // Update or create ProfilePhoto entity
        Optional<ProfilePhoto> existing = photoRepository.findByUser_Id(userId);
        ProfilePhoto photo = existing.orElse(new ProfilePhoto());

        photo.setContentType(file.getContentType());
        photo.setUser(userProfile);
        photo.setUrl(fileUrl);

        return photoRepository.save(photo);
    }

    public ResponseEntity<Resource> serveFile(String filename) throws IOException {
        Path file = uploadPath.resolve(filename).normalize();
        Resource resource = new UrlResource(file.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        // Guess MIME type based on extension (simple approach)
        String contentType = Files.probeContentType(file);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                .body(resource);
    }

    private String getExtension(String filename) {
        if (filename != null && filename.contains(".")) {
            return filename.substring(filename.lastIndexOf(".") + 1);
        }
        return "";
    }
}