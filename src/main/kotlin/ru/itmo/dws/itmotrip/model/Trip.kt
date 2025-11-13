package ru.itmo.dws.itmotrip.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime
import java.util.UUID

@Table("trips")
data class Trip(
    @Id
    val id: UUID,
    val creatorId: UUID,
    val seriesId: UUID?,
    val transportTypeId: Long,
    val departureTime: LocalDateTime?,
    val arrivalTime: LocalDateTime?,
    val departureLocationId: UUID,
    val arrivalLocationId: UUID,
    val status: TripStatus,
    val comment: String?
) {
    enum class TripStatus {
        DRAFT,
        ACTIVE,
        FULL,
        CANCELLED,
        FINISHED,
        ;

        companion object {
            fun fromString(value: String): TripStatus? {
                val string = value.uppercase()
                return entries.firstOrNull { string == it.name }
            }
        }
    }
}
