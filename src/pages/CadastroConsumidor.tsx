import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginImg from "../assets/images/foto-login.png";
import { consumidorApi } from "../services/consumidorApi";
import { maskCPF, maskCelular } from "../lib/masks";

export default function CadastroConsumidor() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validações
    if (!nome.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    if (!email.trim()) {
      setError("E-mail é obrigatório");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("E-mail inválido");
      return;
    }

    if (!cpf.trim()) {
      setError("CPF é obrigatório");
      return;
    }

    if (!celular.trim()) {
      setError("Celular é obrigatório");
      return;
    }

    if (senha.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (senha !== confirmSenha) {
      setError("As senhas não correspondem");
      return;
    }

    setLoading(true);

    try {
      await consumidorApi.cadastro({
        nome,
        email,
        cpf,
        celular,
        senha,
      });

      setSuccess(true);

      // Limpa o formulário
      setNome("");
      setEmail("");
      setCpf("");
      setCelular("");
      setSenha("");
      setConfirmSenha("");

      // Redireciona para login após 2 segundos
      setTimeout(() => {
        navigate("/login?cadastroSucesso=true");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex items-center justify-center bg-white p-5 md:p-7 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link
            to="/cadastro"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-4 text-sm"
          >
            <ArrowLeft size={18} />
            Voltar
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Cadastro de Cliente
          </h1>
          <p className="text-gray-600 text-sm mb-5">
            Crie uma conta para descobrir os melhores comerciantes
          </p>

          {error && (
            <div className="mb-3 p-2.5 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-3 p-2.5 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
              Cadastro realizado com sucesso! Redirecionando...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Nome */}
            <div>
              <label className="block mb-0.5 text-sm font-medium">Nome completo</label>
              <div className="flex items-center border rounded px-3 h-10">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full p-1.5 outline-none text-sm"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-0.5 text-sm font-medium">E-mail</label>
              <div className="flex items-center border rounded px-3 h-10">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full p-1.5 outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* CPF e Celular em 2 colunas */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-0.5 text-sm font-medium">CPF</label>
                <div className="flex items-center border rounded px-2 h-10">
                  <User size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    className="w-full p-1.5 outline-none text-sm"
                    value={cpf}
                    onChange={(e) => setCpf(maskCPF(e.target.value))}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-0.5 text-sm font-medium">Celular</label>
                <div className="flex items-center border rounded px-2 h-10">
                  <Phone size={16} className="text-gray-400" />
                  <input
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                    className="w-full p-1.5 outline-none text-sm"
                    value={celular}
                    onChange={(e) => setCelular(maskCelular(e.target.value))}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Senha e Confirmar em 2 colunas */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-0.5 text-sm font-medium">Senha</label>
                <div className="flex items-center border rounded px-2 h-10">
                  <Lock size={16} className="text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mín. 6 caracteres"
                    className="w-full p-1.5 outline-none text-sm"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-0.5 text-sm font-medium">Confirmar</label>
                <div className="flex items-center border rounded px-2 h-10">
                  <Lock size={16} className="text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repetir senha"
                    className="w-full p-1.5 outline-none text-sm"
                    value={confirmSenha}
                    onChange={(e) => setConfirmSenha(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    className="hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-red-600 text-white py-2.5 rounded
                hover:bg-red-700 transition
                disabled:opacity-50 disabled:cursor-not-allowed
                font-medium mt-4
              "
            >
              {loading ? "Cadastrando..." : "Criar Conta"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center mt-4 text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-red-600 font-medium hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      {/* Lado direito - Imagem (oculto em mobile) */}
      <div className="hidden md:flex flex-1 bg-[#d1463b] flex-col items-center justify-center text-white p-10">
        <img src={LoginImg} alt="Cadastro" className="max-w-xs lg:max-w-sm" />
        <p className="text-center text-lg max-w-md mt-4">
          Descubra os melhores comerciantes da sua região
        </p>
      </div>
    </div>
  );
}
