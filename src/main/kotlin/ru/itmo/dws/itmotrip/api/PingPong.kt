package ru.itmo.dws.itmotrip.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PingPong {

    // потестить сесюру
    @GetMapping("/ping")
    fun ping(): String {
        return "pong"
    }
}
