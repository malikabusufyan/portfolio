import ResourceManager from "./components/ResourceManager";

const fields = [
  { name: "company", label: "Company", type: "text", placeholder: "Tata Consultancy Services" },
  { name: "role", label: "Role", type: "text", placeholder: "Assistant System Engineer" },
  { name: "location", label: "Location", type: "text", placeholder: "Noida, India" },
  { name: "startDate", label: "Start date", type: "text", placeholder: "May 2022" },
  { name: "endDate", label: "End date (blank = Present)", type: "text", placeholder: "Dec 2023" },
  { name: "type", label: "Type", type: "select", options: ["work", "internship"] },
  { name: "logo", label: "Logo path (e.g. /images/logo-tcs.png)", type: "text" },
  { name: "bullets", label: "Bullet points (one per line)", type: "list" },
  { name: "order", label: "Sort order", type: "number" },
];

const emptyItem = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  type: "work",
  logo: "",
  bullets: "",
  order: 0,
};

export default function AdminExperience() {
  return (
    <ResourceManager
      title="Experience"
      endpoint="/experience"
      fields={fields}
      emptyItem={emptyItem}
      renderSummary={(item) => (
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {item.role} · {item.company}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.startDate} – {item.endDate || "Present"}
          </p>
        </div>
      )}
    />
  );
}
