import { createServer } from "node:http";

/** Maneja los pedidos. Exportado para probarlo sin abrir un puerto. */
export function manejar(req, res) {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    res.end("philharmonic\n");
    return;
  }
  if (req.method === "GET" && req.url === "/salud") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "ruta inexistente" }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const puerto = Number(process.env.PORT ?? 3000);
  createServer(manejar).listen(puerto, "127.0.0.1", () => console.log(`escuchando en ${puerto}`));
}
