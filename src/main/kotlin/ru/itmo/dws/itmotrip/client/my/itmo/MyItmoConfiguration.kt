package ru.itmo.dws.itmotrip.client.my.itmo

import api.myitmo.MyItmo
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MyItmoConfiguration {

    @Bean
    fun myItmoClient(): MyItmo {
        return MyItmo()
    }
}