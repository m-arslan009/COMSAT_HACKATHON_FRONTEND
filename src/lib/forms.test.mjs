import assert from "node:assert/strict";
import { test } from "node:test";
import { safeRedirectPath } from "./forms.ts";

test("only allows same-site paths as the post-sign-in destination", () => {
  assert.equal(safeRedirectPath("/settings?tab=email"), "/settings?tab=email");
  for (const unsafe of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "javascript:alert(1)",
    "/profile\n",
    null,
  ]) {
    assert.equal(safeRedirectPath(unsafe), "/profile");
  }
});
