import { Card, Stack, Textarea, Title } from "@mantine/core";
import VariableInputs from "./VariableInputs";

export default function PromptBuilder({
  template,
  values,
  variables,
  onTemplateChange,
  onVariableChange,
}) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="lg">
        <div>
          <Title order={2}>Template Editor</Title>
        </div>

        <Textarea
          label="Your prompt"
          placeholder="Write your prompt using {{variables}}..."
          minRows={8}
          value={template}
          onChange={(event) =>
            onTemplateChange(event.currentTarget.value)
          }
        />

        <VariableInputs
          variables={variables}
          values={values}
          onChange={onVariableChange}
        />
      </Stack>
    </Card>
  );
}