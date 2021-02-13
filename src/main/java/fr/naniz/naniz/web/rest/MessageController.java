package fr.naniz.naniz.web.rest;

import fr.naniz.naniz.security.AuthoritiesConstants;
import fr.naniz.naniz.service.IMessageService;
import fr.naniz.naniz.service.dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class MessageController {
    private final IMessageService messageService;

    @GetMapping("/messages")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.MEMBER + "\")")
    public ResponseEntity<List<MessageDTO>> getMessages(@RequestParam Long topic, @RequestParam int pageToLoad,
                                                        @RequestParam int pageSize){
        return new ResponseEntity<>(messageService.getMessages(topic, pageToLoad, pageSize), HttpStatus.OK);
    }
}
