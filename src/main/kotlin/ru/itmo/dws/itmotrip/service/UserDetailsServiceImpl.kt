package ru.itmo.dws.itmotrip.service

import java.util.*
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(
    private val userService: UserService,
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val isuUser = userService.getByIsuId(username)
            ?: throw UsernameNotFoundException("User not found with ID: $username")

        return User(
            isuUser.id.toString(),
            "",
            emptyList()
        )
    }
}