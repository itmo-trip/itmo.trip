package ru.itmo.dws.itmotrip.service

import org.springframework.stereotype.Service
import ru.itmo.dws.itmotrip.generated.models.TransportTypeResponse
import ru.itmo.dws.itmotrip.mapper.toTransportTypeResponse
import ru.itmo.dws.itmotrip.model.exception.TransportTypeNotFoundException
import ru.itmo.dws.itmotrip.repository.TransportTypeRepository

@Service
class TransportTypeService(
    private val transportTypeRepository: TransportTypeRepository,
) {

    fun getAll(): List<TransportTypeResponse> {
        return transportTypeRepository.getAll().map { it.toTransportTypeResponse() }
    }

    fun getById(id: Long): TransportTypeResponse {
        val type = transportTypeRepository.getById(id) ?: throw TransportTypeNotFoundException(id)
        return type.toTransportTypeResponse()
    }
}
