import ResourceManager from "./components/ResourceManager";

const fields = [
  { name: "degree", label: "Degree", type: "text", placeholder: "Masters in Information System Management" },
  { name: "institution", label: "Institution", type: "text", placeholder: "Union Commonwealth University" },
  { name: "duration", label: "Duration", type: "text", placeholder: "Jan 2024 - May 2026" },
  { name: "grade", label: "Grade", type: "text", placeholder: "3.78/4 GPA" },
  { name: "logo", label: "Institution logo", type: "image" },
  { name: "order", label: "Sort order", type: "number" },
];

const emptyItem = {
  degree: "",
  institution: "",
  duration: "",
  grade: "",
  logo: "",
  order: 0,
};

export default function AdminEducation() {
  return (
    <ResourceManager
      title="Education"
      endpoint="/education"
      fields={fields}
      emptyItem={emptyItem}
      renderSummary={(item) => (
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{item.degree}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.institution} · {item.duration}
          </p>
        </div>
      )}
    />
  );
}
