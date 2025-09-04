package com.ofk.api.repository;

import com.ofk.api.entity.ForumThread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumThreadRepository extends JpaRepository<ForumThread, Long> {
}
