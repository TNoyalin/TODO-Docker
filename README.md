# Todo Fullstack Application
## Tech Stack
- Frontend: Angular
- Backend: Spring Boot
- Database: Oracle
- Containerization: Docker & Docker Compose

## Features
- Create tasks
- View latest 5 tasks
- Mark tasks as completed
- REST API integration

### Prerequisites
- Docker installed

### Run the project
docker-compose up --build

### DB
CREATE TABLE TASK (
    ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    TITLE VARCHAR2(100),
    DESCRIPTION VARCHAR2(255),
    STATUS VARCHAR2(20),
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

