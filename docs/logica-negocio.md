# Lógica de Negocio - Plataforma PetConnect

## Introducción

PetConnect es una plataforma web diseñada para conectar dueños de mascotas con servicios relacionados con el cuidado y bienestar animal. El sistema permite registrar mascotas, encontrar cuidadores o paseadores, gestionar reservas de servicios, registrar historial de salud de las mascotas y facilitar interacciones entre usuarios.

El objetivo principal del sistema es centralizar servicios que actualmente se encuentran dispersos en redes sociales o canales informales, proporcionando una solución digital segura y organizada.

---

# Objetivo del Sistema

Desarrollar una plataforma que permita a los dueños de mascotas encontrar servicios de cuidado, gestionar información relevante sobre sus animales y participar en una comunidad orientada al bienestar animal.

---

# Actores del Sistema

## Dueño de Mascota
Usuario que registra mascotas dentro del sistema y puede solicitar servicios para ellas.

Funciones principales:

- registrar mascotas
- solicitar servicios
- reservar cuidadores
- consultar historial de salud
- evaluar servicios recibidos

---

## Proveedor de Servicios

Usuario que ofrece servicios relacionados con mascotas.

Servicios que puede ofrecer:

- paseo de mascotas
- cuidado temporal
- hospedaje de mascotas
- guardería

Funciones principales:

- publicar servicios
- gestionar disponibilidad
- aceptar o rechazar reservas
- recibir evaluaciones de usuarios

---

## Administrador

Usuario responsable de supervisar la plataforma.

Funciones principales:

- moderar contenido
- gestionar reportes
- supervisar usuarios
- controlar comportamiento indebido

---

# Entidades Principales del Sistema

Las entidades principales del dominio del sistema son:

- Usuario
- Mascota
- Servicio
- Reserva
- Reseña
- Historial de Salud
- Solicitud de Compatibilidad

---

# Gestión de Mascotas

Los usuarios pueden registrar mascotas dentro del sistema.

Cada mascota posee un perfil que incluye:

- nombre
- raza
- edad
- peso
- descripción
- fotos
- estado de vacunación
- historial médico

Cada mascota pertenece a un usuario registrado.

---

# Marketplace de Servicios

La plataforma permite que usuarios ofrezcan o soliciten servicios para mascotas.

Tipos de servicios disponibles:

- paseo de mascotas
- cuidado temporal
- hospedaje de mascotas
- guardería

Cada servicio incluye información como:

- tipo de servicio
- precio
- disponibilidad
- ubicación
- tipo de mascotas aceptadas

---

# Sistema de Reservas

Los dueños de mascotas pueden reservar servicios ofrecidos por otros usuarios.

Una reserva incluye:

- mascota asociada
- proveedor del servicio
- fecha y hora
- duración del servicio
- estado de la reserva

Estados posibles de la reserva:

- pendiente
- confirmada
- cancelada
- completada

---

# Sistema de Reseñas

Después de completar un servicio, los usuarios pueden dejar una reseña.

Las reseñas incluyen:

- calificación
- comentario
- referencia al servicio
- usuario que realiza la reseña

Este sistema permite mantener confianza entre los usuarios.

---

# Compatibilidad entre Mascotas

La plataforma incluye un sistema de búsqueda de compatibilidad entre mascotas para fines de crianza responsable.

La compatibilidad puede considerar:

- raza
- edad
- estado de salud
- ubicación geográfica

El sistema no está orientado a la venta ilegal de mascotas.

---

# Historial de Salud

Cada mascota puede tener un registro de salud.

Este registro puede incluir:

- vacunas
- visitas veterinarias
- tratamientos médicos
- medicamentos

El sistema puede generar recordatorios para eventos de salud futuros.

---

# Sistema de Recomendaciones

El sistema puede generar recomendaciones basadas en datos registrados.

Ejemplos de recomendaciones:

- cuidadores cercanos
- servicios recomendados para una mascota
- compatibilidad entre mascotas
- proveedores con mejor reputación

---

# Sistema de Notificaciones

La plataforma envía notificaciones en eventos importantes.

Ejemplos:

- confirmación de reservas
- cambios en reservas
- recordatorios de salud
- nuevas solicitudes de servicio

Las notificaciones pueden ser gestionadas mediante Edge Functions.

---

# Seguridad y Autenticación

La autenticación es gestionada por Supabase Auth.

Los usuarios se autentican directamente con Supabase y reciben un token JWT.

El backend valida este token para autorizar las solicitudes.

---

# Gestión de Archivos

Las imágenes de mascotas y perfiles de usuario se almacenan utilizando Supabase Storage.

El backend mantiene referencias a los archivos almacenados.

---

# Posibles Extensiones Futuras

El sistema puede ampliarse en el futuro con:

- análisis de datos
- recomendaciones basadas en inteligencia artificial
- integración con veterinarias
- aplicaciones móviles