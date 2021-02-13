package fr.naniz.naniz.repository;

import fr.naniz.naniz.domain.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the {@link Channel} entity.
 */
@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {

    Optional<Channel> findByName(String name);
}
