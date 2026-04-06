// Máscara para CPF: 000.000.000-00
export const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
};

// Máscara para CNPJ: 00.000.000/0000-00
export const maskCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{2})$/, "$1-$2");
};

// Máscara para Celular: (XX) XXXXX-XXXX
export const maskCelular = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

// Máscara para Telefone: (XX) XXXX-XXXX
export const maskTelefone = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .slice(0, 10)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};
