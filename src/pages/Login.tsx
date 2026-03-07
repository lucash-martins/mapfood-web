import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginImg from "../assets/images/foto-login.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (login(email, password)) {
      navigate("/home");
    } else {
      setError("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">

      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-8">
        <div className="w-full max-w-md">

          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Faça seu login
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 text-sm">E-mail</label>

              <div className="flex items-center border rounded-lg px-3">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  placeholder="seuemail@gmail.com"
                  className="w-full p-2 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div className="mb-4">
              <label className="block mb-1 text-sm">Senha</label>

              <div className="flex items-center border rounded-lg px-3">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="sua senha"
                  className="w-full p-2 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400 cursor-pointer" />
                  ) : (
                    <Eye size={18} className="text-gray-400 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            {/* Lembrar / Esqueci */}
            <div className="flex justify-between items-center mb-6 text-sm">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Lembrar de mim
              </label>

              <Link
                to="/esqueci-senha"
                className="text-indigo-600 hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="
                w-full bg-indigo-500
                text-white py-3 rounded-lg
                hover:bg-indigo-600
                transition
              "
            >
              Entrar
            </button>
          </form>

          {/* Cadastro */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Não tem conta ainda?{" "}
            <Link
              to="/cadastro"
              className="text-indigo-600 font-medium"
            >
              Crie agora
            </Link>
          </p>

          {/* Info teste */}
          <div className="mt-6 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
            <p className="font-semibold">Usuário de teste:</p>
            <p>E-mail: admin@mapfood.com</p>
            <p>Senha: admin123</p>
          </div>

        </div>
      </div>

      {/* Lado direito - Imagem (oculto em mobile) */}
      <div className="hidden md:flex flex-1 bg-indigo-500 flex-col items-center justify-center text-white p-10">

        <img src={LoginImg} alt="Login" className="max-w-xs lg:max-w-sm" />

        <p className="text-center text-lg max-w-md mt-4">
          A melhor experiência de login que você já teve
          na sua vida.
        </p>

      </div>

    </div>
  );
}
