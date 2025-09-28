package com.tasktracer.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.EnumSet;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter @ToString @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

}
