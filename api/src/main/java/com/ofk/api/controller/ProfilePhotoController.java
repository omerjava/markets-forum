package com.ofk.api.controller;

import com.ofk.api.entity.ProfilePhoto;
import com.ofk.api.service.ProfilePhotoService;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/profile-photos")
@RequiredArgsConstructor
public class ProfilePhotoController {

    private final ProfilePhotoService photoService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadPhoto(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam("file") MultipartFile file) throws IOException {

        String userId = jwt.getClaimAsString("sub");
        ProfilePhoto saved = photoService.uploadProfilePhoto(userId, file);

        return ResponseEntity.ok(saved); // returns { id, url, contentType, user }
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getPhoto(@PathVariable String filename) throws IOException {
        return photoService.serveFile(filename);
    }
}

