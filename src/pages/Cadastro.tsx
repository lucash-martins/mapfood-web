import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Este componente redireciona para a página de seleção de tipo
export default function Cadastro() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/cadastro/tipo");
  }, [navigate]);

  return null;
}
