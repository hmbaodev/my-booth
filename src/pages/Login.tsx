import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { useAuthStore } from "../store/use-auth-provider";

const Login = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for redirection to home/dashboard page after login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Clear the form fields
      setEmail("");
      setPassword("");
      // Redirect to homepage or dashboard after successful login
      navigate("/actions"); // Adjust path as needed for your app
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="mx-auto mt-10 w-[360px] rounded-xl border border-black p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="mb-4 text-center text-xl font-bold">Đăng Nhập</h2>

        <input
          type="email"
          placeholder="Email"
          className="border-b border-gray-400 px-3 py-2 focus:border-black focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border-b border-gray-400 px-3 py-2 focus:border-black focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p>
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-gray-700 hover:underline">
            Đăng ký
          </Link>
        </p>
        <button
          type="submit"
          className="mt-4 rounded bg-black py-2 text-white hover:opacity-90"
        >
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
