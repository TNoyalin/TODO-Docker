# ---------- Stage 1: Build ----------
    FROM maven:3.9-eclipse-temurin-17 AS build

    WORKDIR /app
    
    # Copy project files
    COPY pom.xml .
    COPY src ./src
    
    # Build using Maven (NOT mvnw)
    RUN mvn clean package -DskipTests
    
    # ---------- Stage 2: Run ----------
    FROM eclipse-temurin:17-jre
    
    WORKDIR /app
    
    # Copy built jar from build stage
    COPY --from=build /app/target/*.jar app.jar
    
    EXPOSE 8080
    
    ENTRYPOINT ["java","-jar","app.jar"]
    