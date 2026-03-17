# Arquitectura del Backend - Plataforma PetConnect

## Introducción

El backend de la plataforma PetConnect está desarrollado utilizando Next.js con TypeScript y sigue una arquitectura modular orientada a servicios.

El backend expone una API REST que es consumida por el frontend de la aplicación.

El sistema se integra con Supabase para la gestión de base de datos, autenticación y almacenamiento de archivos.

---

# Tecnologías Utilizadas

Framework Backend:
Next.js (TypeScript)

Base de Datos:
PostgreSQL (Supabase)

ORM:
Prisma

Autenticación:
Supabase Auth

Almacenamiento de Archivos:
Supabase Storage

Servicios Serverless:
Supabase Edge Functions

Despliegue:
Vercel

---

# Arquitectura General

La arquitectura del sistema se basa en una separación clara entre frontend y backend.

El backend actúa como capa de API y lógica de negocio, mientras que Supabase provee servicios administrados de infraestructura.

Flujo de arquitectura:

Frontend (Next.js)
↓
API REST
↓
Backend (Next.js + TypeScript)
↓
Servicios del sistema
↓
Prisma ORM
↓
Supabase PostgreSQL

Servicios especializados pueden ejecutarse mediante Edge Functions.

---

# Responsabilidades del Backend

El backend es responsable de:

- validar solicitudes de clientes
- verificar autenticación
- implementar lógica de negocio
- interactuar con la base de datos
- gestionar reservas y servicios
- coordinar funcionalidades del sistema
- llamar Edge Functions cuando sea necesario

---

# Flujo de Autenticación

La autenticación es gestionada por Supabase Auth.

Proceso:

1. El usuario se autentica mediante Supabase.
2. Supabase genera un token JWT.
3. El frontend envía el token en cada solicitud.
4. El backend valida el token antes de ejecutar operaciones protegidas.

Ejemplo de header:

Authorization: Bearer <token>

---

# Estructura del Backend

El backend sigue una estructura modular organizada por dominio.

Ejemplo de estructura:

src/

modules/
users/
pets/
services/
bookings/
reviews/
health/
match/

controllers/

services/

repositories/

middleware/
auth/
error-handler/

lib/
prisma/

utils/

---

# Diseño de API

El backend expone una API REST.

Ejemplos de endpoints:

GET /api/pets  
POST /api/pets  

GET /api/services  

POST /api/bookings  

GET /api/bookings  

POST /api/reviews  

Todas las rutas protegidas requieren autenticación.

---

# Acceso a Base de Datos

El acceso a la base de datos se realiza mediante Prisma ORM.

Prisma permite:

- definir modelos
- gestionar relaciones
- realizar consultas tipadas
- manejar migraciones

Esto asegura consistencia y seguridad en las operaciones de datos.

---

# Integración con Edge Functions

Las Edge Functions de Supabase se utilizan para ejecutar tareas especializadas.

Ejemplos de funciones:

- envío de notificaciones
- generación de recomendaciones
- procesamiento de imágenes
- recordatorios de salud

El backend puede invocar estas funciones cuando sea necesario.

---

# Gestión de Archivos

Supabase Storage se utiliza para almacenar archivos.

Ejemplos de uso:

- imágenes de mascotas
- fotos de perfiles de usuario

El backend se encarga de gestionar referencias a estos archivos.

---

# Manejo de Errores

El backend implementa un sistema centralizado de manejo de errores.

Códigos comunes:

400 - Solicitud incorrecta  
401 - No autorizado  
404 - Recurso no encontrado  
500 - Error interno del servidor

---

# Escalabilidad

La arquitectura permite escalabilidad horizontal gracias al uso de infraestructura serverless.

Supabase y Vercel permiten escalar automáticamente según demanda.

---

# Seguridad

Las medidas de seguridad incluyen:

- validación de tokens JWT
- protección de rutas
- control de acceso a recursos
- almacenamiento seguro de archivos