# Proyecto Microservicios con Istio y Kiali

## Descripción

Esta aplicación implementa un **sistema de microservicios** modular y escalable, con:

- **User Service**: gestión de usuarios
- **Order Service**: gestión de órdenes
- **Product Service**: gestión de productos
- **API Gateway**: punto de entrada único a los servicios

Todos los microservicios se conectan a **MongoDB** y se despliegan en **Kubernetes**, con monitorización de tráfico usando **Istio** y **Kiali**.

---

## Requisitos

- Docker Desktop (con Kubernetes habilitado)
- Kubectl
- Istioctl
- Node.js y npm
- Git

---

## Estructura del proyecto
```text

proyectom/
├─ gateway/
├─ user-service/
├─ order-service/
├─ product-service/
├─ k8s/
│  ├─ mongo/
│  ├─ user-service/
│  ├─ order-service/
│  ├─ product-service/
├─ istio/
│  ├─ proyectom-gateway.yml
│  ├─ proyectom-virtualservice.yml
├─ kiali-cr.yml


Despliegue paso a paso
1️⃣ Clonar el repositorio
bash
Copiar código
git clone https://github.com/piripinpon/proyecto
cd proyectom
2️⃣ Construir imágenes Docker
bash
Copiar código
docker build -t user-service ./user-service
docker build -t order-service ./order-service
docker build -t product-service ./product-service
docker build -t gateway ./gateway
3️⃣ Desplegar MongoDB
bash
Copiar código
kubectl apply -f k8s/mongo/
4️⃣ Desplegar microservicios y gateway
bash
Copiar código
kubectl apply -f k8s/user-service/
kubectl apply -f k8s/order-service/
kubectl apply -f k8s/product-service/
kubectl apply -f k8s/gateway/
5️⃣ Instalar Istio y habilitar sidecar injection
bash
Copiar código
istioctl install --set profile=demo -y
kubectl label namespace proyectom istio-injection=enabled

Aplica Istio Gateway y VirtualService:

bash
Copiar código
kubectl apply -f istio/proyectom-gateway.yml
kubectl apply -f istio/proyectom-virtualservice.yml

6️⃣ Verificar servicios
bash
Copiar código
kubectl get pods -n proyectom
kubectl get svc -n proyectom
kubectl get svc -n istio-system
El gateway expone el puerto 8080 en localhost.


7️⃣ Población de la base de datos
bash
Copiar código
# Usuarios
kubectl exec -it mongo-users-<pod> -- mongosh
use users_db
db.users.insertMany([{ name: "Rafael", email: "rafael@example.com" }, { name: "Ana", email: "ana@example.com" }])

# Productos
kubectl exec -it mongo-products-<pod> -- mongosh
use products_db
db.products.insertMany([{ name: "Laptop", price: 1200 }, { name: "Mouse", price: 20 }])

# Órdenes
kubectl exec -it mongo-orders-<pod> -- mongosh
use orders_db
db.orders.insertMany([{ productId: "1", userId: "1", quantity: 1 }, { productId: "2", userId: "2", quantity: 2 }])


8️⃣ Probar rutas a través del Gateway
bash
Copiar código
curl http://localhost:8080/users
curl http://localhost:8080/products
curl http://localhost:8080/orders

9️⃣ Monitoreo con Kiali
Accede a la consola de Kiali para ver flujo de tráfico en tiempo real.

Haz requests mientras observas el tráfico y la comunicación entre microservicios.

🔟 Ingeniería del caos prueba
Reinicia un microservicio para probar resiliencia:


Usamos este comando para provocar el problema kubectl delete pod -n proyectom product-service-7b456cf9c7-4d2dz
pod "product-service-7b456cf9c7-4d2dz" deleted from proyectom namespace


```
## Para confirmar la instalacion de istio, debe verse de esta forma al reproducir los comandos

istioctl install --set profile=demo -y
kubectl label namespace proyectom istio-injection=enabled


<img width="1120" height="579" alt="image" src="https://github.com/user-attachments/assets/3869c8af-8e2e-4c21-bd88-74be0ab64361" />

<img width="889" height="170" alt="image" src="https://github.com/user-attachments/assets/3773a2ee-bfd5-419a-9a6f-3e4f0ae41831" />

## Confirmamos que todos los servicios esten construidos y corriendo perfectamente


<img width="692" height="191" alt="image" src="https://github.com/user-attachments/assets/519f5175-b87b-4613-91f4-e4a4e39da729" />

<img width="1093" height="521" alt="image" src="https://github.com/user-attachments/assets/1c7be917-6594-4cdb-ac15-7186bc3cfdce" />

##Insertamos los datos en la base para empezar a monitorear que vaya bien


<img width="1113" height="303" alt="image" src="https://github.com/user-attachments/assets/31cf32fc-86bd-4a89-97ae-12c47ba5f3b0" />


## Con el comando kubectl -n istio-system port-forward svc/istio-ingressgateway 8080:80 generamos una forma para empezar a realizar las 
pruebas


<img width="1101" height="180" alt="image" src="https://github.com/user-attachments/assets/40a57be8-b816-4cbe-8596-95a9d3f65c93" />


## Con esas pruebas monitoreamos el andar de kiali y monitoreamos 


<img width="1338" height="850" alt="Captura de pantalla 2025-12-07 125935" src="https://github.com/user-attachments/assets/d045e11c-ca87-4332-a426-abdc8c7f38ad" />


## Como prueba de caos, usamos este comando para generar el problema y asi ver que cae, que es remplazado y tarda un poco en responder a llamados


<img width="650" height="195" alt="Captura de pantalla 2025-12-07 131305" src="https://github.com/user-attachments/assets/1fbbc2ee-0e84-4aee-8b23-4b376f96f165" />


## Usamos este comando para provocar el problema kubectl delete pod -n proyectom product-service-7b456cf9c7-4d2dz
pod "product-service-7b456cf9c7-4d2dz" deleted from proyectom namespace


<img width="726" height="237" alt="image" src="https://github.com/user-attachments/assets/c0e0338a-230c-4002-8ebb-b7f525a75e55" />

