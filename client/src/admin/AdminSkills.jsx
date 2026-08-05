import ResourceManager from "./components/ResourceManager";

const fields = [
  { name: "name", label: "Skill name", type: "text", placeholder: "React.js" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["Languages", "Frameworks/Libraries", "Tools", "CAD", "CAE", "Interpersonal"],
  },
  { name: "order", label: "Sort order", type: "number" },
];

const emptyItem = { name: "", category: "Languages", order: 0 };

export default function AdminSkills() {
  return (
    <ResourceManager
      title="Skills"
      endpoint="/skills"
      fields={fields}
      emptyItem={emptyItem}
      renderSummary={(item) => (
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
        </div>
      )}
    />
  );
}
