package ru.itmo.dws.itmotrip.service

import api.myitmo.MyItmo
import api.myitmo.model.personality.Personality
import org.springframework.stereotype.Service

@Service
class MyItmoService(
    private val myItmo: MyItmo,
) {
    fun getPersonByIsuId(isuId: Int): Personality {
        val getPersonalityRequest = myItmo.api().getPersonality(isuId)
        val response = getPersonalityRequest.execute()
        val responseAsModel = response.body()?.result
        return responseAsModel
            ?: throw RuntimeException("Пользователь с isu=$isuId не найден")
    }

    fun getMyItmo(): MyItmo {
        return myItmo.apply {
            storage.refreshExpiresAt = Long.MAX_VALUE
        }
    }
}