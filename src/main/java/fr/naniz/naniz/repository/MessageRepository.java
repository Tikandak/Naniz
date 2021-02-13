package fr.naniz.naniz.repository;

import fr.naniz.naniz.domain.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findAllByTopicIdOrderByDateAsc(Long topicId, Pageable page);
}
