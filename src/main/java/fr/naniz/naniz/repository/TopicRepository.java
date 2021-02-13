package fr.naniz.naniz.repository;

import fr.naniz.naniz.domain.Channel;
import fr.naniz.naniz.domain.Topic;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the {@link Topic} entity.
 */
@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    @Query("select t from Topic t where t.channel = ?1 and t.activated = ?2 and (lower(t.title) like lower(concat('%', ?3, '%')) " +
        "or lower(t.description) like lower(concat('%', ?3, '%'))) order by t.date desc")
    List<Topic> findAllActiveByChannelFilterOnTitleAndDescription(Channel channel, Boolean activacted, String filter, Pageable page);

    List<Topic> findAllByChannelAndActivatedOrderByDateDesc(Channel channel, Boolean activacted, Pageable page);
}
