package ru.itmo.dws.itmotrip.repository

import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.itmo.dws.itmotrip.model.TransportType

@Repository
interface TransportTypeRepository : CrudRepository<TransportType, Long> {

    @Query("SELECT * FROM transport_types")
    fun getAll(): List<TransportType>

    @Query("SELECT * FROM transport_types WHERE id = :id")
    fun getById(id: Long): TransportType?
}