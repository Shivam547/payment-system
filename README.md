💳 Distributed Payment Processing System

A full-stack, production-style distributed payment processing system built with Spring Boot, React, Kafka, PostgreSQL, WebSockets, and Docker, designed to simulate real-time transaction authorization and monitoring.

🚀 Overview

This project simulates a real-world payment gateway architecture:

Secure REST APIs for transaction creation

Asynchronous event-driven processing via Kafka

Real-time status updates via WebSockets

Transaction monitoring dashboard

Load tested with JMeter

CI/CD ready with GitHub Actions

Fully containerized using Docker


🏗️ System Architecture
Client (React Dashboard)
        │
        ▼
Spring Boot API (Payment Service)
        │
        ▼
Kafka (Event Streaming)
        │
        ▼
Payment Consumer (Authorization Engine)
        │
        ▼
PostgreSQL (Transaction Storage)
        │
        ▼
WebSocket (Real-time Updates to UI)

🛠️ Tech Stack
Backend

Java 17

Spring Boot

Spring Data JPA

Spring Security

Kafka

WebSockets (STOMP)

PostgreSQL

Docker

Frontend

React

Tailwind CSS

Axios

SockJS + STOMP

Real-time dashboard updates

DevOps & Testing

Docker Compose

GitHub Actions (CI)

Apache JMeter (Load Testing)

✨ Features

🔐 JWT-based authentication

⚡ Real-time transaction updates via WebSocket

🧠 Asynchronous Kafka-based processing

📊 Production-style monitoring dashboard

📦 Containerized deployment

🚀 Load tested under concurrent users

🏗️ Scalable microservice-style design

🖥️ Dashboard Features

Total Transactions

Authorized Transactions

Under Review Transactions

Real-time updates without refresh

Status badges (Authorized / Review)

Clean production UI

<img width="2940" height="1912" alt="image" src="https://github.com/user-attachments/assets/45adac33-4fe5-4feb-9606-9f533750569f" />


🧪 Performance Testing

Load tested using Apache JMeter:

Simulated 50–100 concurrent users

Measured response time and throughput

Validated system stability under load

Observed Kafka processing under concurrency

🐳 Running With Docker
Start Infrastructure
docker compose up -d

This starts:

PostgreSQL

Zookeeper

Kafka

Run Backend
cd backend
./mvnw spring-boot:run
Run Frontend
cd frontend
npm install
npm start

Access dashboard:

http://localhost:3000
🔌 API Endpoints
Create Payment
POST /api/payments

Request:

{
  "merchantId": "M123",
  "amount": 5000,
  "currency": "INR"
}
📊 Real-Time Processing Flow

User submits payment

API stores transaction with PENDING status

Kafka publishes event

Consumer processes authorization logic:

Amount < 10000 → AUTHORIZED

Amount ≥ 10000 → REVIEW

DB updated

WebSocket broadcasts status update to UI

📈 Scalability Considerations

Event-driven architecture

Non-blocking async processing

Separate producer & consumer

Horizontal scaling ready

Containerized deployment

🔒 Security Considerations

JWT-based authentication

Input validation

Layered architecture

OWASP-aligned secure coding practices

🧠 What This Project Demonstrates

Distributed systems design

Event-driven architecture

Real-time UI synchronization

Backend concurrency handling

Performance testing strategy

CI/CD readiness

Production-style application structure

📸 Screenshots

(Add your dashboard screenshots here)

🏆 Resume-Ready Highlights

Designed and implemented a distributed payment processing system with asynchronous event streaming.

Integrated Kafka for scalable transaction processing.

Implemented WebSocket-based real-time dashboard updates.

Conducted load testing to evaluate throughput and latency under concurrent traffic.

Containerized services and prepared CI/CD pipeline for automated builds.

👨‍💻 Author

Shivam Anand
Software Engineer | Backend & Distributed Systems Enthusiast

🔥 Future Improvements

Prometheus + Grafana monitoring

Kubernetes deployment

Distributed tracing

API rate limiting

Circuit breaker implementation

Cloud deployment (AWS/GCP)

