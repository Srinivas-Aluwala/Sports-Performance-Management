package com.sportsmanagement.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(exclude = { "user" })
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Coaches")
@Builder
public class Coaches {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long coacheId;

    private String firstName;

    private String lastName;

    private String email;

    private String gender;

    private String category;

    private String birthDate;

    private String photoUrl;

    @OneToOne(mappedBy = "coache")
    private Users user;

}
