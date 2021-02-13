package fr.naniz.naniz.service;

import fr.naniz.naniz.constant.ChannelType;
import fr.naniz.naniz.domain.Channel;
import fr.naniz.naniz.domain.Topic;
import fr.naniz.naniz.domain.User;
import fr.naniz.naniz.exception.NanizFunctionnalException;
import fr.naniz.naniz.repository.ChannelRepository;
import fr.naniz.naniz.repository.TopicRepository;
import fr.naniz.naniz.repository.UserRepository;
import fr.naniz.naniz.service.dto.TopicDTO;
import fr.naniz.naniz.service.mapper.TopicMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TopicService implements ITopicService {

    private final TopicRepository topicRepository;

    private final ChannelRepository channelRepository;

    private final UserRepository userRepository;

    @Autowired
    public TopicService(TopicRepository topicRepository, ChannelRepository channelRepository, UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.channelRepository = channelRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<TopicDTO> getActiveTopics(ChannelType channel, int pageToLoad, int pageSize, String filter) {
        Optional<Channel> chan = channelRepository.findByName(channel.toString());
        if (chan.isPresent()){
            List<Topic> topics;
            if (StringUtils.isNotBlank(filter)){
                topics = topicRepository.findAllActiveByChannelFilterOnTitleAndDescription(chan.get(), true, filter,
                    PageRequest.of(pageToLoad, pageSize));
            }else{
                topics = topicRepository.findAllByChannelAndActivatedOrderByDateDesc(chan.get(), true,
                    PageRequest.of(pageToLoad, pageSize));
            }

            return topics.stream().filter(Objects::nonNull)
                .map(TopicMapper.INSTANCE::topicToTopicDTO)
                .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public TopicDTO createNewTopic(TopicDTO topicDTO) throws NanizFunctionnalException {
        Optional<User> user = userRepository.findOneByLogin(topicDTO.getUser());
        Optional<Channel> channel = channelRepository.findByName(topicDTO.getChannel());
        Topic topic = TopicMapper.INSTANCE.topicDTOToTopic(topicDTO);
        if (user.isPresent() && channel.isPresent()){
            topic.setActivated(true);
            topic.setDate(LocalDateTime.now(ZoneId.of("Europe/Paris")));
            topic.setNombreMessages(0);
            topic.setImage("");
            topic.setChannel(channel.get());
            topic.setUser(user.get());
            topicRepository.save(topic);
            topicRepository.flush();
        }else{
            String msg = "Utilisateur ou Channel introuvables";
            log.debug(msg);
            throw new NanizFunctionnalException(msg);
        }
        return TopicMapper.INSTANCE.topicToTopicDTO(topic);
    }
}
