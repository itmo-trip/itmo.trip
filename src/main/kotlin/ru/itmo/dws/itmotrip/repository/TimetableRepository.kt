package ru.itmo.dws.itmotrip.repository

import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.itmo.dws.itmotrip.model.Timetable
import java.util.*

@Repository
interface TimetableRepository : CrudRepository<Timetable, UUID> {
    @Query("SELECT * FROM timetable")
    fun getAll(): List<Timetable>
}