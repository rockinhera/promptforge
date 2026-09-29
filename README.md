# PromptForge – Visual Prompt Template Studio

PromptForge is a frontend-only prompt template studio built with **Next.js** and **Mantine UI**. It allows users to create, customize, preview, and organize reusable prompt templates directly in the browser.

## Live Preview

[View PromptForge Live](https://promptforge-zeta-sepia.vercel.app/)

## Features

* Dynamic prompt template editor
* Automatic variable detection using `{{variable}}`
* Real-time compiled prompt preview
* Built-in starter templates
* Custom prompt templates
* Template category filtering
* Copy compiled prompts to clipboard
* Variable presets
* Favorite built-in and custom templates
* Edit and delete custom templates
* Responsive UI
* Browser-based data persistence

## How Variables Work

PromptForge supports dynamic variables using double curly braces:

```text
You are a {{role}}.
Your task is to {{task}}.
Please respond in a {{tone}} tone.
```

When variables are detected, PromptForge automatically creates input fields for them. The values entered by the user are then used to generate the compiled prompt in the live preview.

## Data Storage

PromptForge is a frontend-only application and does not use a backend or database.

Custom templates and favorite template IDs are stored in the browser using `localStorage`. This means the data stays on the user's browser and is available when they return to the application from the same browser.

Clearing the browser's local storage will remove the saved custom templates and favorites.

## Templates and Favorites

PromptForge includes built-in starter templates as well as custom templates created by the user.

Both **built-in and custom templates can be added to favorites**. Favorite templates can be viewed using the saved/favorites option.

Custom templates can also be edited or deleted.

## Tech Stack

* Next.js
* React
* Mantine UI
* JavaScript
* LocalStorage
* CSS

PromptForge is a frontend only prompt template studio built with **Next.js** and **Mantine UI**. It allows users to create, customize, preview, and save reusable AI prompt templates directly in the browser.


##  Live Preview:

[View PromptForge Live](https://promptforge-zeta-sepia.vercel.app/)

## Features:

*  Dynamic prompt template editor.
*  Automatic variable detection using `{{variable}}`.
*  Real-time compiled prompt preview.
*  Built-in starter templates.
*  Template category filtering.
*  Copy compiled prompts to clipboard.
*  Variable presets.
*  Save custom templates using localStorage.
*  Favorite custom templates.
*  Edit and delete saved templates.
*  Responsive UI.

##  Tech Stack:

* Next.js
* Mantine UI
* JavaScript
* React
* LocalStorage
* CSS
=======
First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Project Structure

```text
app/
├── components/
├── data/
├── page.js
├── layout.js
└── globals.css
```

## Deployment

PromptForge is deployed using Vercel.

[View the live application](https://promptforge-zeta-sepia.vercel.app/)
 
