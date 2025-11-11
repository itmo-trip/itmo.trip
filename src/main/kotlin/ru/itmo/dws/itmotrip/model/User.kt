package ru.itmo.dws.itmotrip.model

import java.util.UUID

data class User(
    val id: UUID,
    val studentId: String,
    val faculty: String,
    val firstName: String,
    val middleName: String?,
    val lastName: String,
    val socialNetworkUsername: String,
    val avatarUrl: String?,
    val bio: String?,
)