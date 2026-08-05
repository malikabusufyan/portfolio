import ResourceManager from "./components/ResourceManager";

const fields = [
  { name: "title", label: "Title", type: "text", placeholder: "Codeial - A Social Media Web App" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "techStack", label: "Tech stack (one per line)", type: "list" },
  { name: "category", label: "Category", type: "select", options: ["software", "academic"] },
  { name: "githubLink", label: "GitHub / report link", type: "text", placeholder: "https://github.com/..." },
  { name: "liveLink", label: "Live demo link (optional)", type: "text" },
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "order", label: "Sort order", type: "number" },
];

const emptyItem = {
  title: "",
  description: "",
  techStack: "",
  category: "software",
  githubLink: "",
  liveLink: "",
  featured: false,
  order: 0,
};

export default function AdminProjects() {
  return (
    <ResourceManager
      title="Projects"
      endpoint="/projects"
      fields={fields}
      emptyItem={emptyItem}
      renderSummary={(item) => (
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
        </div>
      )}
    />
  );
}
