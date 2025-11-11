FROM eclipse-temurin:21-jdk-noble AS build

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY settings.gradle.kts .
COPY build.gradle.kts .

RUN ./gradlew dependencies --no-daemon --no-build-cache

COPY openapi ./openapi
COPY .openapi-generator-ignore ./.openapi-generator-ignore

# костыль, чуть позже пофикшу
COPY frontend/.openapi-generator-ignore ./frontend/.openapi-generator-ignore
COPY frontend/mustache-templates ./frontend/mustache-templates

COPY src ./src

# не хочу настраивать dind для tc, поэтому тесты будут гонятся отдельно
RUN ./gradlew clean bootJar -i -s --no-daemon --no-build-cache

FROM eclipse-temurin:21-jdk-noble AS runtime

WORKDIR /app

ENV TZ=Europe/Moscow
ENV LANG=ru_RU.UTF-8
ENV LANGUAGE=ru_RU:ru
ENV LC_ALL=ru_RU.UTF-8

COPY --from=build /app/build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar","/app/app.jar"]
