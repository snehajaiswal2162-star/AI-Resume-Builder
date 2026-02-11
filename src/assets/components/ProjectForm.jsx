import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const remove = data.filter((_, i) => i !== index);
    onChange(remove);
  };

  const updatedProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center g-2 text-lg font-semibold text-gray-900">
            Project
          </h3>
          <p className="text-sm text-gray-500">Add your project details</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-200 text-blue-700 rounded hover:bg-blue-300 transition-colors"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4>Project #{index + 1}</h4>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid gap-3">
              <input
                type="text"
                value={project.name || ""}
                placeholder="Project Name"
                className="px-3 py-2 text-sm rounded-lg"
                onChange={(e) =>
                  updatedProject(index, "name", e.target.value)
                }
              />

              <input
                type="text"
                value={project.type || ""}
                placeholder="Project Type"
                className="px-3 py-2 text-sm rounded-lg"
                onChange={(e) => updatedProject(index, "type", e.target.value)}
              />

              <textarea
                rows={4}
                value={project.description || ""}
                placeholder="Project Description"
                className="px-3 py-2 text-sm rounded-lg"
                onChange={(e) =>
                  updatedProject(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
