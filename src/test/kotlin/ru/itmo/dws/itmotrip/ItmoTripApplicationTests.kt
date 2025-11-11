package ru.itmo.dws.itmotrip

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import ru.itmo.dws.itmotrip.integration.AbstractIntegrationTest

@SpringBootTest
class ItmoTripApplicationTests : AbstractIntegrationTest() {

    @Test
    fun contextLoads() {
        Assertions.assertEquals(1, 1)
    }
}
