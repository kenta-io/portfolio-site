import { describe, expect, it } from "vitest";

import { requireEnv } from "@/lib/env";

describe("requireEnv", () => {
  it("returns the value when the env var is set", () => {
    process.env.TEST_ENV_VAR = "value";
    expect(requireEnv("TEST_ENV_VAR")).toBe("value");
    delete process.env.TEST_ENV_VAR;
  });

  it("throws when the env var is unset", () => {
    delete process.env.TEST_ENV_VAR_MISSING;
    expect(() => requireEnv("TEST_ENV_VAR_MISSING")).toThrow(
      "TEST_ENV_VAR_MISSING is required",
    );
  });
});
