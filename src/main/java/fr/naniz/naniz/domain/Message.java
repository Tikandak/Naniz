package fr.naniz.naniz.domain;

import fr.naniz.naniz.constant.TypeMessage;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_message")
@Getter
@Setter
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text", columnDefinition = "TEXT")
    private String text;

    @Column(name = "files", length = 1000)
    private String files;

    @Column(name = "date_creation")
    private LocalDateTime date;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TypeMessage type;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name="topic_id", referencedColumnName = "id")
    private Topic topic;
}
