package ru.itmo.dws.itmotrip.mapper

import ru.itmo.dws.itmotrip.generated.models.UserResponse
import ru.itmo.dws.itmotrip.model.User

fun User.toUserResponse() = UserResponse(
    id = id,
    avatarUrl = avatarUrl,
    bio = bio,
    faculty = faculty,
    firstName = firstName,
    lastName = lastName,
    middleName = middleName,
    socialNetworkUsername = socialNetworkUsername,
    studentId = studentId
)