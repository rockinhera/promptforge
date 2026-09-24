import {
  Button,
  Card,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function SaveTemplate({
  name,
  onNameChange,
  onSave,
  editing,
}) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="sm">
        <div>
          <Title order={3}>
            {editing ? "Update Your Template" : "Save Your Template"}
          </Title>

          <Text size="sm" c="dimmed">
            Save this prompt so you can reuse it later.
          </Text>
        </div>

        <TextInput
          label="Template Name"
          placeholder="Enter a name for your template"
          value={name}
          onChange={(event) =>
            onNameChange(event.currentTarget.value)
          }
        />

        <Button
          leftSection={<IconDeviceFloppy size={16} />}
          onClick={onSave}
        >
          {editing ? "Update Template" : "Save Template"}
        </Button>
      </Stack>
    </Card>
  );
} 