package ru.itmo.dws.itmotrip.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.math.BigDecimal
import java.util.UUID

@Table("locations")
data class Location(
    @Id
    val id: UUID,
    val creatorId: UUID?,
    val locationTypeId: Long,
    val name: String,
    val latitude: BigDecimal,
    val longitude: BigDecimal,
)
