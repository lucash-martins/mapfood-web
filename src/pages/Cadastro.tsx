import { Mail, Lock, Eye, User } from "lucide-react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/images/foto-login.png";

export default function Cadastro() {
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">

      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-8">
        <div className="w-full max-w-md">

          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Crie sua conta
          </h1>

          {/* Nome */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Nome completo</label>

            <div className="flex items-center border rounded-lg px-3">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Seu nome"
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

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

          {/* Confirmar Senha */}
          <div className="mb-6">
            <label className="block mb-1 text-sm">Confirmar senha</label>

            <div className="flex items-center border rounded-lg px-3">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                placeholder="confirme sua senha"
                className="w-full p-2 outline-none"
              />

              <Eye
                size={18}
                className="text-gray-400 cursor-pointer"
              />
            </div>
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
            Cadastrar
          </button>

          {/* Login */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium"
            >
              Faça login
            </Link>
          </p>

        </div>
      </div>

      {/* Lado direito - Imagem (oculto em mobile) */}
      <div className="hidden md:flex flex-1 bg-indigo-500 flex-col items-center justify-center text-white p-10">

        <img src={LoginImg} alt="Cadastro" className="max-w-xs lg:max-w-sm" />

        <p className="text-center text-lg max-w-md mt-4">
          Junte-se a nós e descubra os melhores
          comerciantes da sua região.
        </p>

      </div>

    </div>
  );
}
