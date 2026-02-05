import { Lock,Mail, User2Icon } from "lucide-react";
import React from "react";

const Login = () => {

  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = React.useState(urlState ||"login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

    return (
      <div className=" min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-200">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl flex flex-col items-center justify-center ml-150 py-30"
        >
          <h1 className="text-black text-3xl mt-10 font-medium">
            {state === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Please {state} to continue
          </p>

          {state !== "login" && (
            <div className="flex items-center mt-6 w-full  ring-2 ring-black/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
             <User2Icon width={16} color="#6B7280" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-transparent text-gray-400 placeholder-black/60 border-none outline-none "
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-black/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
           <Mail width={16} color="#6B7280" />
            <input
              type="email"
              name="email"
              placeholder="Email id"
              className="w-full bg-transparent text-gray-400 placeholder-black/60 border-none outline-none "
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-black/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
           <Lock width={16} color="#6B7280" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent text-gray-400 placeholder-black/60 border-none outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 text-left">
            <button className="text-sm text-indigo-400 hover:underline">
              Forget password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition "
          >
            {state === "login" ? "Login" : "Sign up"}
          </button>

          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="text-indigo-400 hover:underline ml-1">
              click here
            </span>
          </p>
        </form>
        {/* Soft Backdrop*/}
        <div className="fixed inset-0 -z-1 pointer-events-none">
          <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl" />
          <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl" />
        </div>
      </div>
    );
  };
export default Login;
