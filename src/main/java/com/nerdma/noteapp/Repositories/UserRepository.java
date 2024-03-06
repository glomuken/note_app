package com.nerdma.noteapp.Repositories;

import com.nerdma.noteapp.Models.UserModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Integer> {
    UserModel findByEmail(String email);
}

