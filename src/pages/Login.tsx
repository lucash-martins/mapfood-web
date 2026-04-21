import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginImg from "../assets/images/foto-login.png";
import { consumidorApi } from "../services/consumidorApi";
import { comercianteApi } from "../services/comercianteApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mostra mensagem de sucesso se vindo do cadastro
  useEffect(() => {
    if (searchParams.get("cadastroSucesso")) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Tenta fazer login como consumidor primeiro
      let usuario;
      let tipo: 'consumidor' | 'comerciante' = 'consumidor';

      try {
        usuario = await consumidorApi.login(email, password);
      } catch {
        // Se falhar, tenta como comerciante
        usuario = await comercianteApi.login(email, password);
        tipo = 'comerciante';
      }

      // Salva dados do usuário no localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", String(usuario.id || usuario.id_comerciante));
      localStorage.setItem("userEmail", usuario.email);
      localStorage.setItem("userName", usuario.nome);
      localStorage.setItem("userType", tipo);
      
      // Salva o objeto completo do comerciante se for comerciante
      if (tipo === 'comerciante') {
        localStorage.setItem("userObject", JSON.stringify(usuario));
      }

      // Redireciona para /home
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">

      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex items-center justify-center bg-white p-5 md:p-7 overflow-y-auto">
        <div className="w-full max-w-md">

          <h1 className="text-2xl md:text-3xl font-bold mb-5">
            Faça seu login
          </h1>

          {showSuccessMessage && (
            <div className="mb-3 p-2.5 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
              Cadastro realizado com sucesso! Faça login para continuar.
            </div>
          )}

          {error && (
            <div className="mb-3 p-2.5 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div>
              <label className="block mb-0.5 text-sm font-medium">E-mail</label>

              <div className="flex items-center border rounded px-3 h-10">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  placeholder="seuemail@gmail.com"
                  className="w-full p-1.5 outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block mb-0.5 text-sm font-medium">Senha</label>

              <div className="flex items-center border rounded px-3 h-10">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="sua senha"
                  className="w-full p-1.5 outline-none text-sm"
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

            {/* Lembrar / Esqueci */}
            <div className="flex justify-between items-center text-sm pt-1">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Lembrar de mim
              </label>

              <Link
                to="/esqueci-senha"
                className="text-red-600 hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-red-600
                text-white py-2.5 rounded
                hover:bg-red-700
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
                font-medium mt-4
              "
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Cadastro */}
          <p className="text-center mt-4 text-sm text-gray-500">
            Não tem conta ainda?{" "}
            <Link
              to="/cadastro"
              className="text-red-600 font-medium"
            >
              Crie agora
            </Link>
          </p>

        </div>
      </div>

      {/* Lado direito - Imagem (oculto em mobile) */}
      <div className="hidden md:flex flex-1 bg-[#d1463b] flex-col items-center justify-center text-white p-10">

        <img src={LoginImg} alt="Login" className="max-w-xs lg:max-w-sm" />

        <p className="text-center text-lg max-w-md mt-4">
          A melhor experiência de login que você já teve
          na sua vida.
        </p>

      </div>

    </div>
  );
}
