import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginImg from "../assets/images/foto-login.png";
import { comercianteApi } from "../services/comercianteApi";
import { maskCPF, maskCNPJ, maskCelular, maskTelefone } from "../lib/masks";

export default function CadastroComerciante() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmSenha: "",
    cpf: "",
    celular: "",
    telefone: "",
    cnpj: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validações
    if (!formData.nome.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    if (!formData.email.trim()) {
      setError("E-mail é obrigatório");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("E-mail inválido");
      return;
    }

    if (!formData.cpf.trim()) {
      setError("CPF é obrigatório");
      return;
    }

    if (!formData.cnpj.trim()) {
      setError("CNPJ é obrigatório");
      return;
    }

    if (!formData.celular.trim()) {
      setError("Celular é obrigatório");
      return;
    }

    if (!formData.telefone.trim()) {
      setError("Telefone é obrigatório");
      return;
    }

    if (formData.senha.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (formData.senha !== formData.confirmSenha) {
      setError("As senhas não correspondem");
      return;
    }

    setLoading(true);

    try {
      await comercianteApi.cadastro({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        cpf: formData.cpf,
        celular: formData.celular,
        telefone: formData.telefone,
        cnpj: formData.cnpj,
      });

      setSuccess(true);

      // Limpa o formulário
      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmSenha: "",
        cpf: "",
        celular: "",
        telefone: "",
        cnpj: "",
      });

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
            Cadastro de Loja
          </h1>
          <p className="text-gray-600 text-sm mb-5">
            Crie uma conta para vender seus produtos online
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

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Nome */}
            <div>
              <label className="block mb-0.5 text-sm font-medium">Nome</label>
              <div className="flex items-center border rounded px-3 h-10">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome completo"
                  className="w-full p-1.5 outline-none text-sm"
                  value={formData.nome}
                  onChange={handleChange}
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
                  name="email"
                  placeholder="seu@email.com"
                  className="w-full p-1.5 outline-none text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* CPF e CNPJ em 2 colunas */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-0.5 text-sm font-medium">CPF</label>
                <div className="flex items-center border rounded px-2 h-10">
                  <User size={16} className="text-gray-400" />
                  <input
                    type="text"
                    name="cpf"
                    placeholder="000.000.000-00"
                    className="w-full p-1.5 outline-none text-sm"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: maskCPF(e.target.value) })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-0.5 text-sm font-medium">CNPJ</label>
                <div className="flex items-center border rounded px-2 h-10">
                  <User size={16} className="text-gray-400" />
                  <input
                    type="text"
                    name="cnpj"
                    placeholder="00.000.000/0000-00"
                    className="w-full p-1.5 outline-none text-sm"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: maskCNPJ(e.target.value) })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Celular e Telefone em 2 colunas */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-0.5 text-sm font-medium">Celular</label>
                <div className="flex items-center border rounded px-2 h-10">
                  <Phone size={16} className="text-gray-400" />
                  <input
                    type="tel"
                    name="celular"
                    placeholder="(XX) XXXXX-XXXX"
                    className="w-full p-1.5 outline-none text-sm"
                    value={formData.celular}
                    onChange={(e) => setFormData({ ...formData, celular: maskCelular(e.target.value) })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-0.5 text-sm font-medium">Telefone</label>
                <div className="flex items-center border rounded px-2 h-10">
                  <Phone size={16} className="text-gray-400" />
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="(XX) XXXX-XXXX"
                    className="w-full p-1.5 outline-none text-sm"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: maskTelefone(e.target.value) })}
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
                    name="senha"
                    placeholder="Mín. 6 caracteres"
                    className="w-full p-1.5 outline-none text-sm"
                    value={formData.senha}
                    onChange={handleChange}
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
                    name="confirmSenha"
                    placeholder="Repetir senha"
                    className="w-full p-1.5 outline-none text-sm"
                    value={formData.confirmSenha}
                    onChange={handleChange}
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
              {loading ? "Cadastrando..." : "Criar Loja"}
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
          Abra sua loja online e aumente suas vendas
        </p>
      </div>
    </div>
  );
}
