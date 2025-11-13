package ru.itmo.dws.itmotrip.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table("location_types")
data class TransportType (
    @Id
    val id: Long,
    val logoUrl: String?,
    val nameRu: String
)