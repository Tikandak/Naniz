package fr.naniz.naniz.web.rest;

import fr.naniz.naniz.service.IMessageService;
import fr.naniz.naniz.service.dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MessageWebSocketController {

    private final SimpMessagingTemplate template;

    private final IMessageService messageService;

    @MessageMapping("/topic/message/notify/{topic}")
    public void sendMessage(@Payload MessageDTO message, @DestinationVariable Long topic) {
        log.info("Send \"" + message.toString() + "\" to " + topic);
        MessageDTO savedMessage = messageService.saveMessage(message);
        template.convertAndSend("/topic/message/push/" + topic, savedMessage != null ? savedMessage : message);
    }
}
