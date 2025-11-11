package ru.itmo.dws.itmotrip.service

import api.myitmo.MyItmo
import org.springframework.stereotype.Service

@Service
class MyItmoService(
    private val myItmo: MyItmo,
) {
    fun getPersonByIsuId(isuId: Int) {
        val x = myItmo.api().getPersonality(isuId)
        val response = x.execute()
    }
}