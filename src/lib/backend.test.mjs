import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { backendFetch } from "./backend.ts";

const backendOrigin = "https://backend.example.invalid";
const originalOrigin = process.env.BACKEND_API_URL;

beforeEach(() => {
  process.env.BACKEND_API_URL = backendOrigin;
});

afterEach(() => {
  if (originalOrigin === undefined) {
    delete process.env.BACKEND_API_URL;
  } else {
    process.env.BACKEND_API_URL = originalOrigin;
  }
});

test("sends the request to the configured backend without following redirects", async (t) => {
  const response = Response.json({ status: "ok" });
  const fetchMock = t.mock.method(globalThis, "fetch", async () => response);

  assert.equal(
    await backendFetch("/api/check?limit=2", {
      method: "POST",
      redirect: "follow",
    }),
    response,
  );

  assert.equal(fetchMock.mock.callCount(), 1);
  const [url, init] = fetchMock.mock.calls[0].arguments;
  assert.equal(url.href, `${backendOrigin}/api/check?limit=2`);
  assert.deepEqual(init, {
    cache: "no-store",
    method: "POST",
    redirect: "error",
  });
});

test("rejects missing configuration and paths outside the backend origin", (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch");

  for (const path of ["//outside.example.invalid/check", "relative/path"]) {
    assert.throws(() => backendFetch(path), /paths on BACKEND_API_URL/);
  }

  process.env.BACKEND_API_URL = `${backendOrigin}/unexpected/path`;
  assert.throws(
    () => backendFetch("/api/check"),
    /must be an HTTP or HTTPS origin/,
  );

  delete process.env.BACKEND_API_URL;
  assert.throws(() => backendFetch("/api/check"), /Set BACKEND_API_URL/);
  assert.equal(fetchMock.mock.callCount(), 0);
});
