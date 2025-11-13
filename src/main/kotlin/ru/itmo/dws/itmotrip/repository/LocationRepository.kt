package ru.itmo.dws.itmotrip.repository

import org.springframework.data.jdbc.repository.query.Modifying
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import ru.itmo.dws.itmotrip.model.Location
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

interface LocationRepository : CrudRepository<Location, UUID> {

    @Query("SELECT * FROM locations")
    fun getAll(): List<Location>

    @Query(
        """
            SELECT *
            FROM locations
            WHERE creator_id = :creatorId OR creator_id IS NULL
        """
    )
    fun findAllByCreatorIdOrNull(creatorId: UUID): List<Location>

    @Query(
        """
            SELECT *
            FROM locations
            WHERE creator_id = :creatorId
        """
    )
    fun findAllByCreatorId(creatorId: UUID): List<Location>

    @Query(
        """
            SELECT *
            FROM locations
            WHERE id = :id
        """
    )
    fun getById(id: UUID): Location?

    @Query(
        """
            INSERT INTO locations (
                id,
                creator_id,
                location_type_id,
                name,
                latitude,
                longitude
            ) VALUES (
                :id,
                :creatorId,
                :locationTypeId,
                :name,
                :latitude,
                :longitude
            )
        """
    )
    @Modifying
    fun insert(
        id: UUID,
        creatorId: UUID?,
        locationTypeId: Long,
        name: String,
        latitude: BigDecimal,
        longitude: BigDecimal
    )

    @Query(
        """
            UPDATE locations 
            SET
                location_type_id = :locationTypeId,
                name = :name,
                latitude = :latitude,
                longitude = :longitude
            WHERE id = :id
        """
    )
    @Modifying
    fun updateById(
        id: UUID,
        locationTypeId: Long,
        name: String,
        latitude: BigDecimal,
        longitude: BigDecimal
    )
}