import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "./../assets";
import { useNavigate } from "react-router-dom";

const Dashborad = () => {
  const colors = ["#9333ea", "#d97706", "#cd2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeUplatedId, setResumeUpdatedId] = useState(null);

  const navigate = useNavigate();

  const loadAllResume = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res16`);
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    navigate("/app/builder/res16");
  };

  const editResume = async (event) => {
    event.preventDefault()
    setResumeUpdatedId()
  }

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm("Are you sure you want to delete??")
    if(confirm){
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }

  useEffect(() => {
    loadAllResume();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-500 to-slate-600 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed hover:border-slate-700 group hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300 ">
              Create Resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed hover:border-slate-700 group hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300 ">
              Upload Existing Resume
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                key={resume._id}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group group-hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all duration-300"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div onClick={(e) => e.stopPropagation()} className="absolute top-1 right-1 items-center group-hover:flex hidden">
                  <TrashIcon onClick={() => deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                  <PencilIcon onClick={() =>{ setResumeUpdatedId(resume._id), setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 text-slate-700 rounded tr-col" />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-white/10 backdrop-blur bg-opacity-10 z-10 flex items-center justify-center"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <h2 className="font-bold mb-4 text-xl">Create a resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-indigo-600 ring-indigo-600"
                required
              />
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded">
                Create Resume
              </button>
              <XIcon
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle(" ");
                }}
                className="absolute top-70 right-150 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-white/10 backdrop-blur bg-opacity-10 z-10 flex items-center justify-center"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <h2 className="font-bold text-xl mb-4">Upload Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-indigo-600 ring:indigo-600"
                required
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select resume file
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-blue-400 hover:text-blue-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-blue-600">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  id="resume-input"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded">
                Upload resume
              </button>
              <XIcon
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle(" ");
                }}
                className="absolute top-45 right-160 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              />
            </div>
          </form>
        )}

        {resumeUplatedId && (
          <form
            onSubmit={editResume}
            onClick={() => setResumeUpdatedId()}
            className="fixed inset-0  bg-white/10 backdrop-blur bg-opacity-10 z-10 flex items-center justify-center"
          >
               <div onClick={(e) => e.stopPropagation()}>
              <h2 className="font-bold mb-4 text-xl">Update a resume</h2>
              <input
              value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-indigo-600 ring-indigo-600"
                required
              />
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded">
                Update Resume
              </button>
              <XIcon
                onClick={() => {
                  setResumeUpdatedId();
                  setTitle(" ");
                }}
                className="absolute top-70 right-150 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashborad;
