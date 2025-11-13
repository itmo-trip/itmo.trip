package ru.itmo.dws.itmotrip.repository

import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.itmo.dws.itmotrip.model.LocationType

@Repository
interface LocationTypeRepository : CrudRepository<LocationType, Long> {

    @Query("SELECT * FROM location_types")
    fun getAll(): List<LocationType>

    @Query("SELECT * FROM location_types WHERE id = :id")
    fun getById(id: Long): LocationType?
}