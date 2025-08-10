export interface ConfigFieldType {
  type: "string" | "number" | "boolean" | "array" | "object" | "link";
  description?: string;
}

export interface ConfigEditorProps {
  config: Record<string, unknown>;
  onSaveAction: (updatedConfig: Record<string, unknown>) => void;
  disabled: boolean;
}

export const ARRAY_TEMPLATES = {
  projects: {
    title: "",
    description: "",
    image: "",
    github: "",
    demo: "",
    languages: [],
  },
  social: {
    platform: "",
    username: "",
    baseUrl: "",
  },
  navItems: {
    title: "",
    href: "",
  },
  heroButtons: {
    text: "",
    href: "",
    variant: "default",
    size: "default",
  },
};

export const CONFIG_FIELD_TYPES: Record<string, ConfigFieldType> = {
  // Basic Site Info
  name: { type: "string", description: "Your name" },
  siteName: { type: "string", description: "Name of your website" },
  navTitle: {
    type: "string",
    description: "Title shown in the navigation bar",
  },
  footerTitle: { type: "string", description: "Title shown in the footer" },
  description: {
    type: "string",
    description: "Main description of your website",
  },
  copyright: {
    type: "string",
    description: "Copyright text shown in the footer",
  },
  email: { type: "string", description: "Your contact email address" },

  // Contact Section
  contactDescription: {
    type: "string",
    description: "Description text shown in the contact section",
  },

  // Home Page
  homeTitle: { type: "string", description: "Main title on the home page" },
  homeDescription: {
    type: "string",
    description: "Description text on the home page",
  },
  heroButtons: {
    type: "array",
    description: "Call-to-action buttons shown on the home page",
  },

  // About Page
  aboutTitle: { type: "string", description: "Title of the about page" },
  aboutDescription: {
    type: "string",
    description: "Brief description for the about page",
  },
  aboutContentTitle: {
    type: "string",
    description: "Main title in the about content section",
  },
  aboutContent: {
    type: "string",
    description:
      "Main content text for the about page (supports markdown links)",
  },
  aboutHeroImage: {
    type: "string",
    description: "URL for the hero image shown on the about page",
  },

  // Projects Page
  projectTitle: { type: "string", description: "Title of the projects page" },
  projectDescription: {
    type: "string",
    description: "Description text for the projects section",
  },
  projects: {
    type: "array",
    description: "Array of project objects containing project details",
  },

  // Blog Page
  blogTitle: { type: "string", description: "Title of the blog page" },
  blogDescription: {
    type: "string",
    description: "Description text for the blog section",
  },

  // Social Links
  social: {
    type: "array",
    description:
      "Array of social media platform objects with usernames and URLs",
  },

  // Navigation
  navItems: {
    type: "array",
    description: "Navigation menu items with titles and URLs",
  },

  // Footer
  footerItems: {
    type: "array",
    description: "Footer links with titles, URLs and icons (optional)",
  },

  // Project Item Fields (nested)
  "projects.*.title": { type: "string", description: "Title of the project" },
  "projects.*.description": {
    type: "string",
    description: "Description of the project",
  },
  "projects.*.image": {
    type: "string",
    description: "URL of the project image (optional)",
  },
  "projects.*.github": { type: "string", description: "GitHub repository URL" },
  "projects.*.demo": { type: "string", description: "Live demo URL" },
  "projects.*.languages": {
    type: "array",
    description: "Array of programming languages/technologies used",
  },

  // Social Item Fields (nested)
  "social.*.platform": {
    type: "string",
    description: "Name of the social media platform",
  },
  "social.*.username": {
    type: "string",
    description: "Your username on the platform",
  },
  "social.*.baseUrl": {
    type: "string",
    description: "Base URL for the social media platform",
  },

  // Navigation Item Fields (nested)
  "navItems.*.title": { type: "string", description: "Navigation item text" },
  "navItems.*.href": { type: "string", description: "Navigation item URL" },

  // Hero Button Fields (nested)
  "heroButtons.*.text": { type: "string", description: "Button text" },
  "heroButtons.*.href": { type: "string", description: "Button URL" },
  "heroButtons.*.variant": {
    type: "string",
    description: "Button style variant (default, gradient, etc.)",
  },
  "heroButtons.*.size": {
    type: "string",
    description: "Button size (sm, md, lg, etc.)",
  },
};

export const CONFIG_CATEGORIES = {
  basic: {
    title: "Basic Information",
    description: "General website settings and information",
    fields: [
      "name",
      "siteName",
      "navTitle",
      "footerTitle",
      "description",
      "copyright",
      "email",
    ],
  },
  home: {
    title: "Home Page",
    description: "Configure your home page content and hero section",
    fields: ["homeTitle", "homeDescription", "heroButtons"],
  },
  about: {
    title: "About Page",
    description: "Manage your about page content and images",
    fields: [
      "aboutTitle",
      "aboutDescription",
      "aboutContentTitle",
      "aboutContent",
      "aboutHeroImage",
    ],
  },
  projects: {
    title: "Projects",
    description: "Your portfolio projects and their details",
    fields: ["projectTitle", "projectDescription", "projects"],
  },
  blog: {
    title: "Blog",
    description: "Blog page settings and configuration",
    fields: ["blogTitle", "blogDescription"],
  },
  navigation: {
    title: "Navigation",
    description: "Website navigation and menu items",
    fields: ["navItems"],
  },
  social: {
    title: "Social Media",
    description: "Your social media links and profiles",
    fields: ["social"],
  },
  contact: {
    title: "Contact",
    description: "Contact page and form settings",
    fields: ["contactDescription"],
  },
};
