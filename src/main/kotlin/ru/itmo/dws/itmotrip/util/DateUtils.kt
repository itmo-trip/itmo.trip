package ru.itmo.dws.itmotrip.util

import java.time.OffsetDateTime
import java.time.ZoneOffset

object DateUtils {

    fun OffsetDateTime.toUtcLocalDateTime() = withOffsetSameInstant(ZoneOffset.UTC).toLocalDateTime()
}
