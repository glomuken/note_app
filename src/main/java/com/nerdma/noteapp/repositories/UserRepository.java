package com.nerdma.noteapp.repositories;

import com.nerdma.noteapp.models.UserModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Integer> {
    UserModel findByEmail(String email);
}

