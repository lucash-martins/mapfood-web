import { Link } from "react-router-dom";
import { Store, Users } from "lucide-react";
import LoginImg from "../assets/images/foto-login.png";

export default function CadastroTipo() {
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Lado esquerdo - Seleção */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            Bem-vindo ao MapFood
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            O que você deseja fazer?
          </p>

          <div className="space-y-4">
            {/* Cadastro Consumidor */}
            <Link
              to="/cadastro/consumidor"
              className="
                block p-6 border-2 border-gray-200 rounded-lg
                hover:border-red-600 hover:shadow-lg
                transition duration-300
                text-center
              "
            >
              <Users size={40} className="mx-auto mb-3 text-red-600" />
              <h2 className="text-xl font-bold mb-2">Sou Cliente</h2>
              <p className="text-sm text-gray-600">
                Descobra os melhores comerciantes da sua região
              </p>
            </Link>

            {/* Cadastro Comerciante */}
            <Link
              to="/cadastro/comerciante"
              className="
                block p-6 border-2 border-gray-200 rounded-lg
                hover:border-red-600 hover:shadow-lg
                transition duration-300
                text-center
              "
            >
              <Store size={40} className="mx-auto mb-3 text-red-600" />
              <h2 className="text-xl font-bold mb-2">Sou Comerciante</h2>
              <p className="text-sm text-gray-600">
                Abra sua loja e aumente suas vendas online
              </p>
            </Link>
          </div>

          {/* Login */}
          <p className="text-center mt-8 text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-red-600 font-medium hover:underline"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>

      {/* Lado direito - Imagem (oculto em mobile) */}
      <div className="hidden md:flex flex-1 bg-[#d1463b] flex-col items-center justify-center text-white p-10">
        <img src={LoginImg} alt="Cadastro" className="max-w-xs lg:max-w-sm" />

        <p className="text-center text-lg max-w-md mt-4">
          Junte-se à comunidade MapFood e conecte-se com oportunidades.
        </p>
      </div>
    </div>
  );
}
