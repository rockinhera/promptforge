import { Button, Group, Stack, Text, Title } from "@mantine/core";

const presets = ["Professional", "Casual", "Concise"];

export default function PresetButtons({ onSelect }) {
  return (
    <Stack gap="xs">
      <div>
        <Title order={4}>Tone Presets</Title>

        <Text size="sm" c="dimmed">
          Quickly choose a tone for your prompt.
        </Text>
      </div>

      <Group>
        {presets.map((preset) => (
          <Button
            key={preset}
            variant="light"
            onClick={() => onSelect(preset)}
          >
            {preset}
          </Button>
        ))}
      </Group>
    </Stack>
  );
} 