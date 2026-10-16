import assert from "node:assert/strict";
import { createServer } from "node:http";
import { test } from "node:test";
import { manejar } from "./servidor.js";

async function pedir(ruta) {
  const servidor = createServer(manejar);
  await new Promise((r) => servidor.listen(0, "127.0.0.1", r));
  try {
    return await fetch(`http://127.0.0.1:${servidor.address().port}${ruta}`);
  } finally {
    servidor.close();
  }
}

test("GET / responde el nombre", async () => {
  const r = await pedir("/");
  assert.equal(r.status, 200);
  assert.equal(await r.text(), "philharmonic\n");
});

test("GET /salud responde ok en JSON", async () => {
  const r = await pedir("/salud");
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("content-type"), "application/json");
  assert.deepEqual(await r.json(), { ok: true });
});

test("una ruta desconocida da 404", async () => {
  assert.equal((await pedir("/nada")).status, 404);
});
