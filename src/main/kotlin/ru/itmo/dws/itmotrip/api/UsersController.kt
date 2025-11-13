package ru.itmo.dws.itmotrip.api

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.context.request.NativeWebRequest
import ru.itmo.dws.itmotrip.generated.apis.MeApiDelegate
import ru.itmo.dws.itmotrip.generated.apis.UsersApiDelegate
import ru.itmo.dws.itmotrip.generated.models.UserRequest
import ru.itmo.dws.itmotrip.generated.models.UserResponse
import ru.itmo.dws.itmotrip.mapper.toUserResponse
import ru.itmo.dws.itmotrip.service.UserService
import ru.itmo.dws.itmotrip.util.getCurrentUserFromSecurityContext
import java.util.Optional
import java.util.UUID

@Component
class UsersController(private val userService: UserService) : UsersApiDelegate, MeApiDelegate {

    // just to help kotlin choose between two delegates
    override fun getRequest(): Optional<NativeWebRequest> = Optional.empty()

    override fun apiV1MeGet(): ResponseEntity<UserResponse> {
        val user = getCurrentUserFromSecurityContext()
        return ResponseEntity.ok(user.toUserResponse())
    }

    override fun apiV1UsersIdGet(id: UUID): ResponseEntity<UserResponse> {
        val user = userService.getById(id)
        return ResponseEntity.ok(user)
    }

    override fun apiV1UsersIdPatch(id: UUID, userRequest: UserRequest): ResponseEntity<UserResponse> {
        val currentUser = getCurrentUserFromSecurityContext()

        if (id != currentUser.id) {
            return ResponseEntity.status(403).build()
        }

        val user = userService.patchById(id, userRequest)
        return ResponseEntity.ok(user.toUserResponse())
    }
}
