import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconCopy,
  IconDownload,
} from "@tabler/icons-react";

export default function LivePreview({ prompt, values }) {
  const compiledPrompt = prompt.replace(
    /{{(.*?)}}/g,
    (match, variable) => {
      const key = variable.trim();
      return values[key] || match;
    }
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(compiledPrompt);

    notifications.show({
      title: "Prompt copied!",
      message: "Your compiled prompt has been copied.",
      icon: <IconCheck size={18} />,
    });
  };

  const handleDownload = () => {
    const file = new Blob([compiledPrompt], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "prompt.txt";
    link.click();

    URL.revokeObjectURL(url);

    notifications.show({
      title: "Prompt downloaded!",
      message: "Your prompt has been saved as a text file.",
      icon: <IconCheck size={18} />,
    });
  };

  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={2}>Live Preview</Title>

            <Text size="sm" c="dimmed">
              Your completed prompt appears here.
            </Text>
          </div>

          <Group>
            <Button
              variant="light"
              leftSection={<IconCopy size={16} />}
              onClick={handleCopy}
            >
              Copy Prompt
            </Button>

            <Button
              variant="light"
              leftSection={<IconDownload size={16} />}
              onClick={handleDownload}
            >
              Download
            </Button>
          </Group>
        </Group>

        <Card withBorder radius="sm" bg="gray.0">
          <Text style={{ whiteSpace: "pre-wrap" }}>
            {compiledPrompt}
          </Text>
        </Card>
      </Stack>
    </Card>
  );
} 
