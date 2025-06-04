package com.tech.Velora.user.application.dto;

import java.util.Set;
import java.util.UUID;

public record ReadUserDTO(UUID publicId,
                          String firstName,
                          String lastName,
                          String imageUrl,
                          Set<String> authorities) {
}
