export interface Comerciante {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  endereco: string;
  telefone: string;
  email: string;
  horario: string;
  avaliacao: number;
  produtos: number[];
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
