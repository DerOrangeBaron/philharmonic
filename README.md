# philharmonic

Repo de prueba del estudio de agentes. Servidor HTTP mínimo con `node:http`, sin dependencias de terceros.

- `npm test` (o `pnpm test`): corre los tests con `node:test`.
- `npm start`: levanta el servidor en `PORT` (3000).

## Rutas

Las define `manejar` en `src/servidor.js`.

- `GET /`: responde `200` con `content-type: text/plain; charset=utf-8` y el cuerpo `philharmonic` (seguido de un salto de línea).
- Cualquier otra ruta o método (incluido `/` con un método que no sea `GET`, o con query string como `/?x=1`): responde `404` con `content-type: application/json` y el cuerpo `{"error":"ruta inexistente"}`.

Los agentes trabajan en ramas `estudio/<id-de-tarea>` y el runner abre el PR; el merge es manual.
