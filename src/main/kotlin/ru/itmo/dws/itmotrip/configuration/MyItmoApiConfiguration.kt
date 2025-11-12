package ru.itmo.dws.itmotrip.configuration

import api.myitmo.MyItmo
import api.myitmo.storage.RuntimeStorage
import api.myitmo.utils.AuthHelper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Scope
import org.springframework.context.annotation.ScopedProxyMode
import org.springframework.web.context.WebApplicationContext

@Configuration
class MyItmoApiConfiguration {

    @Bean
    @Scope(
        value = WebApplicationContext.SCOPE_REQUEST,
        proxyMode = ScopedProxyMode.TARGET_CLASS,
    )
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
