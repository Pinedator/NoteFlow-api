# NoteFlow API

Backend de NoteFlow construido con Next.js y PostgreSQL en Neon.

## Setup

```bash
git clone https://github.com/pinedator/noteflow-api.git
cd noteflow-api
npm install
cp .env.example .env.local
# Añade tu connection string de Neon en .env.local
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| DATABASE_URL | Connection string de PostgreSQL en Neon |

## Endpoints

### Notas

| Método | Ruta | Body | Respuesta |
|--------|------|------|-----------|
| GET | /api/notes | — | Array de notas |
| POST | /api/notes | `{ title, type, content?, color? }` | Nota creada (201) |
| GET | /api/notes/:id | — | Nota |
| PATCH | /api/notes/:id | `{ title?, content?, color? }` | Nota actualizada |
| DELETE | /api/notes/:id | — | 204 No Content |

### Checklist items

| Método | Ruta | Body | Respuesta |
|--------|------|------|-----------|
| GET | /api/notes/:id/checklist-items | — | Array de items |
| POST | /api/notes/:id/checklist-items | `{ text }` | Item creado (201) |
| PATCH | /api/checklist-items/:itemId | `{ text?, is_completed? }` | Item actualizado |
| DELETE | /api/checklist-items/:itemId | — | 204 No Content |

## Tecnologías

- **Next.js 15** con App Router
- **PostgreSQL** en Neon
- **Zod** para validación
- **@neondatabase/serverless** para conexión a la base de datos