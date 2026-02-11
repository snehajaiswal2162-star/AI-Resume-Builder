import React from 'react'
import { GraduationCap, Plus,Trash2 } from 'lucide-react'

const EducationForm = ({data,onChange}) => {

    const addEducation = () => {
        const newEducation = {
            institution:'',
            degree:'',
            field:'',
            graduation_date:'',
            gpa:'',
        }
        onChange([...data,newEducation])
    }

    const removeEducation = (index) => {
        const remove = data.filter((_,i) => i !== index )
        onChange(remove)
    }

    const updatedEducation = (index,field,value) => {
        const updated = [...data]
        updated[index] = { ...updated[index],[field]:value}
        onChange(updated)
    }

     return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center g-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-500">Add your education details</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-200 text-blue-700 rounded hover:bg-blue-300 transition-colors"
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education details added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Education #{index + 1}</h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={education.institution || ""}
                  placeholder="Institution Name"
                  className="px-3 py-2 text-sm rounded-lg"
                  onChange={(e) =>
                    updatedEducation(index, "institution", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={education.degree || ""}
                  placeholder="Degree (eg. Bachlor's , Master's)"
                  className="px-3 py-2 text-sm "
                  onChange={(e) =>
                    updatedEducation(index, "degree", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={education.field || ""}
                  placeholder='Field of study'
                  className="px-3 py-2 text-sm "
                  onChange={(e) =>
                    updatedEducation(index, "field", e.target.value)
                  }
                />
                <input
                  type="month"
                  disabled={education.graduation_dat}
                  value={education.graduation_date || ""}
                  className="px-3 py-2 text-sm disabled:bg-gray-100"
                  onChange={(e) =>
                    updatedEducation(index, "graduation_date", e.target.value)
                  }
                />
              </div>

               <input
                  type="text"
                  value={education.gpa || ""}
                  placeholder='CGPA (optional)'
                  className="px-3 py-2 text-sm "
                  onChange={(e) =>
                    updatedEducation(index, "gpa", e.target.value)
                  }
                />
              

             
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationForm
