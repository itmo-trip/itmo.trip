package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import ru.itmo.dws.itmotrip.model.Timetable
import ru.itmo.dws.itmotrip.repository.TimetableRepository

@Service
class TimetableService (
    private val timetableRepository: TimetableRepository
) {
    fun getAll() : List<Timetable> {
        return timetableRepository.getAll()
    }
}