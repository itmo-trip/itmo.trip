package ru.itmo.dws.itmotrip.model

import java.time.LocalTime

data class Timetable (
    val id: Long,
    val endTimeUtc: LocalTime,
    val startTimeUtc: LocalTime
)