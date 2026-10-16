import assert from "node:assert/strict";
import { test } from "node:test";
import { manejar } from "./servidor.js";

/** Llama a `manejar` con un pedido y una respuesta falsos, sin abrir un puerto. */
function pedir(ruta, method = "GET") {
  const r = { status: undefined, headers: {}, cuerpo: "" };
  manejar(
    { method, url: ruta },
    {
      writeHead(status, headers = {}) {
        r.status = status;
        r.headers = headers;
      },
      end(cuerpo = "") {
        r.cuerpo = String(cuerpo);
      },
    },
  );
  return r;
}

test("GET / responde el nombre", () => {
  const r = pedir("/");
  assert.equal(r.status, 200);
  assert.equal(r.cuerpo, "philharmonic\n");
});

test("GET /salud responde ok en JSON", () => {
  const r = pedir("/salud");
  assert.equal(r.status, 200);
  assert.equal(r.headers["content-type"], "application/json");
  assert.deepEqual(JSON.parse(r.cuerpo), { ok: true });
});

test("una ruta desconocida da 404", () => {
  assert.equal(pedir("/nada").status, 404);
});
