"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import Header from "./components/Header";
import TemplateCatalog from "./components/TemplateCatalog";
import PromptBuilder from "./components/PromptBuilder";
import PresetButtons from "./components/PresetButtons";
import LivePreview from "./components/LivePreview";
import SaveTemplate from "./components/SaveTemplate";

import { templates } from "./data/templates";
import { extractVariables } from "./utils/promptUtils";

export default function Home() {
  const [category, setCategory] = useState("All");

  const [prompt, setPrompt] = useState(
    templates[0].template
  );

  const [values, setValues] = useState({});

  const [templateName, setTemplateName] = useState("");

  const [customTemplates, setCustomTemplates] = useState([]);

  const [favoriteIds, setFavoriteIds] = useState([]);

  const [editingTemplateId, setEditingTemplateId] =
    useState(null);

  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const variables = useMemo(
    () => extractVariables(prompt),
    [prompt]
  );

  useEffect(() => {
    try {
      const savedTemplates = localStorage.getItem(
        "promptforge-templates"
      );

      const savedFavorites = localStorage.getItem(
        "promptforge-favorites"
      );

      if (savedTemplates) {
        const parsedTemplates = JSON.parse(savedTemplates);

        if (Array.isArray(parsedTemplates)) {
          const validTemplates = parsedTemplates.filter(
            (template) =>
              template &&
              typeof template === "object" &&
              typeof template.id === "number" &&
              typeof template.title === "string" &&
              typeof template.template === "string"
          );

          setCustomTemplates(validTemplates);
        }
      }

      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {
          const validFavorites = parsedFavorites.filter(
            (id) =>
              typeof id === "number" ||
              typeof id === "string"
          );

          setFavoriteIds(validFavorites);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load PromptForge data from localStorage:",
        error
      );

      setCustomTemplates([]);
      setFavoriteIds([]);

      notifications.show({
        title: "Could not load saved data",
        message:
          "Some saved PromptForge data was invalid and could not be loaded.",
      });
    }
  }, []);

  const saveTemplates = (updatedTemplates) => {
    setCustomTemplates(updatedTemplates);

    localStorage.setItem(
      "promptforge-templates",
      JSON.stringify(updatedTemplates)
    );
  };

  const saveFavorites = (updatedFavorites) => {
    setFavoriteIds(updatedFavorites);

    localStorage.setItem(
      "promptforge-favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const handleUseTemplate = (template) => {
    setPrompt(template.template);
    setValues({});
    setTemplateName("");
    setEditingTemplateId(null);
  };

  const handleVariableChange = (variable, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: value,
    }));
  };

  const handlePresetSelect = (preset) => {
    setValues((currentValues) => ({
      ...currentValues,
      tone: preset,
    }));
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !prompt.trim()) {
      notifications.show({
        title: "Missing information",
        message: "Please enter a template name and prompt.",
      });

      return;
    }

    if (editingTemplateId) {
      const updatedTemplates = customTemplates.map(
        (template) =>
          template.id === editingTemplateId
            ? {
                ...template,
                title: templateName.trim(),
                template: prompt,
              }
            : template
      );

      saveTemplates(updatedTemplates);

      setEditingTemplateId(null);
      setTemplateName("");

      notifications.show({
        title: "Template updated!",
        message: "Your custom template has been updated.",
      });

      return;
    }

    const newTemplate = {
      id: Date.now(),
      title: templateName.trim(),
      description: "Custom prompt template",
      category: "Custom",
      template: prompt,
      favorite: false,
    };

    saveTemplates([
      ...customTemplates,
      newTemplate,
    ]);

    setTemplateName("");

    notifications.show({
      title: "Template saved!",
      message: "Your custom template has been saved.",
    });
  };

  const handleDeleteTemplate = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this template?"
    );

    if (!shouldDelete) {
      return;
    }

    const updatedTemplates = customTemplates.filter(
      (template) => template.id !== id
    );

    saveTemplates(updatedTemplates);

    const updatedFavorites = favoriteIds.filter(
      (favoriteId) => favoriteId !== id
    );

    saveFavorites(updatedFavorites);

    if (editingTemplateId === id) {
      setEditingTemplateId(null);
      setTemplateName("");
    }

    notifications.show({
      title: "Template deleted",
      message: "Your custom template has been deleted.",
    });
  };

  const handleFavoriteTemplate = (id) => {
    const isFavorite = favoriteIds.includes(id);

    const updatedFavorites = isFavorite
      ? favoriteIds.filter(
          (favoriteId) => favoriteId !== id
        )
      : [...favoriteIds, id];

    saveFavorites(updatedFavorites);
  };

  const handleEditTemplate = (template) => {
    setPrompt(template.template);
    setTemplateName(template.title);
    setEditingTemplateId(template.id);

    notifications.show({
      title: "Editing template",
      message: "Make your changes and click Update Template.",
    });
  };

  const handleCancelEdit = () => {
    setEditingTemplateId(null);
    setTemplateName("");

    notifications.show({
      title: "Edit cancelled",
      message: "Your changes were not saved.",
    });
  };

  const handleSavedClick = () => {
    setShowSavedOnly((current) => !current);
    setCategory("All");
  };

  const allTemplates = [
    ...templates,
    ...customTemplates,
  ];

  const templatesWithFavorites = allTemplates.map(
    (template) => ({
      ...template,
      favorite: favoriteIds.includes(template.id),
    })
  );

  const displayedTemplates = showSavedOnly
    ? templatesWithFavorites.filter(
        (template) => template.favorite
      )
    : templatesWithFavorites;

  return (
    <Container size="lg" py="xl">
      <Header
        onSavedClick={handleSavedClick}
        showSavedOnly={showSavedOnly}
      />

      <Stack gap="xl">
        <div>
          <Title order={1}>Build Your Prompt</Title>

          <Text c="dimmed">
            Create Reusable Prompts With Dynamic Variables.
          </Text>
        </div>

        <TemplateCatalog
          templates={displayedTemplates}
          allTemplates={templatesWithFavorites}
          category={category}
          onCategoryChange={setCategory}
          onUseTemplate={handleUseTemplate}
          onEditTemplate={handleEditTemplate}
          onDeleteTemplate={handleDeleteTemplate}
          onFavoriteTemplate={handleFavoriteTemplate}
        />

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <PromptBuilder
            template={prompt}
            values={values}
            variables={variables}
            onTemplateChange={setPrompt}
            onVariableChange={handleVariableChange}
          />

          <LivePreview
            prompt={prompt}
            values={values}
          />
        </SimpleGrid>

        <PresetButtons
          onSelect={handlePresetSelect}
        />

        <SaveTemplate
          name={templateName}
          onNameChange={setTemplateName}
          onSave={handleSaveTemplate}
          onCancelEdit={handleCancelEdit}
          editing={editingTemplateId !== null}
        />
      </Stack>
    </Container>
  );
} 