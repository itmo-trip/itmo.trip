package ru.itmo.dws.itmotrip.repository

import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import ru.itmo.dws.itmotrip.model.Location
import java.util.UUID

interface LocationRepository : CrudRepository<Location, UUID> {

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
    fun getByById(id: UUID): Location?
}
