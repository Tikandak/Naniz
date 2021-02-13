package fr.naniz.naniz.service;

import fr.naniz.naniz.constant.ChannelType;
import fr.naniz.naniz.exception.NanizFunctionnalException;
import fr.naniz.naniz.service.dto.TopicDTO;

import java.util.List;

public interface ITopicService {

    /**
     * Recupère la liste de tous les topics actifs du channel pris en entrée
     * @param channel - le channel
     * @param pageToLoad - la page à charger
     * @param pageSize - la taille de page
     * @param filter - filtre de recherche
     * @return java.util.List
     */
    List<TopicDTO> getActiveTopics(ChannelType channel, int pageToLoad, int pageSize, String filter);

    /**
     * Crée le topic pris en entrée
     * @param topic - le topic à créer;
     * @return TopicDTO
     */
    TopicDTO createNewTopic(TopicDTO topic) throws NanizFunctionnalException;
}
