package fr.naniz.naniz.constant;

import lombok.Getter;

/**
 * Enum définition les channels et leurs ids
 */
@Getter
public enum ChannelType {
    PUBLIC_CHANNEL(1),
    MEMBER_CHANNEL(2),
    PRIVATE_CHANNEL(3);

    private int id;

    ChannelType(int id){
        this.id = id;
    }
}
