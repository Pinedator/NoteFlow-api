# Backend — Teoría

## Patrón cliente-servidor
La app móvil nunca se conecta directamente a la base de datos. La API actúa
como guardián: valida los datos y comprueba que el cliente tiene permiso para
hacer lo que pide. Esto protege la base de datos de accesos no autorizados.

## Arquitectura de NoteFlow
- **Cliente**: app móvil en React Native
- **API**: Next.js con Route Handlers desplegado en Vercel
- **Base de datos**: PostgreSQL en Neon

## API REST
REST es un estilo de arquitectura que usa HTTP para comunicar cliente y servidor.
Los recursos se identifican por URLs y las operaciones se expresan con métodos HTTP.

## Métodos HTTP
| Método | Operación | Ejemplo |
|--------|-----------|---------|
| GET | Leer datos | GET /api/notes |
| POST | Crear datos | POST /api/notes |
| PATCH | Modificar parcialmente | PATCH /api/notes/:id |
| DELETE | Eliminar | DELETE /api/notes/:id |

## Códigos de estado
| Código | Significado |
|--------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

Nunca devuelvas el error real de la base de datos al cliente: es información
interna que un atacante podría usar.

## Bases de datos relacionales
Organizan los datos en tablas con filas y columnas. Cada tabla representa
una entidad del dominio y las tablas se conectan mediante claves.

## ACID
- **Atomicidad**: una transacción se ejecuta completa o no se ejecuta.
- **Consistencia**: los datos siempre cumplen las reglas definidas.
- **Aislamiento**: las transacciones no se interfieren entre sí.
- **Durabilidad**: los datos persisten aunque el sistema falle.

## Primary Key y Foreign Key
- **Primary Key**: identificador único e irrepetible. Se prefiere UUID sobre
  enteros autoincrementales porque el cliente puede generar el ID offline.
- **Foreign Key**: referencia la primary key de otra tabla. ON DELETE CASCADE
  borra automáticamente los items al borrar su nota.

## DDL vs DML
- **DDL**: define la estructura (CREATE, ALTER, DROP).
- **DML**: manipula los datos (SELECT, INSERT, UPDATE, DELETE).

## INNER JOIN vs LEFT JOIN
- **INNER JOIN**: devuelve solo las filas que tienen coincidencia en ambas tablas.
  Ejemplo: notas que tienen al menos un tag.
- **LEFT JOIN**: devuelve todas las filas de la tabla izquierda aunque no haya
  coincidencia. Ejemplo: todas las notas, tengan o no items.

## Diagrama entidad-relación
```
notes (id, title, content, type, color, created_at, updated_at)
  │
  ├── checklist_items (id, note_id, text, is_completed)
  │
  └── note_tags (id, note_id, tag)
```