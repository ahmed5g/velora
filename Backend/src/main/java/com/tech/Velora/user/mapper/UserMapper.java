package com.tech.Velora.user.mapper;

import com.tech.Velora.user.application.dto.ReadUserDTO;
import com.tech.Velora.user.domain.Authority;
import com.tech.Velora.user.domain.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    ReadUserDTO readUserDTOToUser(User user);

    default String mapAuthoritiesToString(Authority authority) {
        return authority.getName();
    }

}