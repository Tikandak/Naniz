package fr.naniz.naniz.service;

import fr.naniz.naniz.service.dto.MessageDTO;

import java.util.List;

public interface IMessageService {
    /**
     * Sauvegarde le message pris en entrée en bdd
     * @param messageDTO - le message
     * @return
     */
    MessageDTO saveMessage(MessageDTO messageDTO);

    /**
     * Charge la liste des messages du topic pris en entrée
     * @param topic - le topic
     * @param pageToLoad - la page à charger
     * @param pageSize - la taille de page
     * @return
     */
    List<MessageDTO> getMessages(Long topic, int pageToLoad, int pageSize);
}
