package fr.naniz.naniz.service.dto;

import fr.naniz.naniz.constant.TypeMessage;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

/**
 * Représentation d'un message tel qu'afficher dans les channels en front
 */
@Getter
@Setter
@ToString
public class MessageDTO {

    private Long id;

    private String text;

    private String files;

    private LocalDateTime date;

    private TypeMessage type;

    private String sender;

    private String avatar;

    private Long topic;

    private boolean reply;
}
