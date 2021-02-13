package fr.naniz.naniz.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Représentation d'un topic, vision front
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TopicDTO {
    private Long id;
    private String title;
    private String description;
    private String content;
    private String image;
    private Integer nombreMessages;
    private Boolean activated;
    private String user;
    private String date;
    private String channel;
}
