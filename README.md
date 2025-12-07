🧩 Proyecto de Microservicios — README
📌 Descripción del Proyecto

Este proyecto implementa una arquitectura basada en microservicios, utilizando Node.js, Express, MongoDB, Docker, Docker Compose y Kubernetes.

Cada microservicio representa un módulo independiente:

User Service → Gestión de usuarios

Product Service → Gestión de productos

Order Service → Gestión de órdenes

Gateway API → Punto de entrada (API Gateway)

Cada servicio tiene su propia base de datos MongoDB independiente.

🧱 Estructura del Proyecto
proyectom/
│
├── gateway/
│   ├── Dockerfile
│   └── server.js
│
├── user-service/
│   ├── Dockerfile
│   ├── server.js
│   └── models/
│
├── product-service/
│   ├── Dockerfile
│   ├── server.js
│   └── models/
│
├── order-service/
│   ├── Dockerfile
│   ├── server.js
│   └── models/
│
├── k8s/
│   ├── namespace.yml
│   ├── gateway-deployment.yml
│   ├── gateway-service.yml
│   ├── mongo-users-deployment.yml
│   ├── mongo-users-service.yml
│   ├── mongo-products-deployment.yml
│   ├── mongo-products-service.yml
│   ├── mongo-orders-deployment.yml
│   ├── mongo-orders-service.yml
│   ├── user-service-deployment.yml
│   ├── user-service-service.yml
│   ├── product-service-deployment.yml
│   ├── product-service-service.yml
│   ├── order-service-deployment.yml
│   └── order-service-service.yml
│
└── docker-compose.yml

🚀 Cómo Ejecutarlo con Docker Compose
1️⃣ Construir y levantar todo

En la raíz del proyecto:

docker compose up --build


Esto creará:

3 microservicios

Gateway

3 contenedores MongoDB

Red de comunicación interna

🧪 Probar Microservicios (Docker)
➤ Crear un usuario
curl -X POST http://localhost:3001/users \
-H "Content-Type: application/json" \
-d "{ \"name\": \"Alex\" }"

➤ Crear un producto
curl -X POST http://localhost:3002/products \
-H "Content-Type: application/json" \
-d "{ \"name\": \"Laptop\", \"price\": 1500 }"

➤ Crear una orden

Reemplazando los IDs devueltos por MongoDB:

curl -X POST http://localhost:3003/orders \
-H "Content-Type: application/json" \
-d "{ \"userId\": \"ID_ALEX\", \"productId\": \"ID_LAPTOP\" }"

➤ Consultar órdenes
curl http://localhost:3003/orders

☸️ Deploy en Kubernetes
1️⃣ Crear Namespace
kubectl apply -f k8s/namespace.yml

2️⃣ Desplegar todo el proyecto
kubectl apply -f k8s/

3️⃣ Verificar pods
kubectl get pods -n proyectom


Ejemplo de salida correcta:

mongo-users       Running
mongo-products    Running
mongo-orders      Running
user-service      Running
product-service   Running
order-service     Running
gateway           Running

4️⃣ Ver servicios
kubectl get svc -n proyectom


El Gateway expone un NodePort, por ejemplo:

gateway NodePort 3000:32000/TCP


Entonces la API se accede en:

👉 http://localhost:32000

🧪 Probar Microservicios en Kubernetes
Crear usuario
curl -X POST http://localhost:32000/users \
-H "Content-Type: application/json" \
-d "{ \"name\": \"Alex\" }"

Crear producto
curl -X POST http://localhost:32000/products \
-H "Content-Type: application/json" \
-d "{ \"name\": \"Laptop\", \"price\": 1500 }"

Crear orden
curl -X POST http://localhost:32000/orders \
-H "Content-Type: application/json" \
-d "{ \"userId\": \"ID_ALEX\", \"productId\": \"ID_LAPTOP\" }"

✔️ Estado Actual del Proyecto

Hasta este punto, ya lograste:

✔ Microservicios funcionales
✔ Bases de datos independientes
✔ Docker + Docker Compose
✔ Kubernetes con deployments + services
✔ Namespace configurado
✔ Pruebas con CURL funcionando