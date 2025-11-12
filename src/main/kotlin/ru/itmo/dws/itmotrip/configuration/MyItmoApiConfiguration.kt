package ru.itmo.dws.itmotrip.configuration

import api.myitmo.MyItmo
import api.myitmo.storage.RuntimeStorage
import api.myitmo.utils.AuthHelper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MyItmoApiConfiguration {

    @Bean
    fun myItmo(): MyItmo {
        val myItmo = MyItmo().apply {
            storage = RuntimeStorage()
        }
        return myItmo
    }

    @Bean
    fun authHelper(myItmo: MyItmo): AuthHelper {
        return AuthHelper(myItmo)
    }
}