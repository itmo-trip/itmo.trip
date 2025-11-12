package ru.itmo.dws.itmotrip.api

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import ru.itmo.dws.itmotrip.generated.apis.TimetablesApiDelegate
import ru.itmo.dws.itmotrip.generated.models.TimetableResponse
import ru.itmo.dws.itmotrip.mapper.toTimetableResponse
import ru.itmo.dws.itmotrip.service.TimetableService

@Component
class TimetableController(private val timetableService: TimetableService) : TimetablesApiDelegate {
    override fun apiV1TimetablesGet(): ResponseEntity<List<TimetableResponse>> {
        val timetables = timetableService.getAll()
        return ResponseEntity.ok(timetables.map { it.toTimetableResponse() })
    }
}