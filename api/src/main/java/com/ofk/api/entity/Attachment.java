package com.ofk.api.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "attachments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileUrl;
    private String fileType;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}
