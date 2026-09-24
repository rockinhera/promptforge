import {
  Card,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import TemplateCard from "./TemplateCard";

export default function TemplateCatalog({
  templates,
  category,
  onCategoryChange,
  onUseTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onFavoriteTemplate,
}) {
  const categories = [
    "All",
    "Coding",
    "Writing",
    "Productivity",
    "Custom",
  ];

  const filteredTemplates =
    category === "All"
      ? templates
      : templates.filter(
          (template) => template.category === category
        );

  return (
    <Stack gap="md">
      <div>
        <Title order={2}>Template Catalog</Title>

        <Text size="sm" c="dimmed">
          Start with a template or create your own.
        </Text>
      </div>

      <Card withBorder radius="md" padding="sm">
        <SegmentedControl
          fullWidth
          value={category}
          onChange={onCategoryChange}
          data={categories}
        />
      </Card>

      {filteredTemplates.length === 0 ? (
        <Card withBorder radius="md" padding="xl">
          <Stack align="center" gap="xs">
            <Title order={4}>No saved templates yet</Title>

            <Text size="sm" c="dimmed" ta="center">
              Click the heart icon on a template to save it.
            </Text>
          </Stack>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={onUseTemplate}
              onEdit={onEditTemplate}
              onDelete={onDeleteTemplate}
              onFavorite={onFavoriteTemplate}
            />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
} 