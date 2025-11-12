package ru.itmo.dws.itmotrip.model

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.UUID

data class User(
    val id: UUID,
    val studentId: String,
    val faculty: String,
    val firstName: String,
    val middleName: String?,
    val lastName: String,
    val socialNetworkUsername: String?,
    val avatarUrl: String?,
    val bio: String?,
) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> = mutableListOf()

    override fun getPassword(): String = ""
    override fun getUsername(): String = id.toString()
}
