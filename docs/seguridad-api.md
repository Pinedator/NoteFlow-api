# Seguridad en la API

## SQL Injection
Ocurre cuando la entrada del usuario se concatena directamente en una consulta.
Un atacante puede manipular la consulta para acceder a datos que no debería ver.

### Ejemplo vulnerable
```sql
-- El atacante envía: "'; DROP TABLE notes;--"
const query = "SELECT * FROM notes WHERE title = '" + title + "'";
-- Resultado: SELECT * FROM notes WHERE title = ''; DROP TABLE notes;--'
```

### Solución: consultas parametrizadas
Las consultas parametrizadas envían la estructura SQL y los valores por separado.
La base de datos precompila el SQL y trata los parámetros como datos, nunca como código.

```ts
// Seguro: el valor nunca se interpreta como código SQL
await query('SELECT * FROM notes WHERE title = $1', [title]);
```

## Variables de entorno
Las variables de entorno almacenan configuración sensible fuera del código.
El connection string de PostgreSQL nunca debe aparecer en el código fuente
porque cualquiera que acceda al repositorio tendría acceso completo a la base de datos.

### Reglas
- Crear `.env.local` con los valores reales y añadirlo al `.gitignore`.
- Crear `.env.example` con las claves vacías como plantilla para otros desarrolladores.
- En producción, configurar las variables en el panel de Vercel.