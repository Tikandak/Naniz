package fr.naniz.naniz.service.mapper;

import fr.naniz.naniz.domain.Message;
import fr.naniz.naniz.service.dto.MessageDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel ="spring")
public interface MessageMapper {

    @Mapping(source = "user.login", target = "sender")
    @Mapping(source = "user.imageUrl", target = "avatar")
    @Mapping(source = "topic.id", target = "topic")
    MessageDTO messageToMessageDto(Message message);

    @Mapping(source = "sender", target = "user.login")
    @Mapping(source = "avatar", target = "user.imageUrl")
    @Mapping(source = "topic", target = "topic.id")
    Message messageDtoToMessage(MessageDTO message);
}
