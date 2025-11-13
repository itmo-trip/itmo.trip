package ru.itmo.dws.itmotrip.mapper

import ru.itmo.dws.itmotrip.generated.models.TimetableResponse
import ru.itmo.dws.itmotrip.model.Timetable

fun Timetable.toTimetableResponse() = TimetableResponse(
    id = id,
    endTimeUtc = endTimeUtc.toString(),
    startTimeUtc = startTimeUtc.toString()
)