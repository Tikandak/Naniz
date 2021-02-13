package fr.naniz.naniz.service.mapper;

import fr.naniz.naniz.domain.Topic;
import fr.naniz.naniz.service.dto.TopicDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel ="spring")
public interface TopicMapper {

    TopicMapper INSTANCE = Mappers.getMapper(TopicMapper.class);

    @Mapping(source = "user.login", target = "user")
    @Mapping(source = "channel.name", target = "channel")
    @Mapping(source = "id", target = "id")
    TopicDTO topicToTopicDTO(Topic topic);

    @Mapping(source = "user", target = "user.login")
    @Mapping(source = "channel", target = "channel.name")
    @Mapping(source = "id", target = "id")
    Topic topicDTOToTopic(TopicDTO topicDTO);
}
