export interface Consumidor {
  id?: number;
  email: string;
  nome: string;
  senha: string;
  cpf?: string;
  celular?: string;
  tipo: 'consumidor';
}

export interface Comerciante {
  id_comerciante?: number;
  nome: string;
  cpf: string;
  celular: string;
  telefone: string;
  email: string;
  cnpj: string;
  senha: string;
  tipo: 'comerciante';
  dataCadastro?: string;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  lojaId: number;
  loja: string;
  descricao: string;
}
