package com.sportsmanagement.VO.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusVO {

    private Integer statusId;
    private String statusMessage;

}
