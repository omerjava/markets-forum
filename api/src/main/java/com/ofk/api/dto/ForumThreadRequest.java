package com.ofk.api.dto;

public record ForumThreadRequest(
        String title,
        String userId,
        Long categoryId
) {}