package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import ru.itmo.dws.itmotrip.generated.models.UserRequest
import ru.itmo.dws.itmotrip.model.User
import ru.itmo.dws.itmotrip.model.exception.UserNotFoundException
import ru.itmo.dws.itmotrip.repository.UserRepository
import java.util.UUID

@Service
class UserService(
    private val userRepository: UserRepository
) {

    fun getByIsuId(isu: String): User? {
        return userRepository.getByIsuId(isu)
    }

    fun getById(id: UUID): User {
        return userRepository.getById(id) ?: throw UserNotFoundException(id)
    }

    @Transactional
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

    @Transactional
    fun patchById(id: UUID, userPatchRequest: UserRequest): User {
        userRepository.patchByUserId(id, userPatchRequest.bio, userPatchRequest.socialNetworkUsername)
        return userRepository.getById(id) ?: throw UserNotFoundException(id)
    }
}
