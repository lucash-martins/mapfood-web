import { Mail, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/images/foto-login.png";

export default function Login() {
  return (
    <div className="min-h-screen flex">

      {/* Lado esquerdo */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">

          <h1 className="text-3xl font-bold mb-8">
            Faça seu login
          </h1>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">E-mail</label>

            <div className="flex items-center border rounded-lg px-3">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="seuemail@gmail.com"
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Senha</label>

            <div className="flex items-center border rounded-lg px-3">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                placeholder="sua senha"
                className="w-full p-2 outline-none"
              />

              <Eye
                size={18}
                className="text-gray-400 cursor-pointer"
              />
            </div>
          </div>

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
            className="
              w-full bg-indigo-500
              text-white py-3 rounded-lg
              hover:bg-indigo-600
              transition
            "
          >
            Entrar
          </button>

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

        </div>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 bg-indigo-500 flex flex-col items-center justify-center text-white p-10">

        <img src={LoginImg} />

        <p className="text-center text-lg max-w-md">
          A melhor experiência de login que você já teve
          na sua vida.
        </p>

      </div>

    </div>
  );
}
