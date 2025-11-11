package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.repository.UserRepositoryStub

@Service
class UserService(
    private val userRepositoryStub: UserRepositoryStub
) {

    fun findOrCreateByIsu(isu: Int): User {
        return userRepositoryStub.findOrCreateByIsu(isu)
    }

    fun findUserById(isu: Int): User {
        return userRepositoryStub.findUserById(isu)
    }
}