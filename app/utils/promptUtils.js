export function extractVariables(prompt) {
  const matches = prompt.match(/{{(.*?)}}/g) || [];

  return [
    ...new Set(
      matches
        .map((match) =>
          match.replace("{{", "").replace("}}", "").trim()
        )
        .filter(Boolean)
    ),
  ];
}

export function compilePrompt(prompt, values) {
  return prompt.replace(
    /{{(.*?)}}/g,
    (match, variable) => {
      const key = variable.trim();
      return values[key] || match;
    }
  );
} 