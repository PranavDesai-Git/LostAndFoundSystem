FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY backend/target/lost-and-found-system-1.0-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]