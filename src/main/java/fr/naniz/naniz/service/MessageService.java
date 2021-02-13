package fr.naniz.naniz.service;

import fr.naniz.naniz.domain.Message;
import fr.naniz.naniz.domain.Topic;
import fr.naniz.naniz.domain.User;
import fr.naniz.naniz.repository.MessageRepository;
import fr.naniz.naniz.repository.TopicRepository;
import fr.naniz.naniz.repository.UserRepository;
import fr.naniz.naniz.service.dto.MessageDTO;
import fr.naniz.naniz.service.mapper.MessageMapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final MessageMapper messageMapper;

    @Override
    @Transactional
    public MessageDTO saveMessage(MessageDTO messageDTO) {
        if (StringUtils.isNotBlank(messageDTO.getSender()) && messageDTO.getTopic() != null){
            Optional<Topic> topic = topicRepository.findById(messageDTO.getTopic());
            Optional<User> user = userRepository.findOneByLogin(messageDTO.getSender());
            if (topic.isPresent() && user.isPresent()){
                Topic top = topic.get();
                Message message = messageMapper.messageDtoToMessage(messageDTO);
                message.setTopic(top);
                message.setUser(user.get());

                // incrémente le nombre de message du topic
                top.setNombreMessages(top.getNombreMessages() + 1);
                topicRepository.save(top);
                return messageMapper.messageToMessageDto(messageRepository.save(message));
            }
        }
        return null;
    }

    @Override
    public List<MessageDTO> getMessages(Long topic, int pageToLoad, int pageSize) {
        Page<Message> messages = messageRepository.findAllByTopicIdOrderByDateAsc(topic, PageRequest.of(pageToLoad, pageSize));
        List<MessageDTO> result = new ArrayList<>();
        messages.getContent().forEach(mess -> result.add(messageMapper.messageToMessageDto(mess)));
        return result;
    }
}
