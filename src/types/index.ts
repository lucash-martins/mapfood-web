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

export enum StatusLoja {
  ATIVA = 'ATIVA',
  INATIVA = 'INATIVA',
  SUSPENSA = 'SUSPENSA',
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface Loja {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  descricao?: string;
  statusLoja?: StatusLoja;
  comercianteId?: number;
  comerciante?: Comerciante;
  categorias?: Categoria[];
  dataCadastro?: string;
}
