package ru.itmo.dws.itmotrip.repository

import org.springframework.data.jdbc.repository.query.Modifying
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.itmo.dws.itmotrip.model.Trip
import java.time.LocalDateTime
import java.util.UUID

@Repository
interface TripRepository : CrudRepository<Trip, UUID> {

    @Query(
        """
            SELECT *
            FROM trips
            WHERE id = :id
        """
    )
    fun getById(id: UUID): Trip?

    @Query(
        """
            INSERT INTO trips (
                id,
                creator_id,
                series_id,
                transport_type_id,
                departure_time,
                arrival_time,
                departure_location_id,
                arrival_location_id,
                status,
                comment
            ) VALUES (
                :id,
                :creatorId,
                :seriesId,
                :transportTypeId,
                :departureTime,
                :arrivalTime,
                :departureLocationId,
                :arrivalLocationId,
                :status::trip_status,
                :comment
            )
        """
    )
    @Modifying
    fun insert(
        id: UUID,
        creatorId: UUID,
        seriesId: UUID?,
        transportTypeId: Long,
        departureTime: LocalDateTime?,
        arrivalTime: LocalDateTime?,
        departureLocationId: UUID,
        arrivalLocationId: UUID,
        status: String,
        comment: String?
    )

    @Query(
        """
            UPDATE trips 
            SET
                series_id = :seriesId,
                transport_type_id = :transportTypeId,
                departure_time = :departureTime,
                arrival_time = :arrivalTime,
                departure_location_id = :departureLocationId,
                arrival_location_id = :arrivalLocationId,
                status = :status::trip_status,
                comment = :comment
            WHERE id = :id
        """
    )
    @Modifying
    fun updateById(
        id: UUID,
        seriesId: UUID?,
        transportTypeId: Long,
        departureTime: LocalDateTime?,
        arrivalTime: LocalDateTime?,
        departureLocationId: UUID,
        arrivalLocationId: UUID,
        status: String,
        comment: String?
    )
}