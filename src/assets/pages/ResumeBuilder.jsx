import React, { useEffect, useState } from "react";
import { useParams, Link, data } from "react-router-dom";
import { dummyResumeData } from "./../assets";
import {
  ArrowLeftIcon,
  User,
  Briefcase,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PersonalInfo from "./PersonalInfo";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/EXperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    project: [],
    template: "classic",
    accent_color: "#3b8256",
    public: false,
  });

  console.log("Resume Data:", resumeData.personal_summary);


  const loadExistingdata = async () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(0);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Professional Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingdata();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto  py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-500 transition-all"
        >
          <ArrowLeftIcon className="size-4 " /> Back to Dashborad
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left panel */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress bar using activeSectionIndex */}
              <hr className="absolute left-0 right-0 top-0 border-2 border-gray-200 " />
              <hr
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-200 cursor-pointer border-none "
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              {/* Section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 ">
                <div>
                  <TemplateSelector
                    selectedTemplate={TemplateSelector}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                </div>
                <div className="mr-40">
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      disabled={activeSectionIndex === 0}
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1),
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && "opacity-50"}`}
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* form content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfo
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm 
                  data={resumeData.experience}
                  onChange={(data) => setResumeData((prev) => ({...prev,experience:data}))}
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                  data={resumeData.education}
                  onChange={(data) => setResumeData((prev) => ({...prev,education:data}))}
                  />
                )}

                {activeSection.id === 'projects' && (
                  <ProjectForm
                  data={resumeData.project}
                  onChange={(data) => setResumeData((prev) => ({...prev,project:data}))}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div>{/* button */}</div>
            {/* resume review */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
