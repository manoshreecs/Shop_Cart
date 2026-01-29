import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Logins = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = state === "login" ? "login" : "register";

      const payload =
        state === "login"
          ? { email, password }
          : { name, email, password };

      const { data } = await axios.post(
        `/api/user/${endpoint}`,
        payload
      );

      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);

        toast.success(
          state === "login" ? "Login Successful" : "Account Created"
        );

        navigate("/");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >

        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-4 right-4 text-2xl cursor-pointer"
        >
          ✕
        </button>

        <p className="text-2xl font-medium text-center">
          <span className="text-green-600">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md mt-4"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>

        <p className="text-sm text-center">
          {state === "register"
            ? "Already have an account? "
            : "Create an account? "}

          <span
            onClick={() =>
              setState(state === "login" ? "register" : "login")
            }
            className="text-green-600 cursor-pointer"
          >
            {state === "login" ? "Click here" : "Login"}
          </span>
        </p>

      </form>
    </div>
  );
};

export default Logins;
