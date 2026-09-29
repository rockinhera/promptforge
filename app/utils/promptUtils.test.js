import { describe, expect, it } from "vitest";
import {
  extractVariables,
  compilePrompt,
} from "./promptUtils";

describe("extractVariables", () => {
  it("extracts unique variables from a prompt", () => {
    const prompt =
      "Act as a {{role}} and write in a {{tone}} tone about {{topic}}.";

    expect(extractVariables(prompt)).toEqual([
      "role",
      "tone",
      "topic",
    ]);
  });

  it("ignores empty variable names", () => {
    const prompt =
      "Write about {{ }} and use {{topic}}.";

    expect(extractVariables(prompt)).toEqual(["topic"]);
  });

  it("removes duplicate variables", () => {
    const prompt =
      "Use {{tone}} here and {{tone}} again.";

    expect(extractVariables(prompt)).toEqual(["tone"]);
  });
});

describe("compilePrompt", () => {
  it("replaces variables with their values", () => {
    const prompt =
      "Write a {{tone}} article about {{topic}}.";

    const values = {
      tone: "friendly",
      topic: "web development",
    };

    expect(compilePrompt(prompt, values)).toBe(
      "Write a friendly article about web development."
    );
  });

  it("keeps variables when no value is provided", () => {
    const prompt = "Write a {{tone}} article.";

    expect(compilePrompt(prompt, {})).toBe(
      "Write a {{tone}} article."
    );
  });
});