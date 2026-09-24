import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowRight,
  IconEdit,
  IconHeart,
  IconHeartFilled,
  IconTrash,
} from "@tabler/icons-react";

export default function TemplateCard({
  template,
  onUse,
  onEdit,
  onDelete,
  onFavorite,
}) {
  const isCustom = template.category === "Custom";

  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="sm">
        <Group justify="space-between">
          <Title order={4}>{template.title}</Title>

          <Group gap="xs">
            <Badge variant="light">
              {template.category}
            </Badge>

            <ActionIcon
              variant="subtle"
              onClick={() => onFavorite(template.id)}
              aria-label="Save template"
            >
              {template.favorite ? (
                <IconHeartFilled size={18} />
              ) : (
                <IconHeart size={18} />
              )}
            </ActionIcon>
          </Group>
        </Group>

        <Text size="sm" c="dimmed">
          {template.description}
        </Text>

        <Group justify="space-between">
          <Button
            variant="light"
            rightSection={<IconArrowRight size={16} />}
            onClick={() => onUse(template)}
          >
            Use Template
          </Button>

          {isCustom && (
            <Group gap="xs">
              <ActionIcon
                variant="subtle"
                onClick={() => onEdit(template)}
                aria-label="Edit template"
              >
                <IconEdit size={18} />
              </ActionIcon>

              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => onDelete(template.id)}
                aria-label="Delete template"
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          )}
        </Group>
      </Stack>
    </Card>
  );
} 