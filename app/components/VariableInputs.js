import { SimpleGrid, TextInput, Title } from "@mantine/core";

export default function VariableInputs({
  variables,
  values,
  onChange,
}) {
  if (variables.length === 0) {
    return null;
  }

  return (
    <div>
      <Title order={4} mb="sm">
        Variables
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {variables.map((variable) => (
          <TextInput
            key={variable}
            label={variable}
            placeholder={`Enter ${variable}`}
            value={values[variable] || ""}
            onChange={(event) =>
              onChange(variable, event.currentTarget.value)
            }
          />
        ))}
      </SimpleGrid>
    </div>
  );
}