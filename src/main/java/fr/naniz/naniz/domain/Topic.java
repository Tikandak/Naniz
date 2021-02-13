package fr.naniz.naniz.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_topic")
@Getter
@Setter
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "image")
    private String image;

    @Column(name = "nombre_messages")
    private Integer nombreMessages;

    @Column(name = "activated")
    private Boolean activated;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "date_creation")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name="channel_id", referencedColumnName = "id")
    private Channel channel;
}
