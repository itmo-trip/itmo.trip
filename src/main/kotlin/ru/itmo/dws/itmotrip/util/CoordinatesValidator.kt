package ru.itmo.dws.itmotrip.util

import java.math.BigDecimal

object CoordinatesValidator {
    private val MIN_LATITUDE = BigDecimal.valueOf(-90.0)
    private val MAX_LATITUDE = BigDecimal.valueOf(90.0)
    private val MIN_LONGITUDE = BigDecimal.valueOf(-180.0)
    private val MAX_LONGITUDE = BigDecimal.valueOf(180.0)

    fun isValidLatitude(latitude: BigDecimal): Boolean {
        return latitude >= MIN_LATITUDE && latitude <= MAX_LATITUDE
    }

    fun isValidLongitude(longitude: BigDecimal): Boolean {
        return longitude >= MIN_LONGITUDE && longitude <= MAX_LONGITUDE
    }

    fun validateCoordinates(latitude: BigDecimal, longitude: BigDecimal): Boolean {
        return isValidLatitude(latitude) && isValidLongitude(longitude)
    }
}