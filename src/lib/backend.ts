import "server-only";

/** Send a server-side request once the backend defines this endpoint. */
export function backendFetch(path: `/${string}`, init?: RequestInit) {
  const configuredOrigin = process.env.BACKEND_API_URL;

  if (!configuredOrigin) {
    throw new Error(
      "Set BACKEND_API_URL in .env.local to connect the backend.",
    );
  }

  const base = new URL(configuredOrigin);

  if (!/^https?:$/.test(base.protocol) || base.href !== `${base.origin}/`) {
    throw new Error("BACKEND_API_URL must be an HTTP or HTTPS origin.");
  }

  const endpoint = new URL(path, base);

  if (!path.startsWith("/") || endpoint.origin !== base.origin) {
    throw new Error("Backend endpoints must be paths on BACKEND_API_URL.");
  }

  return fetch(endpoint, { cache: "no-store", ...init, redirect: "error" });
}
