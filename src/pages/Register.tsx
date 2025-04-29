import { useState } from "react";
import { useNavigate, Link } from "react-router";

import { useAuthStore } from "../store/use-auth-provider";

const Register = () => {
  const { register } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register(email, password);
      // Clear the form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Redirect to login page
      navigate("/login"); // Assuming the login page is at /login
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="mx-auto mt-10 w-[360px] rounded-xl border border-black p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-center text-xl font-bold">Đăng Ký Tài Khoản</h2>

        <input
          type="email"
          placeholder="Email"
          className="border-b border-gray-400 p-2 focus:border-black focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border-b border-gray-400 p-2 focus:border-black focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border-b border-gray-400 p-2 focus:border-black focus:outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <p>
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-gray-700 hover:underline">
            Đăng nhập
          </Link>
        </p>
        <button
          type="submit"
          className="rounded bg-black py-2 text-white hover:opacity-90"
        >
          Đăng Ký
        </button>
      </form>
    </div>
  );
};

export default Register;
