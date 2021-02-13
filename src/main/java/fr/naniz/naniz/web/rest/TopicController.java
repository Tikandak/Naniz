package fr.naniz.naniz.web.rest;

import fr.naniz.naniz.constant.ChannelType;
import fr.naniz.naniz.exception.NanizFunctionnalException;
import fr.naniz.naniz.security.AuthoritiesConstants;
import fr.naniz.naniz.security.SecurityUtils;
import fr.naniz.naniz.service.ITopicService;
import fr.naniz.naniz.service.dto.TopicDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class TopicController {

    private final ITopicService topicService;

    @GetMapping("/topics")
    public ResponseEntity<List<TopicDTO>> getActiveTopics(@RequestParam ChannelType channel,
                                                          @RequestParam int pageToLoad,
                                                          @RequestParam int pageSize,
                                                          @RequestParam String filter){
        return new ResponseEntity<>(topicService.getActiveTopics(channel, pageToLoad, pageSize, filter), HttpStatus.OK);
    }

    @PostMapping("/topics")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.MEMBER + "\")")
    public ResponseEntity<TopicDTO> createTopic(@RequestBody TopicDTO topic){
        TopicDTO newTopic;
        if (topic != null){
            try{
                Optional<String> login = SecurityUtils.getCurrentUserLogin();
                topic.setUser(login.orElse(null));
                newTopic = topicService.createNewTopic(topic);
            }catch(RuntimeException | NanizFunctionnalException e){
                log.debug("", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }else{
            log.debug("Le DTO pris en entrée est null!");
            return ResponseEntity.status( HttpStatus.PRECONDITION_FAILED).build();
        }
        return new ResponseEntity<>(newTopic, HttpStatus.OK);
    }
}
