import org.openapitools.generator.gradle.plugin.tasks.GenerateTask

plugins {
    application
    idea

    id("org.springframework.boot") version "3.5.7"
    id("io.spring.dependency-management") version "1.1.7"

    id("com.avast.gradle.docker-compose") version "0.17.12"

    id("org.openapi.generator") version "7.13.0"

    kotlin("jvm") version "2.0.20"
    kotlin("plugin.spring") version "2.0.20"
}

group = "ru.itmo.dws"
version = "0.0.1-SNAPSHOT"
description = "itmo-trip"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

sourceSets {
    main {
        kotlin {
            srcDir("$buildDir/generated/src/main/kotlin")
        }
    }
}

application {
    mainClass.set("ru.itmo.dws.itmotrip.ItmoTripApplicationKt")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("io.github.oshai:kotlin-logging-jvm:7.0.3")
    implementation("dev.alllexey:my-itmo-api:1.4.0")

    implementation("io.jsonwebtoken:jjwt-api:0.13.0")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.13.0")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.13.0")

    implementation("com.auth0:java-jwt:4.5.0")
    implementation("com.auth0:jwks-rsa:0.23.0")

    runtimeOnly("org.postgresql:postgresql")
    implementation("org.liquibase:liquibase-core")
}

dependencies {
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")


    val testcontainersVersion = "2.0.1"
    testImplementation("org.testcontainers:testcontainers-postgresql:$testcontainersVersion")
    testImplementation("org.testcontainers:testcontainers-junit-jupiter:$testcontainersVersion")
}

kotlin {
    jvmToolchain(21)
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

val generateApi = tasks.register<GenerateTask>("generateApi", fun GenerateTask.() {
    group = "code generation"
    description = "Generated itmo trip api"

    generatorName.set("kotlin-spring")
    inputSpec.set("$rootDir/openapi/itmo-trip-api-v1.openapi.yaml")
    outputDir.set("$buildDir/generated")
    packageName.set("ru.itmo.dws.itmotrip.generated")
    ignoreFileOverride.set("$rootDir/.openapi-generator-ignore")
    validateSpec.set(false)
    configOptions.set(
        mapOf(
            "dateLibrary" to "java8",
            "annotationLibrary" to "none",
            "documentationProvider" to "none",
            "exceptionHandler" to "false",
            "serializationLibrary" to "jackson",
            "useSpringBoot3" to "true",
            "useSwaggerUI" to "false",
            "openApiNullable" to "false",
            "useTags" to "true",
            "enumPropertyNaming" to "UPPERCASE",
            "library" to "spring-boot",
            "delegatePattern" to "true",
            "apiSuffix" to "Api",
        )
    )
    typeMappings.set(
        mapOf(
            "int64" to "java.lang.Long",
        )
    )
})

val generateFront = tasks.register<GenerateTask>("generateFront", fun GenerateTask.() {
    group = "code generation"
    description = "Generated itmo trip frontend api"

    generatorName.set("typescript-fetch")
    inputSpec.set("$rootDir/openapi/itmo-trip-api-v1.openapi.yaml")
    outputDir.set("$rootDir/frontend/src/generated/openapi")
    ignoreFileOverride.set("$rootDir/frontend/.openapi-generator-ignore")
    templateDir.set("$rootDir/frontend/mustache-templates")
    validateSpec.set(false)
    configOptions.set(
        mapOf(
            "supportsES6" to "true"
        )
    )
})

tasks.compileKotlin.get().dependsOn(generateApi, generateFront)
