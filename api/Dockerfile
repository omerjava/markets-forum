# ==========================
# 1) Build stage
# ==========================
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# copy pom.xml and download dependencies first (cache layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# ==========================
# 2) Runtime stage
# ==========================
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
