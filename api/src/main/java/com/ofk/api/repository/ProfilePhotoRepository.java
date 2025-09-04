package com.ofk.api.repository;

import com.ofk.api.entity.ProfilePhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfilePhotoRepository extends JpaRepository<ProfilePhoto, Long> {
    Optional<ProfilePhoto> findByUser_Id(String userId);
}
