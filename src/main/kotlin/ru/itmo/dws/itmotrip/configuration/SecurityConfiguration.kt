package ru.itmo.dws.itmotrip.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfiguration {

    @Bean
    fun filterChain(
        http: HttpSecurity,
        jwtAuthFilter: JwtAuthFilter
    ): SecurityFilterChain {
        http
            .authorizeHttpRequests {
                it.requestMatchers("/readyz").permitAll()
                it.requestMatchers("/auth").permitAll()

                it.anyRequest().authenticated()
            }
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter::class.java)
            .csrf { it.disable() }
            .cors { it.disable() }
            .formLogin { it.disable() }
            .httpBasic { it.disable() }
            .logout { it.disable() }

        return http.build()
    }
}
