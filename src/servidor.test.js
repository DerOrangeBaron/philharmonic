import assert from "node:assert/strict";
import { createServer } from "node:http";
import { test } from "node:test";
import { manejar } from "./servidor.js";

async function pedir(ruta, opciones) {
  const servidor = createServer(manejar);
  await new Promise((r) => servidor.listen(0, "127.0.0.1", r));
  try {
    return await fetch(`http://127.0.0.1:${servidor.address().port}${ruta}`, opciones);
  } finally {
    servidor.close();
  }
}

test("GET / responde el nombre", async () => {
  const r = await pedir("/");
  assert.equal(r.status, 200);
  assert.equal(await r.text(), "philharmonic\n");
});

test("una ruta desconocida da 404", async () => {
  assert.equal((await pedir("/nada")).status, 404);
});

test("POST / da 404 con el error en JSON", async () => {
  const r = await pedir("/", { method: "POST" });
  assert.equal(r.status, 404);
  assert.equal(r.headers.get("content-type"), "application/json");
  assert.equal(await r.text(), '{"error":"ruta inexistente"}');
});

test("GET /?x=1 da 404 con el error en JSON", async () => {
  const r = await pedir("/?x=1");
  assert.equal(r.status, 404);
  assert.equal(r.headers.get("content-type"), "application/json");
  assert.equal(await r.text(), '{"error":"ruta inexistente"}');
});
