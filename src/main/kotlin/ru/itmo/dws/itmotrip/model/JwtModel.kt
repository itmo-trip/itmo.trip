package ru.itmo.dws.itmotrip.model

data class JwtModel(
    val isuId: Int,
    val faculty: String,
    val givenName: String,
    val middleName: String?,
    val familyName: String,
    var picture: String?,
)