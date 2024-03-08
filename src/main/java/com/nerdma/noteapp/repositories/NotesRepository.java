package com.nerdma.noteapp.repositories;

import com.nerdma.noteapp.models.NotesModel;
import com.nerdma.noteapp.models.UserModel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public interface NotesRepository extends CrudRepository<NotesModel, Long> {
    Optional<NotesModel> findById(Long ID);
    @EntityGraph(attributePaths = "user")
    List<NotesModel> findByUser(UserModel user);

}
