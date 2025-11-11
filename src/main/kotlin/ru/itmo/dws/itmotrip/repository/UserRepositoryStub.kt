package ru.itmo.dws.itmotrip.repository

import org.springframework.stereotype.Repository
import ru.itmo.dws.itmotrip.model.User

@Repository
class UserRepositoryStub {
    private val users: MutableMap<Int, User> = mutableMapOf()

    fun findOrCreateByIsu(isu: Int): User {
        if (users.containsKey(isu)) {
            return users[isu]!!
        }

        val user = User(isu)
        users[isu] = user
        return user
    }

    fun findUserById(id: Int): User {
        return users[id] ?: error("User with id $id not found.")
    }
}