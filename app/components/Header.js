import { Button, Group, Text, Title } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";

export default function Header({ onSavedClick, showSavedOnly }) {
  return (
    <Group justify="space-between" mb="xl">
      <div style={{ width: "160px" }} />

      <div style={{ textAlign: "center" }}>
        <Title order={1} fw={800}>
          PromptForge
        </Title>

        <Text size="sm" c="dimmed">
          Visual Prompt Template Studio
        </Text>
      </div>

      <Button
        variant={showSavedOnly ? "filled" : "light"}
        leftSection={<IconBookmark size={16} />}
        onClick={onSavedClick}
      >
        {showSavedOnly ? "Show All Templates" : "Saved Templates"}
      </Button>
    </Group>
  );
} 