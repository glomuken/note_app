package com.nerdma.noteapp.Models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "notes")
@Data
public class NotesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    @Column(name = "note", nullable = false)
    private String note;


    public String getNote() {
        return this.note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setUser(UserModel user) {
        this.user =user;
    }
}

