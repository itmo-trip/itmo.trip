package ru.itmo.dws.itmotrip.service

import java.util.UUID
import org.springframework.stereotype.Service
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository
) {

    fun insert(user: User) {
        userRepository.insert(
            user.studentId,
            user.faculty,
            user.firstName,
            user.middleName,
            user.lastName,
            user.socialNetworkUsername,
            user.avatarUrl,
            user.bio,
        )
    }

    fun getByIsuId(isu: String): User? {
        return userRepository.getByIsuId(isu)
    }

    fun getById(id: UUID): User {
        return userRepository.getById(id)
            ?: throw RuntimeException("Не нашли пользователя по id=$id")
    }
}