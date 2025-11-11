package ru.itmo.dws.itmotrip.configuration

import api.myitmo.MyItmo
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MyItmoApiConfiguration {

    @Bean
    fun myItmo(): MyItmo {
        return MyItmo()
    }
}