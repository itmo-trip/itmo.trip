package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import ru.itmo.dws.itmotrip.model.TransportType
import ru.itmo.dws.itmotrip.repository.TransportTypeRepository

@Service
class TransportTypeService (
    private val transportTypeRepository: TransportTypeRepository
) {
    fun getAll() : List<TransportType> {
        return transportTypeRepository.getAll()
    }
}