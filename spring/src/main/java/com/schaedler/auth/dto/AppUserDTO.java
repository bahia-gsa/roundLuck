package com.schaedler.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppUserDTO {
    private Long id;
    private String name;
    private String email;
}
